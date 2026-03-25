import { Crown, Shield, Star, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";

interface MembershipCard {
  name: string;
  phone: string;
  email: string;
  memberId: string;
  expiryDate: string;
  joinDate: string;
}

export default function MembershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [membership, setMembership] = useState<MembershipCard | null>(() => {
    try {
      const saved = localStorage.getItem("grandleaf_membership");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [payment, setPayment] = useState<"cod" | "gpay">("gpay");
  const [showForm, setShowForm] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const memberId = `GL${Date.now().toString().slice(-6)}`;
    const joinDate = new Date().toISOString().split("T")[0];
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    const expiryDate = expiry.toISOString().split("T")[0];

    if (payment === "gpay") {
      window.open(
        "upi://pay?pa=7402229777@okbizaxis&pn=Dinesh%20Chandran&am=499&cu=INR&tn=GrandLeaf+Membership",
        "_blank",
      );
    }

    const msg = `*MEMBERSHIP REGISTRATION - The Grand Leaf*

👑 Name: ${form.name}
📱 Phone: ${form.phone}
📧 Email: ${form.email}
🏷️ Member ID: ${memberId}
💰 Amount: ₹499
💳 Payment: ${payment === "gpay" ? "GPay" : "Cash on Delivery"}

Please activate my membership card.`;
    window.open(
      `https://wa.me/917402229777?text=${encodeURIComponent(msg)}`,
      "_blank",
    );

    const card: MembershipCard = { ...form, memberId, expiryDate, joinDate };
    setMembership(card);
    localStorage.setItem("grandleaf_membership", JSON.stringify(card));
    setShowForm(false);
  };

  return (
    <section id="membership" className="royal-section-light py-16 px-4">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <Crown className="w-10 h-10 text-gold mx-auto mb-3" />
          <h2 className="section-heading text-3xl md:text-4xl text-royal-green">
            Royal Membership
          </h2>
          <p className="font-poppins text-muted-foreground mt-2 text-sm">
            Join the royal family and enjoy exclusive benefits
          </p>
        </motion.div>

        {membership ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="max-w-md mx-auto"
          >
            <div
              className="rounded-3xl overflow-hidden shadow-royal p-8 text-white relative"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.06 155) 0%, oklch(0.3 0.07 155) 50%, oklch(0.22 0.06 155) 100%)",
                boxShadow: "0 20px 60px oklch(0 0 0 / 0.4)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.12 75) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/assets/generated/grand-leaf-logo-transparent.dim_400x400.png"
                  alt=""
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-cinzel font-bold text-gold text-sm tracking-widest">
                    THE GRAND LEAF
                  </p>
                  <p className="font-poppins text-cream/60 text-xs">
                    Royal Member Card
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <p className="font-poppins text-cream/70 text-xs uppercase tracking-widest">
                  Member Name
                </p>
                <p className="font-cinzel font-bold text-gold text-2xl mt-1">
                  {membership.name}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-poppins text-cream/70 text-xs uppercase">
                    Member ID
                  </p>
                  <p className="font-cinzel text-gold font-bold">
                    {membership.memberId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-poppins text-cream/70 text-xs uppercase">
                    Valid Until
                  </p>
                  <p className="font-cinzel text-gold font-bold">
                    {membership.expiryDate}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gold/30">
                <p className="font-poppins text-cream/70 text-xs">
                  10% discount on every order • Priority delivery
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
            >
              <h3 className="font-cinzel font-bold text-royal-green text-xl mb-6">
                Member Benefits
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Star,
                    title: "10% Off Every Order",
                    desc: "Enjoy 10% discount on all orders as a royal member",
                  },
                  {
                    icon: Zap,
                    title: "Priority Delivery",
                    desc: "Your orders get priority processing and delivery",
                  },
                  {
                    icon: Shield,
                    title: "Exclusive Offers",
                    desc: "Access special offers, weekend deals, and new dishes first",
                  },
                  {
                    icon: Crown,
                    title: "Royal Status",
                    desc: "Personalized member card with unique member ID",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-xs"
                  >
                    <div className="p-2 bg-royal-green rounded-lg">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-cinzel font-semibold text-royal-green text-sm">
                        {title}
                      </h4>
                      <p className="font-poppins text-muted-foreground text-xs mt-0.5">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-6 bg-royal-green rounded-2xl text-center">
                <p className="font-poppins text-cream/70 text-sm mb-2">
                  Annual Membership Fee
                </p>
                <p className="font-cinzel font-bold text-gold text-4xl">₹499</p>
                <p className="font-poppins text-cream/60 text-xs mt-1">
                  Valid for 1 year
                </p>
              </div>
              {!showForm && (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  data-ocid="membership.open_modal_button"
                  className="w-full mt-4 btn-gold py-3"
                >
                  Join Royal Membership
                </button>
              )}
            </motion.div>

            {showForm && (
              <motion.form
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleJoin}
                className="bg-white rounded-2xl p-8 shadow-xs"
                data-ocid="membership.dialog"
              >
                <h3 className="font-cinzel font-bold text-royal-green text-xl mb-6">
                  Register Membership
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="mem-name"
                      className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="mem-name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      data-ocid="membership.name.input"
                      required
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mem-phone"
                      className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      id="mem-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      data-ocid="membership.phone.input"
                      required
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="mem-email"
                      className="font-cinzel text-xs uppercase tracking-wider text-royal-green block mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="mem-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      data-ocid="membership.email.input"
                      required
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <p className="font-cinzel text-xs uppercase tracking-wider text-royal-green mb-2">
                      Payment
                    </p>
                    <div className="flex gap-4">
                      {(["gpay", "cod"] as const).map((m) => (
                        <label
                          key={m}
                          htmlFor={`mem-payment-${m}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            id={`mem-payment-${m}`}
                            type="radio"
                            checked={payment === m}
                            onChange={() => setPayment(m)}
                            className="accent-gold"
                          />
                          <span className="font-poppins text-sm">
                            {m === "gpay" ? "GPay (₹499)" : "Cash on Delivery"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      data-ocid="membership.submit.button"
                      className="flex-1 btn-gold py-3"
                    >
                      Pay & Join
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      data-ocid="membership.cancel.button"
                      className="flex-1 btn-ghost-gold py-3"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
