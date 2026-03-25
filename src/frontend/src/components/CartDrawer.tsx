import { Loader2, MapPin, Minus, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { type Order, useCart } from "../contexts/CartContext";

export default function CartDrawer() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    cgst,
    sgst,
    total,
    isCartOpen,
    setIsCartOpen,
    addOrder,
    setLastOrder,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPincode, setCustomerPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "gpay">("cod");
  const [locating, setLocating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
          );
          const data = await res.json();
          setCustomerAddress(
            data.display_name ??
              `${pos.coords.latitude},${pos.coords.longitude}`,
          );
        } catch {
          setCustomerAddress(`${pos.coords.latitude},${pos.coords.longitude}`);
        }
        setLocating(false);
      },
      () => setLocating(false),
    );
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const orderId = `GL${Date.now()}`;
    const order: Order = {
      id: orderId,
      items: [...items],
      subtotal,
      cgst,
      sgst,
      total,
      customerName,
      customerPhone,
      customerAddress,
      customerPincode,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toLocaleString("en-IN"),
    };

    const itemsList = items
      .map(
        (item) =>
          `  • ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`,
      )
      .join("\n");

    const msg = `*👑 THE GRAND LEAF - New Order*
*Order ID: #${orderId.slice(-6)}*

*Items:*
${itemsList}

*Bill Summary:*
  Subtotal: ₹${subtotal}
  CGST (2.5%): ₹${cgst}
  SGST (2.5%): ₹${sgst}
  *Grand Total: ₹${total}*

*Customer Details:*
  Name: ${customerName}
  Phone: ${customerPhone}
  Address: ${customerAddress}${customerPincode ? `, ${customerPincode}` : ""}

*Payment: ${paymentMethod === "gpay" ? "GPay - 7402229777@okbizaxis" : "Cash on Delivery"}*
*Time: ${new Date().toLocaleString("en-IN")}*

_Please confirm this order. Thank you! 🙏_`;

    const whatsappNum =
      paymentMethod === "cod" ? "917200185050" : "917402229777";

    if (paymentMethod === "gpay") {
      const upiLink = `upi://pay?pa=7402229777@okbizaxis&pn=Dinesh%20Chandran&am=${total}&cu=INR&tn=GrandLeaf+Order+${orderId.slice(-6)}`;
      window.open(upiLink, "_blank");
    }

    window.open(
      `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );

    addOrder(order);
    setLastOrder(order);
    clearCart();
    setIsCartOpen(false);
    setShowConfirm(true);
    toast.success("Order placed successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 no-print"
            onClick={() => setIsCartOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsCartOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close cart"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-background shadow-2xl z-50 flex flex-col no-print"
            data-ocid="cart.sheet"
          >
            <div className="flex items-center justify-between p-6 border-b bg-royal-green">
              <h2 className="font-cinzel font-bold text-gold text-xl">
                🛒 Your Cart
              </h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                data-ocid="cart.close.button"
                className="text-cream/80 hover:text-gold p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div
                className="flex-1 flex flex-col items-center justify-center gap-4"
                data-ocid="cart.empty_state"
              >
                <p className="font-cinzel text-lg text-muted-foreground">
                  Your cart is empty
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-gold"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleOrder}
                className="flex-1 flex flex-col overflow-hidden"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-muted/30 rounded-xl p-3"
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-cinzel text-sm font-semibold text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="font-poppins text-xs text-muted-foreground">
                          ₹{item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-cinzel font-bold text-sm w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-cinzel font-bold text-sm w-16 text-right">
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="bg-royal-green/5 border border-royal-green/20 rounded-xl p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between font-poppins">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between font-poppins">
                        <span className="text-muted-foreground">
                          CGST (2.5%)
                        </span>
                        <span>₹{cgst}</span>
                      </div>
                      <div className="flex justify-between font-poppins">
                        <span className="text-muted-foreground">
                          SGST (2.5%)
                        </span>
                        <span>₹{sgst}</span>
                      </div>
                      <div className="flex justify-between font-cinzel font-bold border-t pt-2">
                        <span>Grand Total</span>
                        <span className="text-royal-green text-lg">
                          ₹{total}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-cinzel text-sm font-bold text-royal-green uppercase tracking-wider">
                      Delivery Details
                    </h3>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      data-ocid="cart.name.input"
                      required
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <input
                      type="tel"
                      placeholder="Contact Number *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      data-ocid="cart.phone.input"
                      required
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                    <div className="relative">
                      <textarea
                        placeholder="Delivery Address *"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        data-ocid="cart.address.textarea"
                        required
                        rows={2}
                        className="w-full border border-border rounded-lg px-3 py-2 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                      />
                      <button
                        type="button"
                        onClick={getLocation}
                        data-ocid="cart.location.button"
                        className="absolute right-2 top-2 btn-gold text-xs px-2 py-1 flex items-center gap-1"
                      >
                        {locating ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <MapPin className="w-3 h-3" />
                        )}
                        GPS
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={customerPincode}
                      onChange={(e) => setCustomerPincode(e.target.value)}
                      data-ocid="cart.pincode.input"
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-royal-green uppercase tracking-wider mb-3">
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {(["cod", "gpay"] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          data-ocid={`cart.${method}.button`}
                          className={`border-2 rounded-xl p-3 text-sm font-cinzel transition-all ${
                            paymentMethod === method
                              ? "border-gold bg-gold/10 text-royal-green"
                              : "border-border text-muted-foreground hover:border-gold/50"
                          }`}
                        >
                          {method === "gpay"
                            ? "💳 GPay"
                            : "💵 Cash on Delivery"}
                        </button>
                      ))}
                    </div>

                    {paymentMethod === "gpay" && (
                      <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="font-poppins text-sm font-semibold text-green-800">
                          GPay: 7402229777
                        </p>
                        <p className="font-poppins text-xs text-green-700">
                          UPI: 7402229777@okbizaxis
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const upiLink = `upi://pay?pa=7402229777@okbizaxis&pn=Dinesh%20Chandran&am=${total}&cu=INR`;
                            window.open(upiLink, "_blank");
                          }}
                          data-ocid="cart.gpay.button"
                          className="mt-2 w-full bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Pay ₹{total} on GPay
                        </button>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="font-poppins text-xs text-yellow-800">
                          💵 Pay ₹{total} in cash when your order arrives.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t space-y-3">
                  <button
                    type="submit"
                    data-ocid="cart.submit.button"
                    className="w-full btn-gold py-4 text-base"
                  >
                    Place Order ₹{total}
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="flex-1 btn-ghost-gold py-2 text-xs"
                    >
                      Download Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        clearCart();
                        setIsCartOpen(false);
                      }}
                      data-ocid="cart.delete_button"
                      className="flex-1 border border-destructive text-destructive rounded py-2 text-xs hover:bg-destructive/10 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 no-print"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowConfirm(false)}
              onKeyDown={(e) => e.key === "Escape" && setShowConfirm(false)}
              role="button"
              tabIndex={-1}
              aria-label="Close confirmation"
            />
            <div
              className="relative bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              data-ocid="cart.dialog"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-cinzel font-bold text-royal-green text-2xl mb-2">
                Order Placed!
              </h3>
              <p className="font-poppins text-muted-foreground text-sm mb-6">
                Your order has been sent to WhatsApp. We'll confirm shortly!
              </p>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                data-ocid="cart.confirm.button"
                className="btn-gold"
              >
                Great!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
