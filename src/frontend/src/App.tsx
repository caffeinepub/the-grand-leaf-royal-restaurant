import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutSection from "./components/AboutSection";
import CartDrawer from "./components/CartDrawer";
import ComboSection from "./components/ComboSection";
import ContactSection from "./components/ContactSection";
import FloatingButtons from "./components/FloatingButtons";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import HeroSection from "./components/HeroSection";
import LiveCookSection from "./components/LiveCookSection";
import MembershipSection from "./components/MembershipSection";
import MenuSection from "./components/MenuSection";
import Navbar from "./components/Navbar";
import OrdersSection from "./components/OrdersSection";
import PreOrderSection from "./components/PreOrderSection";
import ReviewsSection from "./components/ReviewsSection";
import TodaySpecial from "./components/TodaySpecial";
import WeekendSpecialBanner from "./components/WeekendSpecialBanner";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <div className="min-h-screen font-poppins">
            <Navbar />
            <main>
              <HeroSection />
              <TodaySpecial />
              <WeekendSpecialBanner />
              <MenuSection />
              <ComboSection />
              <PreOrderSection />
              <AboutSection />
              <GallerySection />
              <ReviewsSection />
              <LiveCookSection />
              <MembershipSection />
              <ContactSection />
              <OrdersSection />
            </main>
            <Footer />
            <CartDrawer />
            <FloatingButtons />
            <Toaster richColors position="top-right" />
          </div>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
