import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const WishlistButton = ({ productId }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const wishlist = localStorage.getItem('wishlist');
        const wishlistItemIds = wishlist ? JSON.parse(wishlist) : [];
        setIsWishlisted(wishlistItemIds.includes(productId));
    }, [productId]);

    const toggleWishlist = () => {
        const wishlist = localStorage.getItem('wishlist');
        let wishlistItemIds = wishlist ? JSON.parse(wishlist) : [];

        if (isWishlisted) {
            wishlistItemIds = wishlistItemIds.filter(id => id !== productId);
        } else {
            wishlistItemIds = [...wishlistItemIds, productId];
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlistItemIds));
        setIsWishlisted(!isWishlisted);
    };

    return (
        <button onClick={toggleWishlist} className="focus:outline-none">
            {isWishlisted ? (
                <AiFillHeart className="h-6 w-6 text-red-500" />
            ) : (
                <AiOutlineHeart className="h-6 w-6 text-gray-400 hover:text-red-500" />
            )}
        </button>
    );
};

export default WishlistButton;