const { User, WishList } = require("../../models");

/**
 * Delete all test user records
 * @returns {Promise<number>}
 */
const deleteUserData = async () => {
    return await User.destroy({
        where: {},
    })
}


/**
 * Delete all wish list records
 * @returns {Promise<number>}
 */
const deleteWishListData = async () => {
    return await WishList.destroy({
        where: {},
    })
}


const mock = {
    deleteWishListData,
    deleteUserData
}

module.exports = mock;
