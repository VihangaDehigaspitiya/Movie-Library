const { User, WishList } = require("../../models");

/**
 * Delete all test user records
 * @returns {Promise<number>}
 */
const mockDeleteUserData = async () => {
    return await User.destroy({
        where: {},
    })
}


/**
 * Delete all wish list records
 * @returns {Promise<number>}
 */
const mockDeleteWishListData = async () => {
    return await WishList.destroy({
        where: {},
    })
}

/**
 * Add new user
 * @param payload
 * @returns {Promise<number>}
 */
const mockAddUser = async (payload) => {
    return await User.create(payload)
}

/**
 * Get user details by id
 * @param id
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
const mockGetUserFromId = async (id) => {
    return await User.findOne({
        where: {
            id: id
        }
    })
}




const mock = {
    mockDeleteUserData,
    mockDeleteWishListData,
    mockAddUser,
    mockGetUserFromId
}

module.exports = mock;
