import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";

// Same data (In a real app, this comes from a database)
const allProducts = [
  { id: 1, title: "Classic Blue Jeans", price: "₹2,499", category: "Bottoms", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2000&auto=format&fit=crop", desc: "Timeless denim jeans featuring a straight-leg cut and durable fabric." },
  { id: 2, title: "Minimalist Leather Watch", price: "₹4,999", category: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2000&auto=format&fit=crop", desc: "Elegant timepiece with genuine leather strap and water resistance." },
  { id: 3, title: "Premium Cotton T-Shirt", price: "₹999", category: "Tops", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop", desc: "Soft, breathable cotton t-shirt perfect for everyday wear." },
  { id: 4, title: "Urban Sunglasses", price: "₹1,499", category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop", desc: "UV-protected lenses with a modern frame design." },
  { id: 5, title: "Leather Crossbody Bag", price: "₹3,250", category: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop", desc: "Stylish and functional bag with multiple compartments." },
  { id: 6, title: "White Sneakers", price: "₹2,800", category: "Footwear", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2000&auto=format&fit=crop", desc: "Comfortable white sneakers suitable for sports and casual outings." },
  { id: 7, title: "Summer Floral Dress", price: "₹1,999", category: "Dresses", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2000&auto=format&fit=crop", desc: "Lightweight floral dress perfect for summer days." },
  { id: 8, title: "Formal Beige Blazer", price: "₹5,499", category: "Tops", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop", desc: "Tailored blazer that adds sophistication to any outfit." }
];

export default function ProductDetails({ addToCart }) {
  const { id } = useParams(); // Get the ID from the URL
  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) return <div className="p-10 text-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/shop" className="text-gray-500 hover:text-black flex items-center gap-2 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px]">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Right: Details */}
        <div>
          <Badge className="mb-4">{product.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-orange-600 font-bold mb-6">{product.price}</p>
          
          <div className="flex items-center gap-1 text-yellow-500 mb-6">
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <Star className="fill-current w-5 h-5" />
            <span className="text-gray-400 text-sm ml-2">(42 Reviews)</span>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{product.desc}</p>

          <div className="flex gap-4">
            <Button onClick={() => addToCart(product)} size="lg" className="bg-black hover:bg-gray-800 text-white flex-1 cursor-pointer">
              <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1 cursor-pointer">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}