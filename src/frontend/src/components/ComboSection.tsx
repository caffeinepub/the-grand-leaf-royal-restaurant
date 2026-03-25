import { Crown, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { comboItems } from "../data/menuData";

export default function ComboSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { addToCart } = useCart();

  return (
    <section id="combos" className="royal-section-dark py-16 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <Crown className="w-8 h-8 text-gold mx-auto mb-3" />
          <h2 className="section-heading text-3xl md:text-4xl text-gold">
            Combo Offers
          </h2>
          <p className="font-poppins text-cream/70 mt-2 text-sm">
            Best value meal deals for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comboItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-royal-green-light/20 border border-gold/30 rounded-2xl overflow-hidden card-hover"
              data-ocid={`combo.item.${i + 1}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-cinzel font-bold text-gold text-lg">
                      {item.name}
                    </h3>
                    <p className="font-playfair italic text-cream/60 text-sm">
                      {item.nameTamil}
                    </p>
                  </div>
                  <span className="font-cinzel font-bold text-gold text-xl">
                    ₹{item.price}
                  </span>
                </div>
                <p className="font-poppins text-cream/70 text-sm mb-5">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        nameTamil: item.nameTamil,
                        price: item.price,
                        image: item.image,
                        category: item.category,
                      });
                      toast.success(`${item.name} added to cart!`);
                    }}
                    data-ocid={`combo.add_cart.button.${i + 1}`}
                    className="flex-1 btn-gold text-xs py-2 flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Add to Cart
                  </button>
                  <a
                    href={`https://wa.me/917402229777?text=${encodeURIComponent(`Hi, I'd like to order: ${item.name} - ₹${item.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`combo.order.button.${i + 1}`}
                    className="flex-1 btn-ghost-gold text-xs py-2 text-center"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
