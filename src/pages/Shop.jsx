import { useState } from "react"; 
import { useSearchParams } from "react-router-dom"; 
import ProductCard from "@/components/product/ProductCard";
import { allProducts } from "@/data/products"; 

export default function Shop({ addToCart, toggleWishlist, wishlistItems = [] }) {
  const [activeGender, setActiveGender] = useState("Men");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default"); // 1. NEW STATE
  
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q"); 

  const categories = activeGender === "Men"
    ? ["All", "Tops", "Bottoms", "Jackets", "Accessories", "Footwear"]
    : ["All", "Tops", "Bottoms", "Dresses", "Jackets", "Accessories", "Footwear"];

  // Helper function to parse price string to number
  const getPrice = (priceStr) => {
    return parseFloat(priceStr.replace("₹", "").replace(",", ""));
  };

  // Filter First
  let filteredProducts = allProducts.filter(product => {
    if (searchQuery) {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return (
      product.gender === activeGender && 
      (activeCategory === "All" || product.category === activeCategory)
    );
  });

  // 2. SORT LOGIC
  if (sortOption === "low") {
    filteredProducts.sort((a, b) => getPrice(a.price) - getPrice(b.price));
  } else if (sortOption === "high") {
    filteredProducts.sort((a, b) => getPrice(b.price) - getPrice(a.price));
  } else if (sortOption === "newest") {
    // Assuming higher IDs are newer
    filteredProducts.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {searchQuery ? `Results for "${searchQuery}"` : "Shop All Products"}
      </h1>
      
      {!searchQuery && (
        <>
          {/* Gender Toggles */}
          <div className="flex justify-center mb-8 border-b border-gray-200">
            <button onClick={() => { setActiveGender("Men"); setActiveCategory("All"); }} className={`px-8 py-4 text-lg font-medium transition-all duration-300 border-b-2 ${activeGender === "Men" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>Men</button>
            <button onClick={() => { setActiveGender("Women"); setActiveCategory("All"); }} className={`px-8 py-4 text-lg font-medium transition-all duration-300 border-b-2 ${activeGender === "Women" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>Women</button>
          </div>

          {/* Filters & Sorting Container */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category ? "bg-black text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {category}
                </button>
              ))}
            </div>

            {/* 3. SORT DROPDOWN */}
            <select 
              className="border p-2 rounded-md bg-white text-sm font-medium focus:ring-2 focus:ring-black outline-none cursor-pointer"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Sort by: Recommended</option>
              <option value="newest">Newest Arrivals</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => {
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