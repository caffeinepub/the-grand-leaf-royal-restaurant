import { ChevronDown, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/generated/kolli-hills-scenery.dim_1200x600.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-royal-green/80" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-royal-green/95 via-royal-green/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gold/20 border border-gold/50 text-gold text-xs font-cinzel uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <Clock className="w-3 h-3" />
            Open: 9 AM – 10:30 PM
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel font-bold text-gold leading-tight mb-2"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            THE GRAND LEAF
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-playfair italic text-cream/90 text-xl md:text-2xl mb-4"
          >
            தி கிராண்ட் லீஃப்
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-poppins text-cream/80 text-base md:text-lg mb-8 max-w-lg"
          >
            The Taste of Royal Homemade Food, Kolli Hills
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              href="#menu"
              className="btn-gold text-center"
              data-ocid="hero.menu.button"
            >
              Explore Menu
            </a>
            <a
              href="https://wa.me/917402229777?text=Hello%2C%20I%20would%20like%20to%20order%20from%20The%20Grand%20Leaf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-gold text-center"
              data-ocid="hero.whatsapp.button"
            >
              Order on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {["Free Delivery under 5km", "45 Min Delivery", "Fresh Daily"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-poppins text-gold/80 border border-gold/30 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ),
            )}
          </motion.div>
        </div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden lg:flex flex-col items-center gap-4"
        >
          <img
            src="/assets/generated/grand-leaf-logo-transparent.dim_400x400.png"
            alt="The Grand Leaf"
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
}
