"use client";
import { toast } from "react-toastify";
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const API_URI = `http://localhost:3000/api`;
const productcontext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [datas, setData] = useState([]);
    const [cart, setCart] = useState([]);


  const fetchall = async () => {
    const api = await axios.get(`${API_URI}/electroproduct`);
    setProduct(api.data);
  };

  const addTocart=async(name,image,price)=>{
   try{
      const api=await axios.post(`${API_URI}/cart`,{
         name,image,price
      });
   console.log("API RESPONSE:", api.data);

      if (api.status === 200) {
        toast.success(api.data.message || "Added to cart 🛒", {
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product ❌");
    }
  }

  const getCartdata = async () => {
    const api = await axios.get(`${API_URI}/cart`);
    setCart(api.data);
  };

  const clearCart = async () => {
    const api = await axios.delete(`${API_URI}/cart`);
    getCartdata();
  };


  useEffect(() => {
    getCartdata();
    fetchall();
  }, []);

  console.log("fetchALL product", products);

  return (
    <>
      <productcontext.Provider value={{products, datas, cart,setData,clearCart, addTocart, getCartdata,}}>
        {children}
      </productcontext.Provider>
    </>
  );
};

export const useProductcontext = () => useContext(productcontext);

export default productcontext;