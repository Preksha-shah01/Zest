import Hero from "@/components/layout/Hero";
import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/data/products";

export default function Home({ addToCart, toggleWishlist, wishlistItems = [] }) {
  // Logic: Show the first 8 products as "Featured"
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => {
            // Check if this product is in the wishlist
            const isInWishlist = wishlistItems.some(item => item.id === product.id);
            
            return (
              <ProductCard 
                key={product.id}
                {...product} // Passes id, title, price, image, etc.
                addToCart={() => addToCart(product)}
                toggleWishlist={toggleWishlist} 
                isInWishlist={isInWishlist}    
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}