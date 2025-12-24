import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProductCard({ 
  id, 
  image, 
  title, 
  price, 
  category, 
  addToCart, 
  toggleWishlist, 
  isInWishlist 
}) {
  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 relative">
      
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
        
        {/* WISHLIST BUTTON - Updated Z-Index and Safety Checks */}
        <button 
          type="button" 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            
            // Debug check: Is the function actually here?
            if (!toggleWishlist) {
                console.error("toggleWishlist function is missing in ProductCard!");
                toast.error("Error: Wishlist function not connected here.");
                return;
            }

            toggleWishlist({ id, title, price, image, category });
          }}
          className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition cursor-pointer active:scale-90 flex items-center justify-center"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
            }`} 
          />
        </button>

        <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-white/90 z-40">
          {category}
        </Badge>
        
        <Link to={`/product/${id}`} className="block w-full h-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-bold text-lg truncate group-hover:text-orange-600 transition">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 font-medium mt-1">{price}</p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            addToCart();
          }} 
          className="w-full bg-black text-white hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}