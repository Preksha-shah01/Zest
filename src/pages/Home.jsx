import Hero from "@/components/layout/Hero";
import ProductCard from "@/components/product/ProductCard";

const products = [
  {
    id: 1,
    title: "Classic Blue Jeans",
    price: "₹2,499",
    category: "Denim",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Minimalist Leather Watch",
    price: "₹4,999",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Premium Cotton T-Shirt",
    price: "₹999",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Urban Sunglasses",
    price: "₹1,499",
    category: "Eyewear",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Home({ addToCart }) {
  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              // --- THESE WERE LIKELY MISSING BEFORE ---
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
              // ----------------------------------------
              addToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}