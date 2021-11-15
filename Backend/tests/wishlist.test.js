const server = require('../app');
const request = require('supertest');
require('dotenv').config({ path: './.env' });

const {mockDeleteUserData, mockDeleteWishListData, mockAddUser} = require('./mock/mockfunc');
const MessageCode = require('../resources/messages');
const {v4: uuidv4} = require("uuid");
const crypto = require("crypto");
const moment = require("moment");
const redisClient = require("../helpers/init_redis");

let userId;
let accessToken;
let refreshToken;
let wishlistId;
const password = 'test@234';

let newUserObj = {
    id: uuidv4(),
    first_name: 'Test2',
    last_name: 'User',
    email: 'test2@email.com',
    password: crypto
        .createHmac("sha256", process.env.PASSWORD_SECRET_KEY)
        .update(password)
        .digest("hex"),
    created_at: moment().unix(),
    is_verified: true
}

describe('WishList Module', () => {

    beforeAll(async () => {
        await mockDeleteUserData();
        await mockDeleteWishListData();
        await mockAddUser(newUserObj)
    });

    afterAll(async () => {
        await mockDeleteUserData();
        await mockDeleteWishListData();
        redisClient.quit();

    }, 50000)


    const testLoginUser = (data) => {
        return request(server).post('/user/login')
            .send(data);
    }

    it('POST user/login - User Login - Wishlist', async () => {

        let res = await testLoginUser({
            email: newUserObj.email,
            password: password
        });

        accessToken = res.body.value.token
        refreshToken = res.body.value.refreshToken
        userId = res.body.value.id

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                id: expect.any(String),
            })
        )

    }, 5000);

    /**
     * Add test wishlist
     * @param data
     * @returns {*}
     */
    const testAddWishList = (data) => {
        return request(server)
            .post('/wishlist')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(data);
    }

    it('POST wishlist - Add Wishlist - Invalid Payload', async () => {

        let invalidUserObj = {
            movie_id: '',
        }

        let res = await testAddWishList(invalidUserObj);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 5000);

    it('POST wishlist - Add Wishlist - Valid Payload', async () => {

        let validUserObj = {
            movie_id: 550,
        }

        let res = await testAddWishList(validUserObj);

        wishlistId = res.body.value.id;

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_WISHLIST_ADD_SUCCESS)

    }, 5000);

    /**
     * Get test wishlist
     * @returns {*}
     */
    const testGetWishList = () => {
        return request(server)
            .get('/wishlist')
            .set('Authorization', 'Bearer ' + accessToken)
            .send();
    }

    it('GET wishlist - Get All Wishlist - Valid', async () => {

        let res = await testGetWishList();

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.value.length).toBe(1)

    }, 5000);

    /**
     * Delete test wishlist
     * @param data
     * @returns {*}
     */
    const testDeleteWishList = (data) => {
        return request(server)
            .delete('/wishlist')
            .set('Authorization', 'Bearer ' + accessToken)
            .send(data);
    }

    it('DELETE wishlist - Remove Wishlist - Invalid Payload', async () => {

        let res = await testDeleteWishList(['test']);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(422);

    }, 5000);


    it('DELETE wishlist - Remove Wishlist - Invalid Payload', async () => {

        let payload = {
            movies: [wishlistId]
        }

        let res = await testDeleteWishList(payload);

        expect(res.type).toBe('application/json');
        expect(res.status).toBe(200);
        expect(res.body.message).toEqual(MessageCode.SCC_WISHLIST_REMOVE_SUCCESS)

    }, 5000);

    it('Wishlist - Mock Data Deletion confirmed', async () => {

        let resultUser = await mockDeleteUserData();
        let resultWishlist = await mockDeleteWishListData();

        console.log(resultWishlist, "resultWishlist")
        console.log(resultUser, "resultUser")

        // expect(resultUser).toBe(1)
        // expect(resultWishlist).toBe(0)

    }, 65000);
}, 70000)
