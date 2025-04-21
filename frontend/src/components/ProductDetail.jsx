import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">Loading product...</div>;
    }

    if (error) {
        return <div className="bg-gray-900 text-red-500 py-6 px-4 sm:px-6 lg:px-8">Error: {error}</div>;
    }

    if (!product) {
        return <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">Product not found.</div>;
    }

    return (
        <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-slate-800 shadow overflow-hidden rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-white">{product.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-300">{product.description}</p>
                    </div>
                    <div className="border-t border-gray-700">
                        <dl>
                            <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-300">Price</dt>
                                <dd className="mt-1 text-sm text-white sm:col-span-2">Rp{product.price}</dd>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-300">Stock</dt>
                                <dd className="mt-1 text-sm text-white sm:col-span-2">{product.stock}</dd>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-300">Category</dt>
                                <dd className="mt-1 text-sm text-white sm:col-span-2">Casual Wear</dd>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-300">Product Posted</dt>
                                <dd className="mt-1 text-sm text-white sm:col-span-2">{new Date(product.created_at).toLocaleDateString()}</dd>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-300">Product Updated</dt>
                                <dd className="mt-1 text-sm text-white sm:col-span-2">{new Date(product.updated_at).toLocaleDateString()}</dd>
                            </div>
                            <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-300">Image</dt>
                                <img
                                    className="w-full h-full object-cover"
                                    src={product.image_path ? `http://127.0.0.1:8000${product.image_path}` : 'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png'}
                                    alt={product.name}
                                />
                            </div>
                        </dl>
                    </div>
                    <div className="px-4 py-5 sm:px-6 bg-slate-800 flex justify-between">
                        <Link to="/products" className="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Back to Explore
                        </Link>
                        {localStorage.getItem('role') === 'user' && (
                            <button className="disabled:cursor-not-allowed">
                            Wish
                            </button>
                        )}
                        {localStorage.getItem('role') === 'admin' && (
                            <Link to={`/admin/products/${product.id}/edit`} className="bg-gray-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Edit Product
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;