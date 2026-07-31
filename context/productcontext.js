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
        getCartdata();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info(error.response.data.message || "Product already added ⚠️", {
          autoClose: 1500,
          theme: "dark",
        });
      } else {
        console.error(error);
        toast.error("Failed to add product ❌");
      }
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

 const increaseQty = async (id) => {
   setCart((prev) =>
     prev.map((item) =>
       item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item,
     ),
   );
   try {
     await axios.post(`${API_URI}/cart/${id}`, { action: "increase" });
     getCartdata();
   } catch (error) {
     console.error("Increase quantity error:", error);
     toast.error("Failed to update quantity ❌");
     getCartdata();
   }
 };

 const decreaseQty = async (id) => {
   const current = cart.find((item) => item._id === id);
   if (current && (current.qty || 1) <= 1) {
     return removeFromCart(id);
   }
   setCart((prev) =>
     prev.map((item) =>
       item._id === id
         ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) }
         : item,
     ),
   );
   try {
     await axios.post(`${API_URI}/cart/${id}`, { action: "decrease" });
     getCartdata();
   } catch (error) {
     console.error("Decrease quantity error:", error);
     toast.error("Failed to update quantity ❌");
     getCartdata();
   }
 };

 const removeFromCart = async (id) => {
   const previousCart = cart;
   setCart((prev) => prev.filter((item) => item._id !== id));
   try {
     const api = await axios.delete(`${API_URI}/cart/${id}`);
     toast.success(api.data?.message || "Removed from cart 🗑️", {
       autoClose: 1500,
       theme: "dark",
     });
     getCartdata();
   } catch (error) {
     console.error("Remove from cart error:", error);
     toast.error("Failed to remove product ❌");
     setCart(previousCart);
   }
 };


  useEffect(() => {
    const initData = async () => {
      await fetchall();
      if (session) {
        await getCartdata();
      }
    };
    initData();
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
        increaseQty,
        decreaseQty,
        removeFromCart,
      }}
    >
      {children}
    </productcontext.Provider>
  );
};

export const useProductcontext = () => useContext(productcontext);

export default productcontext;
