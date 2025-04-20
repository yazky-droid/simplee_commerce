import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products?page=${currentPage}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if(!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            setProducts(data.data);
            setPagination(data.pagination);
            setLoading(false);

        } catch (err) {
            setError(err.message);
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]); 

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <Link to="/products/create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4 inline-block">Create Product</Link>
            {products.length > 0 ? (
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-5 py-5 border-b border-gray-200 text-gray-700 bg-white text-sm">{product.name}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-gray-700 bg-white text-sm">{product.description}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-gray-700 bg-white text-sm">{product.price}</td>
                                <td className="px-5 py-5 border-b border-gray-200 text-gray-700 bg-white text-sm">{product.stock}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline mr-2">View</Link>
                                    <Link to={`/products/${product.id}/edit`} className="text-green-500 hover:underline mr-2">Edit</Link>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products found.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {pagination.current_page > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Previous</button>
                )}
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`py-2 px-4 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>{page}</button>
                ))}
                {pagination.current_page < pagination.total_pages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Next</button>
                )}
            </div>
        </div>
    );

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                // Refetch products to update the list
                fetchProducts();
            } catch (err) {
                setError(err.message);
            }
        }
    }
};

export default ProductList;