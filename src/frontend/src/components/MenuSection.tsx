import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { menuItems } from "../data/menuData";

type Category = "all" | "meals" | "biryani" | "fry";

const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Meals", value: "meals" },
  { label: "Biryani", value: "biryani" },
  { label: "Fry & Specialties", value: "fry" },
];

export default function MenuSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((m) => m.category === activeCategory);

  return (
    <section id="menu" className="royal-section-light py-16 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-royal-green text-xs font-cinzel uppercase tracking-widest border border-royal-green/40 px-4 py-1 rounded-full">
            Kolli Hills Authentic
          </span>
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green mt-4">
            Our Royal Menu
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm max-w-md mx-auto">
            Homemade with love and the freshest ingredients from the hills
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              data-ocid={`menu.${cat.value}.tab`}
              className={`font-cinzel text-sm uppercase tracking-wider px-5 py-2 rounded-full transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-royal-green text-gold"
                  : "bg-cream-dark text-royal-green border border-royal-green/30 hover:bg-royal-green/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xs card-hover"
              data-ocid={`menu.item.${i + 1}`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                {item.isSpecial && (
                  <span className="absolute top-3 right-3 bg-gold text-royal-green text-xs font-cinzel font-bold px-2 py-1 rounded-full">
                    Special
                  </span>
                )}
                <div className="absolute bottom-3 right-3 bg-royal-green font-cinzel font-bold text-gold text-sm px-3 py-1 rounded-full">
                  ₹{item.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-cinzel font-semibold text-royal-green text-sm mb-1">
                  {item.name}
                </h3>
                <p className="font-playfair italic text-muted-foreground text-xs mb-2">
                  {item.nameTamil}
                </p>
                <p className="font-poppins text-muted-foreground text-xs mb-4 line-clamp-2">
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
                    data-ocid={`menu.add_cart.button.${i + 1}`}
                    className="flex-1 btn-gold text-xs py-2 flex items-center justify-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Add to Cart
                  </button>
                  <a
                    href={`https://wa.me/917402229777?text=${encodeURIComponent(`Hi, I'd like to order: ${item.name} (${item.nameTamil}) - ₹${item.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`menu.order.button.${i + 1}`}
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
