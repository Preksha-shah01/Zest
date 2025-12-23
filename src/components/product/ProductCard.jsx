import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

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
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
        
        {/* WISHLIST BUTTON - This is what was missing! */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // Stop it from clicking the product link
            if (toggleWishlist) {
                toggleWishlist({ id, title, price, image, category });
            }
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition cursor-pointer"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
            }`} 
          />
        </button>

        <Badge className="absolute top-3 left-3 bg-white text-black hover:bg-white/90">
          {category}
        </Badge>
        
        <Link to={`/product/${id}`}>
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
          onClick={addToCart} 
          className="w-full bg-black text-white hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}