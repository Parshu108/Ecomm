"use client";
import { toast } from "react-toastify";
import { createContext, useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react"; // ✅ add karo
import axios from "axios";

const API_URI = `/api`;
const productcontext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [datas, setData] = useState([]);
  const [cart, setCart] = useState([]); // ✅ default empty array

  const { data: session } = useSession(); // ✅ session check karo

  const fetchall = async () => {
    try {
      const api = await axios.get(`${API_URI}/electroproduct`);
      setProduct(api.data);
    } catch (error) {
      console.error("Products fetch error:", error);
    }
  };

  const addTocart = async (name, image, price) => {
    try {
      const api = await axios.post(`${API_URI}/cart`, { name, image, price });
      if (api.status === 200) {
        toast.success(api.data.message || "Added to cart 🛒", {
          autoClose: 1500,
          theme: "dark",
        });
        getCartdata(); // ✅ Cart refresh karo
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product ❌");
    }
  };

  const getCartdata = async () => {
    try {
      const api = await axios.get(`${API_URI}/cart`);
      setCart(Array.isArray(api.data) ? api.data : []);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setCart([]); // ✅ Error pe empty array
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URI}/cart`);
      setCart([]); // ✅ Clear karo
      getCartdata();
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  useEffect(() => {
    fetchall();
    // ✅ Sirf logged in hone pe cart load karo
    if (session) {
      getCartdata();
    }
  }, [session]); // ✅ session change hone pe dobara load karo

  return (
    <productcontext.Provider
      value={{
        products,
        datas,
        cart,
        setData,
        clearCart,
        addTocart,
        getCartdata,
      }}
    >
      {children}
    </productcontext.Provider>
  );
};

export const useProductcontext = () => useContext(productcontext);

export default productcontext;
