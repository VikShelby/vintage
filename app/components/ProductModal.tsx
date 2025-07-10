"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Heart, Star } from "lucide-react"
import { useState } from "react"
import AddToCartButton from "./AddToCartButton"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  category: string
  description?: string
  sizes?: string[]
  rating?: number
  reviews?: number
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-espresso/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-ivory rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 bg-ivory/90 p-2 rounded-full hover:bg-ivory transition-colors"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-espresso" />
            </motion.button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={600}
                  className="w-full h-96 md:h-full object-cover rounded-lg"
                />
              </motion.div>

              {/* Product Details */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col"
              >
                <div className="mb-4">
                  <p className="text-rust font-medium mb-2">{product.category}</p>
                  <h2 id="product-modal-title" className="font-serif text-3xl font-bold text-espresso mb-4">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < product.rating! ? "text-gold fill-current" : "text-espresso/30"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-espresso/70">({product.reviews} reviews)</span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-bold text-2xl text-espresso">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-espresso/60 line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-espresso/80 mb-6 leading-relaxed">
                    {product.description ||
                      "This carefully curated vintage piece combines timeless style with authentic character. Each item tells its own story and brings unique charm to your wardrobe."}
                  </p>
                </div>

                {/* Size Selection */}
                {product.sizes && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-espresso mb-3">Size</h3>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          className={`px-4 py-2 border rounded-sm transition-colors ${
                            selectedSize === size
                              ? "border-rust bg-rust text-ivory"
                              : "border-espresso/30 text-espresso hover:border-rust"
                          }`}
                          onClick={() => setSelectedSize(size)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-semibold text-espresso mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="w-10 h-10 border border-espresso/30 rounded-sm flex items-center justify-center hover:border-rust transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      -
                    </motion.button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <motion.button
                      className="w-10 h-10 border border-espresso/30 rounded-sm flex items-center justify-center hover:border-rust transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-auto">
                  <AddToCartButton
                    product={product}
                    selectedSize={selectedSize}
                    quantity={quantity}
                    className="flex-1"
                    showQuantity={true}
                  />
                  <motion.button
                    className="bg-rust text-ivory py-3 px-4 rounded-sm hover:bg-opacity-90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
