import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({}); 
    const [currentPage, setCurrentPage] = useState(1); 


    const fetchProducts = async (page = 1) => {
            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/products?page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.data || []); 
                setPagination(data.pagination || {}); 
                setLoading(false);
                setCurrentPage(page);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const value = {
        products,
        loading,
        error,
        pagination,
        currentPage,
        setCurrentPage: fetchProducts,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
};

export default ProductContext;