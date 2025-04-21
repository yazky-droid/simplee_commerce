import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../contexts/ProductContext';
import AuthContext from '../contexts/AuthContext';
import WishlistButton from '../components/WishlistButton';

const ProductExplore = () => {
    const { products, loading, error, pagination, currentPage, setCurrentPage } = useContext(ProductContext);
    const { isLoggedIn, role } = useContext(AuthContext);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error loading products: {error}</div>;
    }

    return (
        <div className="bg-gray-900 py-10 px-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-white mb-6">Jelajahi Koleksi Kami</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <div key={product.id} className='bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300'>
                        <Link to={`/products/${product.id}`} className=" bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <div className="aspect-w-4 aspect-h-3">
                                <img
                                    className="w-full h-28 object-cover"
                                    src={product.image_path ? `https://api.yazkymaulana.my.id${product.image_path}` : 'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png'}
                                    alt={product.name}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
                                <p className="mt-1 text-sm text-gray-300 truncate">{product.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-indigo-600 font-bold">Rp{product.price}</span>
                                    {product.stock > 0 ? (
                                        <span className="text-green-500 text-sm">Stok: {product.stock}</span>
                                    ) : (
                                        <span className="text-red-500 text-sm">Stok Habis</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                        <div className="mt-2 flex justify-end">
                            {role == 'user'  && 
                            <WishlistButton productId={product.id} />
                            }
                        </div>
                        </div>
                    ))}
                </div>

                {pagination.total_pages > 1 && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setCurrentPage(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                            className="bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-l  hover:bg-gray-600 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`py-2 px-4 font-bold ${currentPage === page ? 'bg-indigo-500 text-white' : ' bg-gray-600 text-gray-300 hover:bg-gray-700'}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.total_pages}
                            className="bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded-r  hover:bg-gray-600 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductExplore;