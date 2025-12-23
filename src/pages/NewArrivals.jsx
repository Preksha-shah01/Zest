import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/data/products";

// Example: Show specific new items (IDs 201-204)
const newProducts = allProducts.filter(p => [201, 202, 203, 204].includes(p.id));

export default function NewArrivals({ addToCart, toggleWishlist, wishlistItems = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-black text-white p-12 rounded-2xl mb-12 flex flex-col items-start justify-center">
        <span className="text-orange-500 font-bold tracking-widest uppercase mb-2">Just Dropped</span>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">The 2026 Collection</h1>
        <p className="text-gray-400 text-lg max-w-xl">Exclusive designs available now.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {newProducts.map((product) => {
          const isInWishlist = wishlistItems.some(item => item.id === product.id);
          return (
            <ProductCard 
              key={product.id}
              {...product}
              addToCart={() => addToCart(product)}
              toggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist}
            />
          );
        })}
      </div>
    </div>
  );
}