import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from '../components/WishlistButton';
import ProductContext from '../contexts/ProductContext';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const { products } = useContext(ProductContext)

    useEffect(() => {
        const wishlist = localStorage.getItem('wishlist');
        const wishlistItemIds = wishlist ? JSON.parse(wishlist) : [];

        const allProducts = products || []; 

        const currentWishlistItems = allProducts.filter(product =>
            wishlistItemIds.includes(product.id)
        );

        setWishlistItems(currentWishlistItems);
    }, []);

    return (
        <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(product => (
                        <div key={product.id} className="bg-slate-800 rounded-lg shadow-md p-4">
                            <Link to={`/products/${product.id}`}>
                                <img src={product.image_path ? `http://127.0.0.1:8000${product.image_path}` : 'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png'} alt={product.name} className="w-full h-48 object-cover rounded-md mb-2" />
                                <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                                <p className="text-gray-300 text-sm mb-2">{product.description?.substring(0, 50)}...</p>
                                <p className="text-indigo-400 font-semibold">${product.price}</p>
                            </Link>
                            <div className="mt-2 flex justify-between items-center">
                                <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">View Details</Link>
                                <WishlistButton productId={product.id} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-300">Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default WishlistPage;