"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "./ProductCard"

const bestSellers = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: "$285",
    originalPrice: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    isSale: true,
    rating: 5,
    reviews: 24,
    sizes: ["S", "M", "L"],
  },
  {
    id: 2,
    name: "High-Waisted Denim",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
    category: "Denim",
    rating: 4,
    reviews: 18,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Silk Blouse",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    rating: 5,
    reviews: 31,
    sizes: ["S", "M", "L"],
  },
  {
    id: 4,
    name: "Wool Coat",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    rating: 4,
    reviews: 12,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Vintage Dress",
    price: "$195",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    rating: 5,
    reviews: 27,
    sizes: ["XS", "S", "M", "L"],
  },
]

interface BestSellersProps {
  onProductClick: (product: any) => void
}

export default function BestSellers({ onProductClick }: BestSellersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Best Sellers</h2>
          <p className="text-lg text-espresso/80 max-w-2xl mx-auto">
            Our most loved pieces, chosen by customers who appreciate timeless style
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-ivory shadow-lg p-3 rounded-full hover:bg-cream transition-colors z-10"
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-espresso" />
          </motion.button>
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-ivory shadow-lg p-3 rounded-full hover:bg-cream transition-colors z-10"
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-espresso" />
          </motion.button>

          {/* Products Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-4"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {bestSellers.map((product, index) => (
              <div key={product.id} className="flex-none w-80" style={{ scrollSnapAlign: "start" }}>
                <ProductCard product={product} onClick={onProductClick} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
