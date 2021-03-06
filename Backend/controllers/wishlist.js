const {v4: uuidv4} = require("uuid");
const moment = require("moment");

const WishlistService = require("../services/wishlist");
const OperationResult = require("../helpers/result");
const MessageCode = require("../resources/messages");

/**
 * @typedef WishList
 * @property {integer} movie_id.required - movie_id - eg: 1
 * @property {boolean} is_added_wishlist.required - is_added_wishlist - eg: false
 * @property {string} title.required - title - eg: title
 * @property {string} image.required - image - eg: image
 * @property {string} genre.required - genre - eg: genre
 * @property {string} release_date.required - release_date - eg: release_date
 */

/**
 * Add movie to wishlist
 * @group Wishlist
 * @route POST /wishlist
 * @param {WishList.model} WishList.body
 * @produces application/json
 * @consumes application/json
 * @security JWT
 */
const addToWishList = async (req, res) => {
    try {
        const dataValues = {
            id: uuidv4(),
            user_id: req.user.id,
            movie_id: req.body.movie_id,
            image: req.body.image,
            title: req.body.title,
            release_date: req.body.release_date,
            genre: req.body.genre,
            created_at: moment().unix()
        }
        if (!req.body.is_added_wishlist) {
            await WishlistService.removeAddedWishList(dataValues.movie_id, dataValues.user_id);
        } else {
            await WishlistService.addWishlist(dataValues);
        }
        return res.status(200).jsonp(OperationResult.success({
            id: dataValues.id,
            movie_id: dataValues.movie_id,
        }, MessageCode.SCC_WISHLIST_ADD_SUCCESS))
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
};

/**
 * Get movies from wishlist
 * @group Wishlist
 * @route GET /wishlist
 * @produces application/json
 * @consumes application/json
 * @security JWT
 */
const getWishlistMovies = async (req, res) => {
    try {
        const movies = await WishlistService.getAllWishlist(req.user.id)
        return res.status(200).jsonp(OperationResult.success(movies))
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
};

/**
 * @typedef WishListRemove
 * @property {Array.<string>} movies - movies
 */


/**
 * Remove movies from wishlist
 * @group Wishlist
 * @route PUT /wishlist
 * @param {WishListRemove.model} WishListRemove.body
 * @produces application/json
 * @consumes application/json
 * @security JWT
 */
const removeWishlistMovies = async (req, res) => {
    try {
        await WishlistService.removeWishlistMovies(req.body.movies)
        return res.status(200).jsonp(OperationResult.success(null, MessageCode.SCC_WISHLIST_REMOVE_SUCCESS))
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
};

/**
 * Check wish list
 * @group Wishlist
 * @route GET /wishlist/{id}
 * @param {string} id.path.required
 * @produces application/json
 * @consumes application/json
 * @security JWT
 */
const checkWishList = async (req, res) => {
    try {
        const movie = await WishlistService.checkWishlist(req.params.id, req.user.id)
        return res.status(200).jsonp(OperationResult.success(!!movie))
    } catch (e) {
        return res.status(500).jsonp(OperationResult.failed(MessageCode.ERR_INTERNAL_SERVER, e.message));
    }
};

const wishlist = {
    addToWishList,
    getWishlistMovies,
    removeWishlistMovies,
    checkWishList
}

module.exports = wishlist;
