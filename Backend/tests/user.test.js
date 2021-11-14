const server = require('../app');
const request = require('supertest');
require('dotenv').config({ path: './.env' });

const {deleteUserData} = require('./mock/mockfunc');
const MessageCode = require('../resources/messages');

let userId;

describe('User Module', () => {

    beforeAll(async () => {
        await deleteUserData();
    })

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


    /*it.todo('POST user/login - User Login - Invalid Password');
    it.todo('POST user/login - User Login - Invalid Email');
    it.todo('POST user/login - User Login - Not Verified');
    it.todo('POST user/login - User Login - Valid Credentials');

    it.todo('GET user/login - User Login - Valid Credentials');
    it.todo('POST user/login - User Login - Valid Credentials');
    it.todo('POST user/login - User Login - Valid Credentials');*/

})
