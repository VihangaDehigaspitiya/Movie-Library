const server = require('../app');
const request = require('supertest');

describe('User Module', () => {

    const testRegisterUser = (data) => {
        return request(server).post('/user/register')
            .send(data);
    }

    it('POST user/register - User Registration - Invalid Payload', async () => {

        let invalidUserObj = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }

        let res = await testRegisterUser(invalidUserObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    });
    it.todo('POST user/register - User Registration - Valid Payload');
    it.todo('POST user/register - User Registration - Duplicate Email');

    it.todo('POST user/login - User Login - Invalid Password');
    it.todo('POST user/login - User Login - Invalid Email');
    it.todo('POST user/login - User Login - Not Verified');
    it.todo('POST user/login - User Login - Valid Credentials');

    it.todo('GET user/login - User Login - Valid Credentials');
    it.todo('POST user/login - User Login - Valid Credentials');
    it.todo('POST user/login - User Login - Valid Credentials');

})
