import { Award, Heart, Leaf } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="royal-section-dark py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-gold">
            Our Story
          </h2>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-4" />
        </motion.div>

        {/* Story - full width */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <img
            src="/assets/generated/home-cooking.dim_800x600.jpg"
            alt="Home cooking"
            className="w-full h-72 object-cover rounded-2xl mb-8 border border-gold/20"
            loading="lazy"
          />
          <p className="font-poppins text-cream/80 text-base leading-relaxed">
            The Grand Leaf was born from a simple belief: the best food is made
            with love, fresh local ingredients, and time-honored recipes.
            Nestled in the serene Kolli Hills, we bring you authentic homemade
            South Indian cuisine that warms both the body and soul.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Leaf,
              title: "Fresh & Natural",
              desc: "All ingredients sourced directly from Kolli Hills farms",
            },
            {
              icon: Heart,
              title: "Made with Love",
              desc: "Every dish prepared with family recipes and heart",
            },
            {
              icon: Award,
              title: "Royal Quality",
              desc: "Premium ingredients, royal taste, humble price",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-6 border border-gold/20 rounded-2xl"
            >
              <Icon className="w-8 h-8 text-gold mx-auto mb-4" />
              <h4 className="font-cinzel font-semibold text-gold mb-2">
                {title}
              </h4>
              <p className="font-poppins text-cream/70 text-sm">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
