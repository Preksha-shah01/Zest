import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistSidebar({ wishlistItems = [], removeFromWishlist, addToCart }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer group">
          <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition" />
          {wishlistItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistItems.length}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-[400px] flex flex-col bg-white pt-10 px-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Your Wishlist ({wishlistItems.length})</SheetTitle>
        </SheetHeader>
        
        <Separator className="my-4" />

        <ScrollArea className="flex-1 pr-4">
          {wishlistItems.length === 0 ? (
            <div className="text-center mt-10">
              <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 mb-2">{item.price}</p>
                    
                    {/* UPDATED BUTTON LOGIC HERE */}
                    <Button 
                      size="sm" 
                      className="h-8 text-xs bg-black text-white hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        addToCart(item);            // 1. Add to Cart
                        removeFromWishlist(item.id); // 2. Remove from Wishlist
                      }}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" /> Move to Cart
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}