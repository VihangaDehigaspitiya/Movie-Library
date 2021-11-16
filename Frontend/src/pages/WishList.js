import React, {useState} from 'react';
import MainContainer from "../components/Containers/Common/MainContainer";
import WishListItem from "../components/UI/WishList/WishListItem";
import MainButton from "../components/UI/MainButton/MainButton";

const WishList = () => {

    const list = [1, 15, 343, 64537, 32, 533, 64, 6, 7977, 35];
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

    const items = list.map(item =>
        <WishListItem
            id={item}
            key={item}
            handleChange={handleChange}
        />
    );

    return (
        <div className="wishlist">
            <MainContainer class="pt-4">
                <div className="wishlist-header">
                    <h2 className="mb-4">Wish List</h2>
                    <MainButton>
                        Remove Selected
                    </MainButton>
                </div>
                {items}
            </MainContainer>
        </div>
    );
};

export default WishList;
