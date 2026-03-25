import { Loader2, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

export default function LiveCookSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    location: "",
    date: "",
    time: "",
    payment: "cod" as "cod" | "gpay",
  });
  const [locating, setLocating] = useState(false);

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
          setForm((f) => ({
            ...f,
            location:
              data.display_name ??
              `${pos.coords.latitude},${pos.coords.longitude}`,
          }));
        } catch {
          setForm((f) => ({
            ...f,
            location: `${pos.coords.latitude},${pos.coords.longitude}`,
          }));
        }
        setLocating(false);
      },
      () => setLocating(false),
    );
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*BOOK YOUR COOK - The Grand Leaf*

👤 Name: ${form.name}
📱 Mobile: ${form.mobile}
🏠 Address: ${form.address}
📍 Location: ${form.location}
🗓️ Date: ${form.date}
⏰ Time: ${form.time}
💳 Payment: ${form.payment === "gpay" ? "GPay" : "Cash on Delivery"}

Please confirm my live cook booking.`;
    window.open(
      `https://wa.me/917402229777?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section id="live-cook" className="royal-section-dark py-20 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-3xl md:text-4xl text-gold">
            Book Your Cook
          </h2>
          <p className="font-poppins text-cream/70 mt-2 text-sm">
            Want a live cooking experience at your home? Book our chef!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            src="/assets/generated/home-cooking.dim_800x600.jpg"
            alt="Live cooking"
            className="w-full h-80 object-cover rounded-2xl border border-gold/20"
            loading="lazy"
          />

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            onSubmit={handleBook}
            className="space-y-4"
            data-ocid="live-cook.dialog"
          >
            <div>
              <label
                htmlFor="lc-name"
                className="font-cinzel text-xs uppercase tracking-wider text-gold block mb-1"
              >
                Your Name
              </label>
              <input
                id="lc-name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                data-ocid="live-cook.name.input"
                placeholder="Enter your name"
                required
                className="w-full bg-royal-green-light/30 border border-gold/30 rounded-lg px-3 py-2 text-cream placeholder-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label
                htmlFor="lc-mobile"
                className="font-cinzel text-xs uppercase tracking-wider text-gold block mb-1"
              >
                Mobile Number
              </label>
              <input
                id="lc-mobile"
                type="tel"
                value={form.mobile}
                onChange={(e) =>
                  setForm((f) => ({ ...f, mobile: e.target.value }))
                }
                data-ocid="live-cook.mobile.input"
                placeholder="10-digit number"
                required
                className="w-full bg-royal-green-light/30 border border-gold/30 rounded-lg px-3 py-2 text-cream placeholder-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label
                htmlFor="lc-address"
                className="font-cinzel text-xs uppercase tracking-wider text-gold block mb-1"
              >
                Address
              </label>
              <input
                id="lc-address"
                type="text"
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                data-ocid="live-cook.address.input"
                placeholder="Full address"
                required
                className="w-full bg-royal-green-light/30 border border-gold/30 rounded-lg px-3 py-2 text-cream placeholder-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label
                htmlFor="lc-location"
                className="font-cinzel text-xs uppercase tracking-wider text-gold block mb-1"
              >
                Location
              </label>
              <div className="flex gap-2">
                <input
                  id="lc-location"
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  data-ocid="live-cook.location.input"
                  placeholder="Auto-detect or type location"
                  className="flex-1 bg-royal-green-light/30 border border-gold/30 rounded-lg px-3 py-2 text-cream placeholder-cream/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <button
                  type="button"
                  onClick={getLocation}
                  data-ocid="live-cook.location.button"
                  className="btn-gold px-3 py-2 flex items-center gap-1 text-xs"
                >
                  {locating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  GPS
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lc-date"
                  className="font-cinzel text-xs uppercase tracking-wider text-gold block mb-1"
                >
                  Date
                </label>
                <input
                  id="lc-date"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-ocid="live-cook.date.input"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-royal-green-light/30 border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label
                  htmlFor="lc-time"
                  className="font-cinzel text-xs uppercase tracking-wider text-gold block mb-1"
                >
                  Time
                </label>
                <input
                  id="lc-time"
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, time: e.target.value }))
                  }
                  data-ocid="live-cook.time.input"
                  required
                  className="w-full bg-royal-green-light/30 border border-gold/30 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>

            <div>
              <p className="font-cinzel text-xs uppercase tracking-wider text-gold mb-2">
                Payment Method
              </p>
              <div className="flex gap-4">
                {(["cod", "gpay"] as const).map((method) => (
                  <label
                    key={method}
                    htmlFor={`lc-payment-${method}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      id={`lc-payment-${method}`}
                      type="radio"
                      value={method}
                      checked={form.payment === method}
                      onChange={() =>
                        setForm((f) => ({ ...f, payment: method }))
                      }
                      className="accent-gold"
                    />
                    <span className="font-poppins text-cream text-sm">
                      {method === "gpay" ? "GPay" : "Cash on Delivery"}
                    </span>
                  </label>
                ))}
              </div>
              {form.payment === "gpay" && (
                <div className="mt-3 p-3 bg-royal-green-light/30 border border-gold/30 rounded-lg">
                  <p className="font-poppins text-cream/80 text-xs mb-2">
                    Pay via GPay:{" "}
                    <span className="text-gold font-semibold">7402229777</span>
                  </p>
                  <p className="font-poppins text-cream/70 text-xs">
                    UPI ID: 7402229777@okbizaxis
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              data-ocid="live-cook.submit.button"
              className="w-full btn-gold py-3"
            >
              Book Your Cook on WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
