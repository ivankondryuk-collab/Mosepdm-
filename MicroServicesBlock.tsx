"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/cart";
import Logo from "@/components/ui/Logo";
import CartDrawer from "@/components/cart/CartDrawer";

const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/calculator", label: "Калькулятор" },
  { href: "/color-mixer", label: "Миксер цветов" },
  { href: "/projects", label: "Объекты" },
  { href: "/articles", label: "Статьи" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Logo isScrolled={isScrolled} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-gray-700 hover:text-accent-DEFAULT hover:bg-gray-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+74992830732"
                className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-accent-DEFAULT" : "text-white/90 hover:text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">+7 (499) 283-07-32</span>
              </a>

              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-accent-DEFAULT hover:bg-gray-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Корзина"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-DEFAULT text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              {/* CTA button */}
              <Link
                href="/price-request"
                className="hidden sm:inline-flex btn-accent text-sm py-2 px-4"
              >
                Получить прайс
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Меню"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
            >
              <div className="container-custom py-4">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="px-4 py-3 rounded-xl text-gray-700 hover:text-accent-DEFAULT hover:bg-gray-50 font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-3 mt-3 border-t border-gray-100 flex flex-col gap-3">
                    <a
                      href="tel:+74992830732"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 font-medium"
                    >
                      <Phone className="w-4 h-4 text-accent-DEFAULT" />
                      +7 (499) 283-07-32
                    </a>
                    <Link
                      href="/price-request"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn-accent text-center"
                    >
                      Получить прайс
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
