import ProductCard from "@/components/product/ProductCard";

// Mock Data: Brand new items
const newProducts = [
  {
    id: 201,
    title: "Urban Bomber Jacket",
    price: "₹3,999",
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 202,
    title: "Smart Smartwatch Gen 2",
    price: "₹8,999",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 203,
    title: "Designer Sunglasses",
    price: "₹2,499",
    category: "Eyewear",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 204,
    title: "Silk Scarf",
    price: "₹1,250",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function NewArrivals({ addToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* New Arrivals Banner */}
      <div className="bg-black text-white p-12 rounded-2xl mb-12 flex flex-col items-start justify-center">
        <span className="text-orange-500 font-bold tracking-widest uppercase mb-2">Just Dropped</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          The 2026 Collection
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Be the first to wear the season's hottest trends. Exclusive designs available now.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {newProducts.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            category={product.category}
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}