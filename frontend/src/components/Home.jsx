import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext'; 
import ProductContext from '../contexts/ProductContext';

const Home = () => { 
    const navigate = useNavigate();
    const { products, loading, error } = useContext(ProductContext);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error loading products: {error}</div>;
    }

    const displayedProducts = products.slice(0,4);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-1 lg:gap-8">
                    <div className="mt-10 lg:mt-0">
                        <div className="flex justify-between items-center flex-col md:flex-row">
                            <h2 className="text-center md:text-start md:flex-1/2 text-6xl mb-4 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
                            Your Style. Your Rules. <br/><span className='font-serif'>Karsaster</span>
                            </h2>
                            <p className="md:flex-1/3 text-justify p-3 md:p-5 mt-3 text-lg text-gray-500 dark:text-gray-300">
                            Wanna break the mold? Karsaster's got the freshest threads to fuel your individuality. Explore a diverse range of high-quality menswear – from laid-back vibes to dressed-to-impress looks. Express yourself, your way.
                            </p>
                        </div>
                        <div className="mt-8">
                            <div className="inline-flex rounded-md shadow">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white border border-gray-700 bg-gray-900 hover:bg-gray-700"
                                >
                                    Jelajahi Koleksi
                                </Link>
                            </div>
                        </div>
                    
                        {displayedProducts.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Produk Terbaru</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="bg-gray-800/15 rounded-lg shadow-md p-4 flex flex-col gap-4 items-center md:items-end">
                                            <h4 className="text-gray-900 dark:text-white font-extrabold text-4xl md:text-7xl">Karsstr</h4>
                                            <h4 className="text-gray-900 dark:text-white font-extrabold text-4xl md:text-7xl">Merch</h4>
                                        </div>
                                    {displayedProducts.map(product => (
                                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 overflow-hidden
                                        cursor-pointer
                                        transition-transform
                                        hover:scale-[1.02] hover:shadow-lg">
                                            <div className="aspect-w-4 aspect-h-3">
                                            <img className="w-full object-cover xs:object-contain sm:object-cover h-28" alt={product.name} src={product.image_path ? `http://127.0.0.1:8000${product.image_path}` : 'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png'} /></div>
                                          <div className="p-3 flex flex-col justify-between gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
                                          <div>
                                            <div className=" flex justify-between">
                                              <div className="flex flex-col">
                                                <span className="text-xl font-medium">{product.name}</span>
                                                <span className="flex items-center gap-1">
                                                  <span>Stock: {product.stock}</span>
                                                </span>
                                              </div>
                                  
                                              <div className="flex flex-col items-end">
                                                <span className="text-cyan-500">Rp{product.price}</span>
                                              </div>
                                            </div>
                                            <p className="text-sm text-gray-400 text-center">{product.description}</p>
                                          </div>
                                          <div className="w-full pt-4 border-t flex justify-between items-center mt-4">
                                            <button className="border border-cyan-600 py-3 text-sm rounded-full px-6 hover:bg-cyan-600 hover:text-white transition hover:shadow-md disabled:cursor-not-allowed">
                                              Add to Cart
                                            </button>
                                            <button className="disabled:cursor-not-allowed">
                                            Wish
                                            </button>
                                          </div>
                                        </div>
                                        </div>

                                        
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
{/* <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                                            <div className="aspect-w-4 aspect-h-3">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={product.image_path ? `http://127.0.0.1:8000${product.image_path}` : 'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png'}
                                                    alt={product.name}
                                                />
                                            </div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">{product.description?.substring(0, 50)}...</p>
                                            <p className="text-indigo-600 font-bold">${product.price}</p>
                                        </div> */}
    // return (
    //     <div>
    //         <h1>Home</h1>
    //         {isLoggedIn ? (
    //             <div>
    //                 <button onClick={() => logout(navigate)}>Logout</button> {}
    //                 {role === 'admin' && (
    //                     <div>
    //                         <h2>Admin Dashboard</h2>
    //                         <ProductList />
    //                         <Link to="/users">Users</Link>
    //                     </div>
    //                 )}
    //                 {role === 'user' && (
    //                     <div>
    //                         <h2>User Dashboard</h2>
    //                         {/* Tampilkan info akun user (misalnya) */}
    //                     </div>
    //                 )}
    //             </div>
    //         ) : (
    //             <div>
    //                 <h1>Please Login</h1>
    //                 <Link to="/login">Login</Link>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default Home;