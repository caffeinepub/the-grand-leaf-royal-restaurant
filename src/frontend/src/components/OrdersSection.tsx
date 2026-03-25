import { Package } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { useCart } from "../contexts/CartContext";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  delivered: "bg-green-100 text-green-800",
};

export default function OrdersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { orders } = useCart();

  return (
    <section id="orders" className="royal-section-light py-16 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green">
            My Orders
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm">
            Track your order history
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <div className="text-center py-16" data-ocid="orders.empty_state">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="font-cinzel text-royal-green text-lg">
              No orders yet
            </p>
            <p className="font-poppins text-muted-foreground text-sm mt-2">
              Your order history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-xs"
                data-ocid={`orders.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-cinzel font-bold text-royal-green">
                      Order #{order.id.slice(-6)}
                    </p>
                    <p className="font-poppins text-xs text-muted-foreground">
                      {order.createdAt}
                    </p>
                  </div>
                  <span
                    className={`font-poppins text-xs px-3 py-1 rounded-full font-semibold ${statusColors[order.status]}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="font-poppins text-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-poppins text-muted-foreground">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <div>
                    <p className="font-poppins text-xs text-muted-foreground">
                      {order.paymentMethod === "gpay"
                        ? "GPay"
                        : "Cash on Delivery"}
                    </p>
                    <p className="font-poppins text-xs text-muted-foreground">
                      {order.customerName}
                    </p>
                  </div>
                  <p className="font-cinzel font-bold text-royal-green">
                    Total: ₹{order.total}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
