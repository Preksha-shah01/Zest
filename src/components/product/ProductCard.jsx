import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ image, title, price, category, addToCart }) {
  return (
    <Card className="group overflow-hidden border-none shadow-none hover:shadow-lg transition-all duration-300">
      
      {/* 1. Image Section */}
      <div className="relative h-80 bg-gray-100 overflow-hidden rounded-t-lg">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        
        <div className="absolute top-3 left-3">
           <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
             {category}
           </Badge>
        </div>
      </div>

      {/* 2. Content Section */}
      <CardContent className="pt-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{category}</p>
        <p className="text-xl font-bold text-orange-600 mt-2">{price}</p>
      </CardContent>

      {/* 3. Footer */}
      <CardFooter>
        <Button 
          onClick={addToCart}
          className="w-full bg-black hover:bg-gray-800 text-white gap-2 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}