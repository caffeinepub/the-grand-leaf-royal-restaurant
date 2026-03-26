import { Menu, MessageCircle, Moon, ShoppingCart, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { useCart } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Our Story", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Live Cook", href: "#live-cook" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
  { label: "My Orders", href: "#orders" },
];

export default function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-royal-green shadow-royal backdrop-blur-sm"
          : "bg-royal-green"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/generated/grand-leaf-logo-transparent.dim_200x200.png"
              alt="The Grand Leaf Logo"
              className="h-12 w-12 object-contain rounded-full"
            />
            <div className="hidden sm:block">
              <div className="font-cinzel font-bold text-gold text-sm tracking-widest leading-tight">
                THE GRAND LEAF
              </div>
              <div className="font-poppins text-xs text-cream/70 tracking-wide">
                தி கிராண்ட் லீஃப்
              </div>
            </div>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
                  className="font-cinzel text-xs tracking-wider text-cream/80 hover:text-gold px-3 py-2 transition-colors duration-200 uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              data-ocid="nav.toggle"
              className="p-2 text-cream/80 hover:text-gold transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              data-ocid="nav.cart.button"
              className="relative p-2 text-cream/80 hover:text-gold transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-royal-green text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/917402229777"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.whatsapp.button"
              className="hidden sm:flex items-center gap-1 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold px-3 py-2 rounded transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Order
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.menu.button"
              className="lg:hidden p-2 text-cream/80 hover:text-gold transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-royal-green border-t border-gold/20 overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-cinzel text-sm uppercase tracking-wider text-cream/80 hover:text-gold py-2 px-3 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex gap-4 px-3">
                <a
                  href="https://www.instagram.com/grandleafresturantkolli.26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-gold"
                >
                  <SiInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/GrandLeaf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-gold"
                >
                  <SiFacebook className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/917402229777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-gold"
                >
                  <SiWhatsapp className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
