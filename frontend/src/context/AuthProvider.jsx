import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/product/getallproduct"
      );
      console.log("hello", response);
      setProducts(response.data.products);
      setLoading(false);
    } catch (err) {
      setError(err, "Failed to fetch products");
      setLoading(false);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AuthContext.Provider value={{ products, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
