import { Mic, MicOff, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { comboItems, menuItems } from "../data/menuData";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const allItems = [...menuItems, ...comboItems];

export default function FloatingButtons() {
  const { itemCount, total, setIsCartOpen, addToCart } = useCart();
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const recognitionRef = useRef<any>(null);
  const addToCartRef = useRef(addToCart);
  const setIsCartOpenRef = useRef(setIsCartOpen);

  useEffect(() => {
    addToCartRef.current = addToCart;
    setIsCartOpenRef.current = setIsCartOpen;
  });

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join(" ")
        .toLowerCase();
      setVoiceText(transcript);

      if (event.results[0].isFinal) {
        if (transcript.includes("order") || transcript.includes("cart")) {
          setIsCartOpenRef.current(true);
          setVoiceText("");
          setVoiceActive(false);
          return;
        }
        const matched = allItems.find(
          (item) =>
            transcript.includes(item.name.toLowerCase()) ||
            item.name
              .toLowerCase()
              .split(" ")
              .some((word) => transcript.includes(word)),
        );
        if (matched) {
          addToCartRef.current({
            id: matched.id,
            name: matched.name,
            nameTamil: matched.nameTamil,
            price: matched.price,
            image: matched.image,
            category: matched.category,
          });
          toast.success(`${matched.name} added via voice!`);
        }
        setVoiceText("");
        setVoiceActive(false);
      }
    };

    recognition.onend = () => setVoiceActive(false);
  }, []);

  const toggleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice control not supported in this browser");
      return;
    }
    if (voiceActive) {
      recognitionRef.current?.stop();
      setVoiceActive(false);
    } else {
      recognitionRef.current?.start();
      setVoiceActive(true);
      toast("Listening... Say a dish name or 'order'");
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3 items-end no-print">
      {voiceActive && voiceText && (
        <div className="bg-royal-green text-cream px-4 py-2 rounded-full text-sm font-poppins shadow-royal">
          "{voiceText}..."
        </div>
      )}

      <button
        type="button"
        onClick={toggleVoice}
        data-ocid="voice.command_palette_open"
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
          voiceActive
            ? "bg-red-500 animate-pulse"
            : "bg-gold hover:bg-gold-light"
        }`}
        aria-label="Voice control"
      >
        {voiceActive ? (
          <MicOff className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-royal-green" />
        )}
      </button>

      <a
        href="https://wa.me/917402229777"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        className="w-12 h-12 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg transition-colors"
        aria-label="WhatsApp"
      >
        <SiWhatsapp className="w-6 h-6 text-white" />
      </a>

      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        data-ocid="cart.primary_button"
        className="flex items-center gap-2 bg-gold hover:bg-gold-light text-royal-green rounded-full px-4 py-3 shadow-gold transition-all"
        aria-label="Cart"
      >
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <>
            <span className="font-cinzel font-bold text-sm">{itemCount}</span>
            <span className="font-poppins text-xs font-semibold">₹{total}</span>
          </>
        )}
      </button>
    </div>
  );
}
