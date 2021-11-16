import React, {useEffect, useState} from 'react';
import MainContainer from "../components/Containers/Common/MainContainer";
import WishListItem from "../components/UI/WishList/WishListItem";
import MainButton from "../components/UI/MainButton/MainButton";
import wishlistStore from '../store/wishlist.store'
import API from "../services";
import {toast} from "react-toastify";

const WishList = () => {

    const getAllWishlist = wishlistStore(state => state.getWishList)

    const wishList = wishlistStore(state => state.wishlist)

    useEffect(() => {
        getAllWishlist();
    }, [getAllWishlist])

    const [removeItemList, setRemoveItemList] = useState([]);

    const handleChange = (e) => {
        const {value, checked} = e.target;
        const removeList = [...removeItemList];
        if (checked) {
            removeList.push(value);
        } else {
            const itemIndex = removeList.findIndex(item => item === value);
            removeList.splice(itemIndex, 1);
        }
        setRemoveItemList(removeList);
    };

    const onRemove = async (single = null) => {
        await API.wishlist.removeWishlistMovies({
            movies: single ? [single] : removeItemList
        })
            .then((res) => {
                getAllWishlist();
                toast.success(res.data.message)
                console.log(res)
            })
            .catch((err) =>  {
                toast.error(err.response ? err.response.data.message : 'Something went wrong')
            })
    }

    const items = wishList.map(item =>
        <WishListItem
            id={item.id}
            key={item.id}
            movie={item}
            handleChange={handleChange}
            onRemove={(single) => onRemove(single)}
        />
    );

    return (
        <div className="wishlist">
            <MainContainer class="pt-4">
                <div className="wishlist-header">
                    <h2 className="mb-4">Wish List</h2>
                    <MainButton disabled={wishList.length === 0} handleClick={() => onRemove()}>
                        Remove Selected
                    </MainButton>
                </div>
                {items}
            </MainContainer>
        </div>
    );
};

export default WishList;
