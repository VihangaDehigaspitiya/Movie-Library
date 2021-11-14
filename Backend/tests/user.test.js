const server = require('../app');
const request = require('supertest');
require('dotenv').config({ path: './.env' });

const {mockDeleteUserData, mockAddUser} = require('./mock/mockfunc');
const MessageCode = require('../resources/messages');
const {v4: uuidv4} = require("uuid");
const crypto = require("crypto");
const moment = require("moment");

let userId;

describe('User Module', () => {

    beforeAll(async () => {
        await mockDeleteUserData();
    })

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

    });

    it('POST user/register - User Registration - Valid Payload', async () => {

        let validUserObj = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test@email.com',
            password: 'test123',
        }

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

    });

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

    });

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

    });

    it('GET user/verify - User Verify - User Verified', async () => {

        let res = await testVerifyUser(userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_ACCOUNT_VERIFIED)

    })

    it('GET user/verify - User Verify - User Already Verified', async () => {

        let res = await testVerifyUser(userId);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_ALREADY_VERIFIED)

    });

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

    });

    it('POST user/login - User Login - Invalid Password', async () => {
        let userObj = {
            email: 'test@email.com',
            password: 'test',
        }

        let res = await testLoginUser(userObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(401);
        expect(res.body.message).toEqual(MessageCode.ERR_PASSWORD_INCORRECT)

    });

    it('POST user/login - User Login - User Not Found', async () => {
        let userObj = {
            email: 'test12@email.com',
            password: 'testqq',
        }

        let res = await testLoginUser(userObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(404);
        expect(res.body.message).toEqual(MessageCode.ERR_USER_DOES_NOT_EXIST)

    });

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

    });

    it('POST user/login - User Login - Valid Credentials', async () => {
        let userObj = {
            email: 'test@email.com',
            password: 'test123',
        }

        let res = await testLoginUser(userObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                id: expect.any(String),
            })
        )

    });

})
