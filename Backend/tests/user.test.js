const server = require('../app');
const request = require('supertest');

describe('User Module', () => {

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

        let invalidUserObj = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test@email.com',
            password: 'test123',
        }

        let res = await testRegisterUser(invalidUserObj);

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
        let invalidUserObj = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test@email.com',
            password: 'test123',
        }

        let res = await testRegisterUser(invalidUserObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(409);

    });

    it.todo('POST user/login - User Login - Invalid Password');
    it.todo('POST user/login - User Login - Invalid Email');
    it.todo('POST user/login - User Login - Not Verified');
    it.todo('POST user/login - User Login - Valid Credentials');

    it.todo('GET user/login - User Login - Valid Credentials');
    it.todo('POST user/login - User Login - Valid Credentials');
    it.todo('POST user/login - User Login - Valid Credentials');

})
