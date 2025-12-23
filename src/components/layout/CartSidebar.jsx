import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 

export default function CartSidebar({ cartItems = [], removeFromCart }) {
  // 1. Safety check to prevent crashes if data is missing
  const safeItems = cartItems || [];

  // 2. Calculate Total Price
  const total = safeItems.reduce((sum, item) => {
    if (!item?.price) return sum;
    // Remove "₹" and commas to convert string to number
    const price = parseFloat(item.price.replace("₹", "").replace(",", ""));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  return (
    <Sheet>
      {/* TRIGGER: The Cart Icon in Navbar */}
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-black" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {safeItems.length}
          </span>
        </div>
      </SheetTrigger>

      {/* CONTENT: The Slide-out Drawer */}
      {/* Added pt-10 px-6 for better spacing */}
      <SheetContent className="w-[400px] flex flex-col bg-white pt-10 px-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Your Cart ({safeItems.length})</SheetTitle>
        </SheetHeader>
        
        <Separator className="my-4" />

        {/* SCROLLABLE LIST OF ITEMS */}
        <ScrollArea className="flex-1 pr-4">
          {safeItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {safeItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  {/* Product Image */}
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.price}</p>
                  </div>
                  
                  {/* Remove Button */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => removeFromCart(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* FOOTER: Total & Checkout */}
        <div className="mt-4 space-y-4 pb-6">
          <Separator />
          
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          {/* CHECKOUT BUTTON */}
          {/* SheetClose ensures the drawer closes when you click Checkout */}
          <SheetClose asChild>
            <Link to="/checkout">
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                disabled={safeItems.length === 0} // Disable if empty
              >
                Checkout
              </Button>
            </Link>
          </SheetClose>
          
        </div>
      </SheetContent>
    </Sheet>
  );
}