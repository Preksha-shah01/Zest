import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Tag } from "lucide-react"; // Imported Tag icon
import { useAuth } from "@/context/AuthContext"; 
import { toast } from "react-hot-toast"; 

export default function Checkout({ cartItems, clearCart, addOrder }) {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // --- COUPON STATE ---
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Calculate Subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    if (!item?.price) return sum;
    const price = parseFloat(item.price.replace("₹", "").replace(",", ""));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  // Calculate Final Total
  const finalTotal = subtotal - discount;

  // --- COUPON LOGIC ---
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "ZEST2026") {
      const discountAmount = subtotal * 0.10; // 10% off
      setDiscount(Math.floor(discountAmount));
      toast.success("Coupon Applied! You saved 10%", { icon: '🎉' });
    } else {
      setDiscount(0);
      toast.error("Invalid Coupon Code");
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Log in to place order");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = {
        id: Math.floor(100000 + Math.random() * 900000), 
        date: new Date().toLocaleDateString(),
        status: "Processing",
        total: finalTotal, // Save the discounted total
        items: cartItems,
        address: "123 Fashion Street, Mumbai" 
      };

      addOrder(newOrder);

      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    toast.error("Log in to place order", { icon: '🔒' });
    navigate("/login");
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-8">Thank you for shopping with Zest.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/my-orders")} variant="outline">
            View My Orders
          </Button>
          <Button onClick={() => navigate("/")} className="bg-black text-white">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate("/shop")} className="bg-orange-600 text-white">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Shipping Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">First Name</label><Input required defaultValue={user ? user.name.split(" ")[0] : ""} /></div>
                  <div><label className="block text-sm font-medium mb-1">Last Name</label><Input required placeholder="Doe" /></div>
                </div>
                <div><label className="block text-sm font-medium mb-1">Address</label><Input required placeholder="123 Fashion Street" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium mb-1">City</label><Input required placeholder="Mumbai" /></div>
                  <div><label className="block text-sm font-medium mb-1">Zip Code</label><Input required placeholder="400001" /></div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
            <CardContent>
              <div className="border p-4 rounded-lg flex items-center gap-3 bg-gray-50 border-orange-200">
                <div className="w-4 h-4 rounded-full bg-orange-600"></div>
                <span className="font-medium">Cash on Delivery (COD)</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[150px]">{item.title}</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              ))}
              
              <Separator />

              {/* COUPON INPUT */}
              <div className="flex gap-2">
                <Input 
                  placeholder="Promo Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button type="button" onClick={applyCoupon} variant="outline" className="cursor-pointer">
                  Apply
                </Button>
              </div>

              {/* Price Calculation */}
              <div className="space-y-1">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Discount</span>
                    <span>- ₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {user ? (
                <Button type="submit" form="checkout-form" className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg mt-4 cursor-pointer" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              ) : (
                <Button type="button" onClick={handleLoginRedirect} className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-lg mt-4 cursor-pointer">
                    Log in to Place Order
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}