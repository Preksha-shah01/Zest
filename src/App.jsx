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

export default function App() {
  // --- CART STATE ---
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("zestCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // --- WISHLIST STATE (New!) ---
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("zestWishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save Cart
  useEffect(() => {
    localStorage.setItem("zestCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Wishlist (New!)
  useEffect(() => {
    localStorage.setItem("zestWishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // --- ACTIONS ---
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success(`${product.title} added to cart!`, {
      style: { background: '#333', color: '#fff' },
      iconTheme: { primary: '#ea580c', secondary: '#fff' },
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
    toast.error("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Toggle Wishlist (Add or Remove)
  const toggleWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    
    if (exists) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
      toast("Removed from Wishlist", { icon: '💔' });
    } else {
      setWishlistItems([...wishlistItems, product]);
      toast("Added to Wishlist", { icon: '❤️' });
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Toaster position="bottom-right" />

        {/* Pass Wishlist props to Navbar */}
        <Navbar 
          cartItems={cartItems} 
          removeFromCart={removeFromCart}
          wishlistItems={wishlistItems}
          removeFromWishlist={removeFromWishlist}
          addToCart={addToCart}
        />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            
            {/* Pass toggleWishlist to Shop */}
            <Route path="/shop" element={<Shop addToCart={addToCart} toggleWishlist={toggleWishlist} wishlistItems={wishlistItems} />} />
            
            <Route path="/new-arrivals" element={<NewArrivals addToCart={addToCart} />} />
            <Route path="/sale" element={<Sale addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} clearCart={clearCart} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}