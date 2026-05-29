"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/cart";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalAmount, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent-DEFAULT" />
                <h2 className="font-bold text-gray-900 text-lg">Корзина</h2>
                {totalItems > 0 && (
                  <span className="bg-accent-DEFAULT text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">Корзина пуста</p>
                    <p className="text-gray-400 text-sm mt-1">Добавьте товары из каталога</p>
                    <Link
                      href="/catalog"
                      onClick={onClose}
                      className="btn-accent mt-6 flex items-center gap-2 text-sm"
                    >
                      Перейти в каталог <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                      >
                        {/* Image */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">Арт: {item.sku}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-sm text-gray-900">
                              {(item.price * item.quantity).toLocaleString("ru")} ₽
                            </span>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors text-gray-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-gray-100 p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Итого:</span>
                  <span className="text-xl font-black text-gray-900">
                    {totalAmount.toLocaleString("ru")} ₽
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="btn-accent w-full flex items-center justify-center gap-2"
                >
                  Оформить заказ <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-1"
                >
                  Продолжить покупки
                </button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
