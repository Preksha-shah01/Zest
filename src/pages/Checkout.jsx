import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // 1. Import Auth
import { toast } from "react-hot-toast"; // 2. Import Toast

export default function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const { user } = useAuth(); // 3. Get current user
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate Total
  const total = cartItems.reduce((sum, item) => {
    if (!item?.price) return sum;
    const price = parseFloat(item.price.replace("₹", "").replace(",", ""));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  // Handle "Place Order" (Only fires if logged in)
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Extra safety check
    if (!user) {
      toast.error("Log in to place order");
      navigate("/login");
      return;
    }

    setIsProcessing(true);

    // Simulate a 2-second delay for "processing payment"
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      toast.success("Order placed successfully!");
    }, 2000);
  };

  // Handle "Login Check" (Fires if NOT logged in)
  const handleLoginRedirect = (e) => {
    e.preventDefault();
    toast.error("Log in to place order", {
        icon: '🔒',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
    });
    navigate("/login");
  };

  // Success View
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-8">Thank you for shopping with Zest. Your order #12345 is on its way.</p>
        <Button onClick={() => navigate("/")} className="bg-black text-white">
          Continue Shopping
        </Button>
      </div>
    );
  }

  // Empty Cart View
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
        
        {/* LEFT COLUMN: Shipping Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input required placeholder="John" defaultValue={user ? user.name.split(" ")[0] : ""} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input required placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input required placeholder="123 Fashion Street" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <Input required placeholder="Mumbai" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <Input required placeholder="400001" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                 <div className="border p-4 rounded-lg flex items-center gap-3 bg-gray-50 border-orange-200">
                    <div className="w-4 h-4 rounded-full bg-orange-600"></div>
                    <span className="font-medium">Cash on Delivery (COD)</span>
                 </div>
                 <div className="border p-4 rounded-lg flex items-center gap-3 opacity-50">
                    <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                    <span className="font-medium">Credit / Debit Card (Coming Soon)</span>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[150px]">{item.title}</span>
                  <span className="font-medium">{item.price}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {/* 4. SMART BUTTON LOGIC */}
              {user ? (
                // If Logged In: Normal Submit Button
                <Button 
                    type="submit" 
                    form="checkout-form"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg mt-4 cursor-pointer"
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              ) : (
                // If Logged Out: Redirect Button
                <Button 
                    type="button" 
                    onClick={handleLoginRedirect}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-lg mt-4 cursor-pointer"
                >
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