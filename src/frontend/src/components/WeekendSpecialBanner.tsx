import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { weekendSpecials } from "../data/menuData";

function getCountdownToFriday(): {
  days: number;
  hours: number;
  mins: number;
  secs: number;
} {
  const now = new Date();
  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  const fridayMidnight = new Date(now);
  fridayMidnight.setDate(now.getDate() + daysUntilFriday);
  fridayMidnight.setHours(0, 0, 0, 0);
  const diff = fridayMidnight.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, mins, secs };
}

export default function WeekendSpecialBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(getCountdownToFriday());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % weekendSpecials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdownToFriday()), 1000);
    return () => clearInterval(timer);
  }, []);

  const current = weekendSpecials[currentIndex];

  const handleAddToCart = () => {
    addToCart({
      id: current.id,
      name: current.name,
      nameTamil: current.nameTamil,
      price: current.price,
      image: current.image,
      category: current.category,
    });
    toast.success(`${current.name} added to cart!`);
  };

  return (
    <section className="royal-section-light py-16 px-4" id="weekend-special">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green">
            Weekend Special
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm">
            New weekend offers every Friday!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[
            { label: "Days", value: countdown.days },
            { label: "Hours", value: countdown.hours },
            { label: "Mins", value: countdown.mins },
            { label: "Secs", value: countdown.secs },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-royal-green text-center px-4 py-3 rounded-xl min-w-[64px]"
            >
              <div className="font-cinzel font-bold text-gold text-2xl">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="font-poppins text-cream/70 text-xs uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="relative bg-white rounded-2xl shadow-royal overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row"
            >
              <img
                src={current.image}
                alt={current.name}
                className="w-full md:w-1/2 h-64 object-cover"
                loading="lazy"
              />
              <div className="flex-1 p-8 flex flex-col justify-center">
                <span className="text-xs font-cinzel uppercase tracking-widest text-gold border border-gold/40 px-3 py-1 rounded-full w-fit mb-3">
                  Weekend Pick
                </span>
                <h3 className="font-cinzel font-bold text-royal-green text-2xl mb-1">
                  {current.name}
                </h3>
                <p className="font-playfair italic text-muted-foreground mb-3">
                  {current.nameTamil}
                </p>
                <p className="font-poppins text-sm text-muted-foreground mb-6">
                  {current.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-cinzel font-bold text-royal-green text-2xl">
                    ₹{current.price}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    data-ocid="weekend.add_cart.button"
                    className="btn-gold flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            aria-label="Previous"
            onClick={() =>
              setCurrentIndex(
                (i) =>
                  (i - 1 + weekendSpecials.length) % weekendSpecials.length,
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-royal-green/80 hover:bg-royal-green text-gold p-2 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() =>
              setCurrentIndex((i) => (i + 1) % weekendSpecials.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-royal-green/80 hover:bg-royal-green text-gold p-2 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {weekendSpecials.map((item, i) => (
              <button
                type="button"
                key={item.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-gold w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
