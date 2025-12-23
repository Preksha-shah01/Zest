import { useState } from "react";
import { Search, User, LogOut, X } from 'lucide-react'; 
import { NavLink, Link, useNavigate } from "react-router-dom"; 
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar"; // 1. Import Wishlist Sidebar
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 2. Add wishlist props to arguments
export default function Navbar({ cartItems = [], removeFromCart, wishlistItems = [], removeFromWishlist, addToCart }) { 
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  
  const [showSearch, setShowSearch] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/shop?q=${localSearch}`); 
      setShowSearch(false);        
    }
  };

  const getLinkClass = ({ isActive }) => 
    isActive ? "text-orange-600 font-bold transition scale-105" : "text-gray-600 hover:text-black transition";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <NavLink to="/" className="text-2xl font-bold text-orange-600 cursor-pointer">
          Zest.
        </NavLink>

        {!showSearch && (
          <div className="hidden md:flex gap-8 font-medium">
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            <NavLink to="/shop" className={getLinkClass}>Shop</NavLink>
            <NavLink to="/new-arrivals" className={getLinkClass}>New Arrivals</NavLink>
            <NavLink to="/sale" className={getLinkClass}>Sale</NavLink>
          </div>
        )}

        <div className="flex items-center gap-5">
          {/* Search */}
          {showSearch ? (
            <div className="relative flex items-center animate-in fade-in slide-in-from-right-4 duration-300">
              <Input 
                autoFocus
                placeholder="Search..." 
                className="w-[200px] md:w-[300px] h-9 pr-8"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
              <X className="w-4 h-4 absolute right-2 text-gray-400 cursor-pointer" onClick={() => setShowSearch(false)} />
            </div>
          ) : (
            <Search className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" onClick={() => setShowSearch(true)} />
          )}

          {/* 3. Add Wishlist Sidebar Here */}
          <WishlistSidebar 
            wishlistItems={wishlistItems} 
            removeFromWishlist={removeFromWishlist} 
            addToCart={addToCart} 
          />

          {/* User */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold hidden md:block">Hi, {user.name}</span>
              <Button onClick={logout} variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <User className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            </Link>
          )}

          <CartSidebar cartItems={cartItems} removeFromCart={removeFromCart} />
          <MobileMenu /> 
        </div>

      </div>
    </nav>
  );
}