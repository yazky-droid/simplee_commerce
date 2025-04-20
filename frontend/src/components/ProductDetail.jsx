import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product details or data not found');
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


    const handleDelete = async () => {
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

                // redirect to products
                navigate('/products'); 
            } catch (err) {
                setError(err.message);
            }
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <img src={`http://127.0.0.1:8000${product.image_path}`} alt="Preview" className="mt-2 max-h-40" />
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <Link to="/products" className="text-blue-500 hover:underline block mt-4">Back to Product List</Link>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">Delete Product</button>
        </div>
    );
};

export default ProductDetail;