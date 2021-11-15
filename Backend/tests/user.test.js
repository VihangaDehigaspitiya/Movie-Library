const server = require('../app');
const request = require('supertest');
require('dotenv').config({ path: './.env' });

const {mockDeleteUserData, mockAddUser, mockGetUserFromId, mockDeleteWishListData} = require('./mock/mockfunc');
const MessageCode = require('../resources/messages');
const {v4: uuidv4} = require("uuid");
const crypto = require("crypto");
const moment = require("moment");
const redisClient = require("../helpers/init_redis")

let userId;
let accessToken;
let refreshToken;

let validUserObj = {
    first_name: 'Test',
    last_name: 'User',
    email: 'test@email.com',
    password: 'test123',
}

describe('User Module', () => {

    beforeAll(async () => {
        await mockDeleteUserData();
    });

    afterAll(async () => {
        await mockDeleteUserData();
        redisClient.quit();
    }, 50000)

    /**
     * Register test user
     * @param data
     * @returns {*}
     */
    const testRegisterUser = (data) => {
        return request(server).post('/user/register')
            .send(data);
    }

    it('POST user/register - User Registration - Invalid Payload', async () => {

        let invalidUserObj = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }

        let res = await testRegisterUser(invalidUserObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 20000);

    it('POST user/register - User Registration - Valid Payload', async () => {

        let res = await testRegisterUser(validUserObj);

        userId = res.body.value.id;

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value).toEqual(
            expect.objectContaining({
                first_name: expect.any(String),
                id: expect.any(String),
                email: expect.any(String)
            })
        )

    }, 20000);

    it('POST user/register - User Registration - Duplicate Email', async () => {
        let userObj = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test@email.com',
            password: 'test123',
        }

        let res = await testRegisterUser(userObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(409);

    }, 20000);

    /**
     * Verify test user
     * @param id
     * @returns {*}
     */
    const testVerifyUser = (id) => {
        return request(server).get(`/user/verify/${id}`)
            .send();
    }

    it('GET user/verify - User Verify - User Not Found', async () => {

        let res = await testVerifyUser('test');

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(404);

    }, 20000);

    it('GET user/verify - User Verify - User Verified', async () => {

        let res = await testVerifyUser(userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_ACCOUNT_VERIFIED)

    }, 20000)

    it('GET user/verify - User Verify - User Already Verified', async () => {

        let res = await testVerifyUser(userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_ALREADY_VERIFIED)

    }, 20000);

    /**
     * Login test user
     * @param data
     * @returns {*}
     */
    const testLoginUser = (data) => {
        return request(server).post(`/user/login`)
            .send(data);
    }

    it('POST user/login - User Login - Invalid Payload', async () => {
        let payload = {
            email: '',
            password: '',
        }

        let res = await testLoginUser(payload);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 20000);

    it('POST user/login - User Login - Invalid Password', async () => {
        let userObj = {
            email: 'test@email.com',
            password: 'test',
        }

        let res = await testLoginUser(userObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(401);
        expect(res.body.message).toEqual(MessageCode.ERR_PASSWORD_INCORRECT)

    }, 20000);

    it('POST user/login - User Login - User Not Found', async () => {
        let userObj = {
            email: 'test12@email.com',
            password: 'testqq',
        }

        let res = await testLoginUser(userObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(MessageCode.ERR_USER_DOES_NOT_EXIST)

    }, 20000);

    it('POST user/login - User Login - Not Verified', async () => {
        let newUserObj = {
            id: uuidv4(),
            first_name: 'Test2',
            last_name: 'User',
            email: 'test2@email.com',
            password: crypto
                .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
                .update('test@234')
                .digest("hex"),
            created_at: moment().unix()
        }

        await mockAddUser(newUserObj)

        let res = await testLoginUser({
            email: newUserObj.email,
            password: 'test@234'
        });

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(401);
        expect(res.body.message).toEqual(MessageCode.ERR_USER_NOT_VERIFIED)

    }, 20000);

    it('POST user/login - User Login - Valid Credentials', async () => {
        let userObj = {
            email: validUserObj.email,
            password: validUserObj.password,
        }

        let res = await testLoginUser(userObj);
        accessToken = res.body.value.token
        refreshToken = res.body.value.refreshToken

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                id: expect.any(String),
            })
        )

    }, 20000);


    /**
     * Test user logout
     * @param data
     * @returns {*}
     */
    const testLogoutUser = (data) => {
        return request(server)
            .post(`/user/logout`)
            .set('Authorization', 'Bearer ' + accessToken)
            .send(data);
    }

    it('POST user/logout - User Logout - Token Missing', async () => {
        let payload = {
            refreshToken: null,
        }

        let res = await testLogoutUser(payload);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(403);
        expect(res.body.message).toEqual(MessageCode.ERR_MISSING_TOKEN);

    }, 20000);

    /*it('POST user/logout - User Logout - Valid', async () => {
        let payload = {
            refreshToken: refreshToken,
        }

        console.log(payload, "payload")

        let res = await testLogoutUser(payload);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_USER_LOGOUT);

    }, 20000);*/



    /**
     * Forgot password test user
     * @param data
     * @returns {*}
     */
    const testForgotPasswordUser = (data) => {
        return request(server).post(`/user/forgot-password`)
            .send(data);
    }

    it('POST user/forgot-password - Forgot Password - Invalid Payload', async () => {
        let payload = {
            email: '',
        }

        let res = await testForgotPasswordUser(payload);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 20000);

    it('POST user/forgot-password - Forgot Password - User Not Found', async () => {
        let payload = {
            email: 'test33@email.com',
        }

        let res = await testForgotPasswordUser(payload);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(MessageCode.ERR_USER_DOES_NOT_EXIST)

    }, 20000);

    it('POST user/forgot-password - Forgot Password - Valid', async () => {
        let payload = {
            email: validUserObj.email,
        }

        let res = await testForgotPasswordUser(payload);

        userId = res.body.value;

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_OTP_EMAIL)

    }, 20000);


    /**
     * Reset password test user
     * @param data
     * @param id
     * @returns {*}
     */
    const testResetPasswordOTPUser = (data, id) => {
        return request(server).post(`/user/verify/otp/${id}`)
            .send(data);
    }

    it('POST /user/verify/otp/:id - Verify OTP - Invalid Payload', async () => {
        let payload = {
            otp: '',
        }

        let res = await testResetPasswordOTPUser(payload, userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 20000);

    it('POST /user/verify/otp/:id - Verify OTP - User Not Found', async () => {
        let payload = {
            otp: 123456,
        }

        let res = await testResetPasswordOTPUser(payload, 'test');

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(MessageCode.ERR_USER_DOES_NOT_EXIST)

    }, 20000);

    it('POST /user/verify/otp/:id - Verify OTP - Wrong OTP', async () => {
        let payload = {
            otp: 123456,
        }

        let res = await testResetPasswordOTPUser(payload, userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(401);
        expect(res.body.message).toEqual(MessageCode.ERR_OTP_WRONG)

    }, 20000);

    it('POST /user/verify/otp/:id - Verify OTP - Valid', async () => {

        let data = await mockGetUserFromId(userId);
        const userData = JSON.parse(JSON.stringify(data))

        let payload = {
            otp: userData.reset_otp
        }

        let res = await testResetPasswordOTPUser(payload, userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value).toEqual(userId)

    }, 20000);


    /**
     * Reset password otp test user
     * @param data
     * @param id
     * @returns {*}
     */
    const testResetPasswordUser = (data, id) => {
        return request(server).post(`/user/reset-password/${id}`)
            .send(data);
    }

    it('POST /user/reset-password/:id - Reset Password - Invalid Payload', async () => {
        let payload = {
            otp: '',
            password: ''
        }

        let res = await testResetPasswordUser(payload, userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 20000);

    it('POST /user/reset-password/:id - Reset Password - User Not Found', async () => {
        let payload = {
            otp: 123456,
            password: 'test@12345'
        }

        let res = await testResetPasswordUser(payload, 'test');

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(MessageCode.ERR_USER_DOES_NOT_EXIST)

    }, 20000);

    /*it('POST /user/reset-password/:id - Reset Password - Wrong OTP', async () => {
        let payload = {
            otp: 123456,
        }

        let res = await testResetPasswordOTPUser(payload, userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(401);
        expect(res.body.message).toEqual(MessageCode.ERR_OTP_WRONG)

    });*/

    it('POST /user/reset-password/:id - Reset Password - Valid', async () => {

        let data = await mockGetUserFromId(userId);
        const userData = JSON.parse(JSON.stringify(data))

        let payload = {
            otp: userData.reset_otp,
            password: 'test@12345'
        }

        let res = await testResetPasswordUser(payload, userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value).toEqual(userId)

    }, 20000);

    it('Wishlist - Mock Data Deletion confirmed', async () => {

        let resultUser = await mockDeleteUserData();
        let resultWishlist = await mockDeleteWishListData();

        console.log(resultWishlist, "resultWishlist")
        console.log(resultUser, "resultUser")

        // expect(resultUser).toBe(1)
        // expect(resultWishlist).toBe(0)

    }, 65000);

}, 70000)
