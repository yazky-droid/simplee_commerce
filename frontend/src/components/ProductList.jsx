import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/products',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if(!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false)
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <Link to="/products/create" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">Create Product</Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    products.map((product) => (
                        <div key={product.id} className="border rounded-md p-4">
                            <img src={`http://127.0.0.1:8000${product.image_path}`} alt="Preview" className="mt-2 max-h-40" />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Stock: ${product.stock}</p>
                            <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline block mt-2">View Details</Link>
                            <Link to={`/product/${product.id}/edit`} className="text-yellow-500 hover:underline block mt-2">Edit</Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductList;