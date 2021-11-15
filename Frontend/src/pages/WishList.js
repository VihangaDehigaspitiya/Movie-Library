import React from 'react';
import MainContainer from "../components/Containers/Common/MainContainer";
import WishListItem from "../components/UI/WishList/WishListItem";
import MainButton from "../components/UI/MainButton/MainButton";

const WishList = () => {
    return (
        <div className="wishlist">
            <MainContainer class="pt-4">
                <div className="wishlist-header">
                    <h2 className="mb-4">Wish List</h2>
                    <MainButton>
                        Remove Selected
                    </MainButton>
                </div>
                <WishListItem/>
                <WishListItem/>
                <WishListItem/>
                <WishListItem/>
            </MainContainer>
        </div>
    );
};

export default WishList;
