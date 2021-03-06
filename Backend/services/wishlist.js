const {WishList} = require("../models");
const {Op} = require("sequelize");

class WishlistService {
    constructor() {
    }

    /**
     * Remove movies from wishlist
     * @param data
     * @returns {Promise<number>}
     */
    static removeWishlistMovies = async (data) => {
        return await WishList.destroy({
            where: {
                id: {
                    [Op.in]: data
                }
            },
        });
    };

    /**
     * Remove added wish list
     * @param movieId
     * @param userId
     * @returns {Promise<number>}
     */
    static removeAddedWishList = async (movieId, userId) => {
        return await WishList.destroy({
            where: {
                user_id: userId,
                movie_id: movieId
            }
        })
    }

    /**
     * Add movie to wishlist
     * @param payload
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static addWishlist = async (payload) => {
        return WishList.create(payload);
    }

    /**
     * Get wishlist which related to user
     * @param id
     * @returns {Promise<Model[]>}
     */
    static getAllWishlist = async (id) => {
        return await WishList.findAll({
            where: {
                user_id: id,
            },
        });
    }

    /**
     * Check wish list
     * @param movieId
     * @param userId
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    static checkWishlist = async (movieId, userId) => {
        return await WishList.findOne({
            where: {
                user_id: userId,
                movie_id: movieId
            }
        })
    }
}

module.exports = WishlistService;
