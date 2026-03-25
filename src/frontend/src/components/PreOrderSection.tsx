import { Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { comboItems, menuItems } from "../data/menuData";

export default function PreOrderSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const allItems = [...menuItems, ...comboItems];
  const [selectedItem, setSelectedItem] = useState(allItems[2].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [qty, setQty] = useState(1);

  const handlePreOrder = () => {
    const item = allItems.find((i) => i.id === selectedItem);
    if (!item || !date || !time) {
      alert("Please select item, date and time");
      return;
    }
    const msg = `*PRE-ORDER - The Grand Leaf*

🗓️ Date: ${date}
⏰ Time: ${time}
🍽️ Item: ${item.name} (${item.nameTamil})
🔢 Qty: ${qty}
💰 Amount: ₹${item.price * qty}

Please confirm my pre-order.`;
    window.open(
      `https://wa.me/917402229777?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section id="preorder" className="royal-section-light py-16 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green">
            Pre-Order Your Meal
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm">
            Book your royal feast in advance and we'll have it ready for you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <img
            src="/assets/generated/preorder-special.dim_800x600.jpg"
            alt="Pre-order special"
            className="w-full h-64 object-cover rounded-2xl"
            loading="lazy"
          />

          <div className="bg-white rounded-2xl p-8 shadow-xs">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="po-dish"
                  className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                >
                  Select Dish
                </label>
                <select
                  id="po-dish"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  data-ocid="preorder.select"
                  className="w-full border border-border rounded-lg px-3 py-2 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {allItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - ₹{item.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="po-date"
                    className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="po-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      data-ocid="preorder.date.input"
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full border border-border rounded-lg pl-9 pr-3 py-2 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="po-time"
                    className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="po-time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      data-ocid="preorder.time.input"
                      min="09:00"
                      max="22:30"
                      className="w-full border border-border rounded-lg pl-9 pr-3 py-2 font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1">
                  Quantity
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 bg-royal-green text-gold rounded-full font-bold"
                  >
                    -
                  </button>
                  <span className="font-cinzel font-bold text-royal-green text-lg w-8 text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-8 h-8 bg-royal-green text-gold rounded-full font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePreOrder}
                data-ocid="preorder.submit.button"
                className="w-full btn-gold py-3 flex items-center justify-center gap-2"
              >
                Pre-Order on WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
