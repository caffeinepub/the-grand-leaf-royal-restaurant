import { Clock, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Our Story", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Live Cook", href: "#live-cook" },
    { label: "Membership", href: "#membership" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-royal-green-dark text-cream py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/grand-leaf-logo-transparent.dim_400x400.png"
                alt="The Grand Leaf"
                className="w-12 h-12 object-contain"
              />
              <div>
                <p className="font-cinzel font-bold text-gold text-sm tracking-widest">
                  THE GRAND LEAF
                </p>
                <p className="font-poppins text-cream/60 text-xs">
                  தி கிராண்ட் லீஃப்
                </p>
              </div>
            </div>
            <p className="font-poppins text-cream/70 text-sm leading-relaxed">
              The Taste of Royal Homemade Food, Kolli Hills
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-poppins text-cream/70 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <a
                    href="tel:7200185050"
                    className="font-poppins text-cream/70 hover:text-gold text-sm block"
                  >
                    72001 85050
                  </a>
                  <a
                    href="tel:7402229777"
                    className="font-poppins text-cream/70 hover:text-gold text-sm block"
                  >
                    74022 29777
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <p className="font-poppins text-cream/70 text-sm">
                  Oorkalingam, Kolli Hills
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <p className="font-poppins text-cream/70 text-sm">
                  9 AM – 10:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-cinzel text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Follow Us
            </p>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.instagram.com/grandleafresturantkolli.26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/GrandLeaf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors"
              >
                <SiFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/917402229777"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-gold transition-colors"
              >
                <SiWhatsapp className="w-6 h-6" />
              </a>
            </div>
            <p className="font-poppins text-cream/50 text-xs">
              @grandleafresturantkolli.26
            </p>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-cream/50 text-sm">
            © {year} The Grand Leaf. All rights reserved.
          </p>
          <p className="font-poppins text-cream/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
