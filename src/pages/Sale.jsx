import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/data/products";

// Filter only items with price less than 2000 (Example logic for Sale)
const saleProducts = allProducts.filter(p => parseInt(p.price.replace(/\D/g, '')) < 2000);

export default function Sale({ addToCart, toggleWishlist, wishlistItems = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-red-50 p-12 rounded-2xl mb-12 text-center border border-red-100">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Flat 50% OFF</h1>
        <p className="text-gray-600 text-lg">Grab your favorites before they are gone!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {saleProducts.map((product) => {
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