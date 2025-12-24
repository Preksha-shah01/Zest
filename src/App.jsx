import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import { Toaster, toast } from "react-hot-toast"; 

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
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
    try {
      const savedCart = localStorage.getItem("zestCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart data:", error);
      return [];
    }
  });

  // --- WISHLIST STATE (Robust Version) ---
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("zestWishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error("Error parsing wishlist data:", error);
      return [];
    }
  });

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("zestCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem("zestWishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // --- CART ACTIONS ---
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    toast.success(`${product.title} added to cart!`, {
      style: { background: '#333', color: '#fff' },
      iconTheme: { primary: '#ea580c', secondary: '#fff' },
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
    toast.error("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // --- WISHLIST ACTIONS (Fixed & Stable) ---
  const toggleWishlist = (product) => {
    if (!product || !product.id) return; // Safety check

    // Check if item exists
    const exists = wishlistItems.some((item) => item.id === product.id);
    
    if (exists) {
      // Remove item
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      toast("Removed from Wishlist", { icon: '💔' });
    } else {
      // Add item (Create a clean object to avoid saving unnecessary data)
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

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/* Toast Notification Container */}
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
            <Route 
              path="/" 
              element={
                <Home 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist} 
                  wishlistItems={wishlistItems} 
                />
              } 
            />
            
            <Route 
              path="/shop" 
              element={
                <Shop 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist} 
                  wishlistItems={wishlistItems} 
                />
              } 
            />
            
            <Route 
              path="/new-arrivals" 
              element={
                <NewArrivals 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist} 
                  wishlistItems={wishlistItems} 
                />
              } 
            />
            
            <Route 
              path="/sale" 
              element={
                <Sale 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist} 
                  wishlistItems={wishlistItems} 
                />
              } 
            />
            
            <Route 
              path="/product/:id" 
              element={
                <ProductDetails 
                  addToCart={addToCart} 
                  toggleWishlist={toggleWishlist} 
                  wishlistItems={wishlistItems} 
                />
              } 
            />
            
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