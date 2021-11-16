import BaseAPI from "./utilities/request.lib";

/**
 * Add movies to wishlist
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
const addToWishlist = async (payload) => {
    return await BaseAPI.post(`/wishlist`, payload)
}

/**
 * Get all movies from wishlist
 * @returns {Promise<AxiosResponse<any>>}
 */
const getWishlistMovies = async () => {
    return await BaseAPI.get(`/wishlist`);
}

/**
 * Remove movie from wishlist
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
const removeWishlistMovies = async (payload) => {
    return await BaseAPI.put(`/wishlist`, payload)
}

/**
 * Check wishlist
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const checkWishlist = async (id) => {
    return await BaseAPI.get(`/wishlist/${id}`)
}

const wishlist = {
    addToWishlist,
    getWishlistMovies,
    removeWishlistMovies,
    checkWishlist
}

export default wishlist;
