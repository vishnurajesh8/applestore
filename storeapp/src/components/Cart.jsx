import React, { useState,useEffect } from "react";
import './Cart.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const redirect = useNavigate()

  const fetchCardData = async () =>{
    try{
      const token = localStorage.getItem('token');

      if (!token){
        redirect('/login')
      }

      const authConfig={
        headers:{
          Authorization: `Bearer ${token}`,
        },
       };
       const response = await axios.get('http://127.0.0.1:8000/api/cart/',authConfig)
       if(response.status==200){
        console.log(response.data)
        setCartItems(response.data)
       }
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(
    ()=>{
      fetchCardData()
    },[]
  )


  const UpdateCartData = async (product_id,quantity) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        redirect('/')
      }

      
      const config = {
        headers: {  
          Authorization: `Bearer ${token}`, 
        },
      };
      const response = await axios.post(`http://127.0.0.1:8000/api/add_to_cart/${product_id}/`, {"quantity":quantity}, config);

    
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };



  const handleQuantityChange = (id, increment,product_id,current_quantity) => {
    if (current_quantity+increment>0){
      UpdateCartData(product_id,increment)

    }
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id ? { ...item,  quantity: Math.max(1, item.quantity + increment), } : item
      )
    );
  };


  const removeCartItem = async (cart_id)=>{


    try {
      const token = localStorage.getItem('token');

      if (!token) {
        redirect('/login')
      }

     
      const config = {
        headers: {  
          Authorization: `Bearer ${token}`, 
        },
      };
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete_cart/${cart_id}/`,config);

    
    } catch (error) {
      console.error('Error delete cart item :', error.message);
    }

  }



  const handleRemoveItem = (id) => {
    removeCartItem(id)
    setCartItems((cartItems) =>cartItems.filter((item) => item.id !== id));
  };


  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between mb-6 border-b pb-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={`http://127.0.0.1:8000/${item.product.images[0].image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-md hover:scale-105 transition-all"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-800">{item.product.name}</p>
                    <p className="text-sm text-gray-500">${item.product.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(item.id,  - 1,item.product.id,item.quantity)}
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-all"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value),item.product.id,item.quantity)}
                    className="w-16 text-center border border-gray-300 rounded-md shadow-sm"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, 1,item.product.id,item.quantity)}
                    className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 transition-all"
                  >
                    +
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-8 border-t pt-6">
            <p className="text-2xl font-semibold text-gray-800">Total: ${getTotalPrice()}</p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
