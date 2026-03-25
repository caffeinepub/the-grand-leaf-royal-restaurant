import { ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { menuItems } from "../data/menuData";

export default function TodaySpecial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { addToCart } = useCart();

  const dayIndex = new Date().getDay();
  const specials = menuItems.filter((m) => m.isSpecial);
  const todayItem = specials[dayIndex % specials.length] ?? menuItems[2];

  const handleAddToCart = () => {
    addToCart({
      id: todayItem.id,
      name: todayItem.name,
      nameTamil: todayItem.nameTamil,
      price: todayItem.price,
      image: todayItem.image,
      category: todayItem.category,
    });
    toast.success(`${todayItem.name} added to cart!`);
  };

  return (
    <section className="royal-section-dark py-16 px-4" id="today-special">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-gold text-xs font-cinzel uppercase tracking-widest border border-gold/40 px-4 py-1 rounded-full">
            Daily Rotating
          </span>
          <h2 className="section-heading text-3xl md:text-4xl text-gold mt-4">
            Today's Special
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-8 bg-royal-green-light/30 border border-gold/20 rounded-2xl overflow-hidden"
        >
          <div className="relative md:w-1/2">
            <img
              src={todayItem.image}
              alt={todayItem.name}
              className="w-full h-72 object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-gold text-royal-green font-cinzel font-bold px-3 py-1 rounded-full text-sm">
              ★ Today's Pick
            </div>
          </div>
          <div className="flex-1 p-8 text-center md:text-left">
            <div className="flex gap-1 mb-3 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <h3 className="font-cinzel font-bold text-gold text-2xl mb-1">
              {todayItem.name}
            </h3>
            <p className="font-playfair text-cream/70 italic mb-3">
              {todayItem.nameTamil}
            </p>
            <p className="font-poppins text-cream/80 text-sm mb-6">
              {todayItem.description}
            </p>
            <div className="flex items-center gap-6 justify-center md:justify-start">
              <span className="font-cinzel font-bold text-gold text-3xl">
                ₹{todayItem.price}
              </span>
              <button
                type="button"
                onClick={handleAddToCart}
                data-ocid="today.add_cart.button"
                className="btn-gold flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
