import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import { Toaster, toast } from "react-hot-toast"; 

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Sale from "./pages/Sale";
import NewArrivals from "./pages/NewArrivals";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout"; 
import MyOrders from "./pages/MyOrders"; // 1. Import New Page

export default function App() {
  // --- CART STATE ---
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("zestCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // --- WISHLIST STATE ---
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("zestWishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      return [];
    }
  });

  // --- 2. ORDER HISTORY STATE ---
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("zestOrders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("zestCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("zestWishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Save Orders to LocalStorage
  useEffect(() => {
    localStorage.setItem("zestOrders", JSON.stringify(orders));
  }, [orders]);

  // --- ACTIONS ---
  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    toast.error("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product) => {
    if (!product?.id) return;
    const exists = wishlistItems.some((item) => item.id === product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      toast("Removed from Wishlist", { icon: '💔' });
    } else {
      const cleanProduct = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      };
      setWishlistItems((prev) => [...prev, cleanProduct]);
      toast("Added to Wishlist", { icon: '❤️' });
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast("Removed from Wishlist", { icon: '💔' });
  };

  // 3. ADD ORDER FUNCTION
  const addOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Toaster position="bottom-right" />

        <Navbar 
          cartItems={cartItems} 
          removeFromCart={removeFromCart}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          addToCart={addToCart}
        />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
            <Route path="/new-arrivals" element={<NewArrivals addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
            <Route path="/sale" element={<Sale addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Pass addOrder to Checkout */}
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} addOrder={addOrder} />} />
            
            {/* New Route */}
            <Route path="/my-orders" element={<MyOrders orders={orders} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}