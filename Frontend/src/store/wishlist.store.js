import create from 'zustand';
import { devtools } from 'zustand/middleware';
import API from '../services'

const store = (set) => ({
    wishlist: [],
    getWishList: async () => {
        const response = await API.wishlist.getWishlistMovies()
        set({ wishlist: response.data.value })
    },
    /*removeWishlist: async (payload) => {
        const response = await API.wishlist.getWishlistMovies()
        await this.state.getWishList()
    }*/
})

const wishlistStore = create(devtools(store))

export default wishlistStore;
