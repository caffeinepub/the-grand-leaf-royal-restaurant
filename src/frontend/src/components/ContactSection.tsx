import { Clock, CreditCard, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="royal-section-dark py-16 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-gold">
            Contact Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-wider">
                  Phone
                </p>
                <a
                  href="tel:7200185050"
                  className="font-poppins text-cream/80 hover:text-gold block"
                >
                  72001 85050
                </a>
                <a
                  href="tel:7402229777"
                  className="font-poppins text-cream/80 hover:text-gold block"
                >
                  74022 29777
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-wider">
                  Address
                </p>
                <p className="font-poppins text-cream/80 text-sm">
                  Dinesh Chandran House,
                  <br />
                  Oorkalingam, Kolli Hills,
                  <br />
                  Tamil Nadu
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-wider">
                  Order Hours
                </p>
                <p className="font-poppins text-cream/80 text-sm">
                  9:00 AM – 10:30 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="w-5 h-5 text-gold mt-1 shrink-0" />
              <div>
                <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-wider">
                  Payment Methods
                </p>
                <div className="space-y-2 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.open(
                        "upi://pay?pa=7402229777@okbizaxis&pn=Dinesh%20Chandran&am=&cu=INR",
                        "_blank",
                      );
                    }}
                    data-ocid="contact.gpay.button"
                    className="flex items-center gap-2 bg-royal-green-light/30 border border-gold/30 px-4 py-2 rounded-lg hover:border-gold transition-colors"
                  >
                    <span className="text-gold font-cinzel text-sm font-bold">
                      G
                    </span>
                    <span className="font-poppins text-cream/80 text-sm">
                      GPay: 7402229777
                    </span>
                  </button>
                  <a
                    href={`https://wa.me/917200185050?text=${encodeURIComponent("Hi, I'd like to place a Cash on Delivery order.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.cod.button"
                    className="flex items-center gap-2 bg-royal-green-light/30 border border-gold/30 px-4 py-2 rounded-lg hover:border-gold transition-colors"
                  >
                    <span className="font-poppins text-cream/80 text-sm">
                      💵 Cash on Delivery
                    </span>
                  </a>
                  <div className="text-xs font-poppins text-cream/50">
                    UPI ID: 7402229777@okbizaxis
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/grandleafresturantkolli.26"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.instagram.button"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-poppins hover:opacity-90"
              >
                <SiInstagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://www.facebook.com/GrandLeaf"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.facebook.button"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-poppins hover:opacity-90"
              >
                <SiFacebook className="w-4 h-4" />
                Facebook
              </a>
            </div>

            <a
              href="https://wa.me/917402229777?text=Hello%2C%20I'd%20like%20to%20order%20from%20The%20Grand%20Leaf"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.whatsapp.button"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-400 text-white font-cinzel font-semibold text-base px-6 py-4 rounded-2xl transition-colors shadow-lg"
            >
              <SiWhatsapp className="w-6 h-6" />
              Order on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="rounded-2xl overflow-hidden border border-gold/20 h-96"
          >
            <iframe
              src="https://maps.google.com/maps?q=Kolli+Hills+Tamil+Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Kolli Hills Map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
