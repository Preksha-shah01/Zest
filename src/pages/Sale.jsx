import ProductCard from "@/components/product/ProductCard";

// Mock Data: Only items on Sale
const saleProducts = [
  {
    id: 101,
    title: "Summer Floral Dress",
    price: "₹1,499", // Discounted Price
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 102,
    title: "Vintage Denim Jacket",
    price: "₹1,999",
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 103,
    title: "Canvas Sneakers",
    price: "₹1,299",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 104,
    title: "Basic White Tee",
    price: "₹499",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop"
  }
];

export default function Sale({ addToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Sale Banner */}
      <div className="bg-red-50 p-12 rounded-2xl mb-12 text-center border border-red-100">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
          Flat 50% OFF
        </h1>
        <p className="text-gray-600 text-lg">
          Grab your favorites before they are gone. Limited time offer!
        </p>
      </div>

      {/* Sale Grid */}
      <h2 className="text-2xl font-bold mb-6">Clearance Deals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {saleProducts.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id} // Important for clicking details
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