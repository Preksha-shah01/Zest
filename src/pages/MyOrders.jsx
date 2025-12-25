import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyOrders({ orders = [] }) {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Package className="w-20 h-20 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-2">No orders yet</h1>
        <p className="text-gray-500 mb-8">Start shopping to see your order history here.</p>
        <Button onClick={() => navigate("/shop")} className="bg-black text-white px-8">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Placed</p>
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-medium">#{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold">₹{order.total.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                <Clock className="w-3 h-3" /> {order.status}
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover bg-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">
                        {item.size && `Size: ${item.size} • `} {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}