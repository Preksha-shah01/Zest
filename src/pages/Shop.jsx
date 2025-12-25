import { useState } from "react"; 
import { useSearchParams } from "react-router-dom"; 
import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/data/products"; 

// FIX 1: Ensure 'toggleWishlist' and 'wishlistItems' are received here
export default function Shop({ addToCart, toggleWishlist, wishlistItems = [] }) {
  const [activeGender, setActiveGender] = useState("Men");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q"); 

  const categories = activeGender === "Men"
    ? ["All", "Tops", "Bottoms", "Accessories", "Footwear"]
    : ["All", "Tops", "Bottoms", "Dresses", "Accessories", "Footwear"];

  const filteredProducts = allProducts.filter(product => {
    if (searchQuery) {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return (
      product.gender === activeGender && 
      (activeCategory === "All" || product.category === activeCategory)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {searchQuery ? `Results for "${searchQuery}"` : "Shop All Products"}
      </h1>
      
      {!searchQuery && (
        <>
          <div className="flex justify-center mb-8 border-b border-gray-200">
            <button onClick={() => { setActiveGender("Men"); setActiveCategory("All"); }} className={`px-8 py-4 text-lg font-medium transition-all duration-300 border-b-2 ${activeGender === "Men" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>Men</button>
            <button onClick={() => { setActiveGender("Women"); setActiveCategory("All"); }} className={`px-8 py-4 text-lg font-medium transition-all duration-300 border-b-2 ${activeGender === "Women" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>Women</button>
          </div>

          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveCategory(category)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category ? "bg-black text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {category}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
          // Check if this specific product is in the wishlist
          const isInWishlist = wishlistItems.some(item => item.id === product.id);

          return (
            <ProductCard 
              key={product.id} 
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
              addToCart={() => addToCart(product)}
              
              // FIX 2: Pass the function down to the Card
              toggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist}
            />
          );
        })}
      </div>
      
        {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500">No products found.</p>
          {searchQuery && (
            <button onClick={() => window.location.href = '/shop'} className="mt-4 text-orange-600 font-bold hover:underline">
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
}