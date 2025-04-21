import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams(); // Get product ID from URL for edit purposes
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if(id) {
            // fetch data product for editing 
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`https://api.yazkymaulana.my.id/api/products/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    })
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch product details');
                    }
                    
                    const data = await response.json();
                    setName(data.data.name);
                    setDescription(data.data.description);
                    setPrice(data.data.price);
                    setStock(data.data.stock);
                    if (data.data.image_path) {
                        setPreviewImage(`https://api.yazkymaulana.my.id${data.data.image_path}`);
                    }
                } catch (err) {
                    setError(err.message);
                }
            };

            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // using form data because we need to upload file
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        if (image) {
            formData.append('image', image); 
        }

        try {
            const method = 'POST';
            const url = id ? `https://api.yazkymaulana.my.id/api/products/${id}?_method=PUT` : 'https://api.yazkymaulana.my.id/api/products';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    // Handle backend validation errors
                    const errorMessages = Object.values(errorData.errors).join('\n');
                    throw new Error(errorMessages);
                } else {
                    throw new Error('Failed to save product');
                }
            }

            // redirect to product list
            navigate('/products');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for image
    };

    return(
        <div>
            <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Create Product'}</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-400 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-400 text-sm font-bold mb-2">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-400 text-sm font-bold mb-2">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-400 text-sm font-bold mb-2">Stock</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-400 text-sm font-bold mb-2">Image</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
                    {previewImage && <img src={previewImage} alt="Preview" className="mt-2 max-h-40" />}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Product</button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;