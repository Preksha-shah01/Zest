import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { allProducts } from "@/data/products"; 
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "@/components/product/ProductCard"; 
import { toast } from "react-hot-toast"; 

export default function ProductDetails({ addToCart, toggleWishlist, wishlistItems = [] }) {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null); 

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedSize(null);
  }, [id]);

  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) return <div className="text-center py-20">Product not found!</div>;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4); 

  const isInWishlist = wishlistItems.some((item) => item.id === product.id);
  
  // 1. UPDATE: Removed "Footwear" from this list
  // Now ONLY clothes will ask for a size.
  const hasSize = ["Tops", "Bottoms", "Dresses", "Jackets"].includes(product.category);
  
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (hasSize && !selectedSize) {
      toast.error("Please select a size first!", { 
        icon: '📏',
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      return;
    }
    
    addToCart({ ...product, size: selectedSize });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <span className="text-orange-600 font-semibold tracking-wide uppercase mb-2">{product.category}</span>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl font-bold mb-6">{product.price}</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Elevate your style with this premium {product.title.toLowerCase()}. 
            Perfect for any occasion.
          </p>

          {/* Size Selector (Only shows for Tops, Bottoms, Dresses, Jackets) */}
          {hasSize && (
            <div className="mb-8">
              <span className="font-bold text-sm">Select Size:</span>
              <div className="flex gap-3 mt-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium transition-all
                      ${selectedSize === size 
                        ? "border-black bg-black text-white scale-110" 
                        : "border-gray-200 text-gray-600 hover:border-black"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            <Button 
              size="lg" 
              className="flex-1 bg-black hover:bg-gray-800 text-white h-12 text-lg cursor-pointer"
              onClick={handleAddToCart} 
            >
              <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className={`h-12 w-12 p-0 border-2 cursor-pointer ${isInWishlist ? 'border-red-200 bg-red-50' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <Star className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-6">
            <div className="flex flex-col items-center gap-2"><Truck className="w-6 h-6 text-orange-600" /><span className="text-xs font-medium">Free Shipping</span></div>
            <div className="flex flex-col items-center gap-2"><ShieldCheck className="w-6 h-6 text-orange-600" /><span className="text-xs font-medium">2 Year Warranty</span></div>
            <div className="flex flex-col items-center gap-2"><RefreshCw className="w-6 h-6 text-orange-600" /><span className="text-xs font-medium">30 Day Return</span></div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-gray-100 pt-16">
          <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <ProductCard 
                key={item.id}
                {...item}
                addToCart={() => addToCart(item)} 
                toggleWishlist={toggleWishlist}
                isInWishlist={wishlistItems.some(w => w.id === item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}