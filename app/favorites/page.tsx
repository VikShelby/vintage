"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import { Heart, Trash2, Share2, ShoppingBag, Filter } from "lucide-react"
import Link from "next/link"

// Sample favorites data - in a real app, this would come from localStorage, database, or context
const sampleFavorites = [
  {
    id: 1,
    name: "Vintage Chanel Blazer",
    price: "$850",
    originalPrice: "$1200",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "statement-coats",
    era: "1980s",
    rating: 5,
    reviews: 12,
    sizes: ["S", "M"],
    description: "Authentic Chanel blazer with signature gold buttons and timeless silhouette.",
    isSale: true,
    dateAdded: "2024-01-05",
    inStock: true,
  },
  {
    id: 2,
    name: "70s Bohemian Maxi Dress",
    price: "$225",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    collection: "vintage-dresses",
    era: "1970s",
    rating: 5,
    reviews: 8,
    sizes: ["XS", "S", "M"],
    description: "Flowing maxi dress with intricate paisley print and bell sleeves.",
    dateAdded: "2024-01-03",
    inStock: true,
  },
  {
    id: 3,
    name: "Vintage Hermès Scarf",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1960s",
    rating: 5,
    reviews: 15,
    description: "Rare Hermès silk scarf with equestrian motif in pristine condition.",
    dateAdded: "2024-01-01",
    inStock: false,
  },
  {
    id: 4,
    name: "Vintage Levi's 501 Jeans",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    collection: "vintage-denim",
    era: "1980s",
    rating: 4,
    reviews: 22,
    sizes: ["28", "30", "32"],
    description: "Classic Levi's 501 jeans with perfect vintage wash and fit.",
    dateAdded: "2023-12-28",
    inStock: true,
  },
  {
    id: 5,
    name: "Art Deco Evening Bag",
    price: "$275",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1920s",
    rating: 5,
    reviews: 6,
    description: "Exquisite beaded evening bag with Art Deco design and chain handle.",
    dateAdded: "2023-12-25",
    inStock: true,
  },
  {
    id: 6,
    name: "Silk Kimono Robe",
    price: "$285",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "silk-satin",
    era: "1950s",
    rating: 5,
    reviews: 4,
    sizes: ["One Size"],
    description: "Stunning silk kimono with hand-painted floral motifs and flowing sleeves.",
    dateAdded: "2023-12-20",
    inStock: true,
  },
]

const categories = ["All", "Outerwear", "Dresses", "Bottoms", "Accessories"]
const availability = ["All", "In Stock", "Out of Stock"]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(sampleFavorites)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedAvailability, setSelectedAvailability] = useState("All")
  const [sortBy, setSortBy] = useState("date-added")

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) return false
      if (selectedAvailability === "In Stock" && !item.inStock) return false
      if (selectedAvailability === "Out of Stock" && item.inStock) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-added":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case "price-low":
          return Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", ""))
        case "price-high":
          return Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", ""))
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  const clearAllFavorites = () => {
    setFavorites([])
  }

  const inStockCount = favorites.filter((item) => item.inStock).length
  const outOfStockCount = favorites.filter((item) => !item.inStock).length

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-rust/10 to-gold/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Heart className="w-8 h-8 text-rust fill-rust" />
              <span className="bg-rust text-ivory px-4 py-2 rounded-full text-sm font-medium">Your Collection</span>
              <Heart className="w-8 h-8 text-rust fill-rust" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl md:text-6xl font-bold text-espresso mb-6"
            >
              My Favorites
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-espresso/80 leading-relaxed mb-8"
            >
              Your curated collection of vintage treasures. Keep track of the pieces that caught your eye and never lose
              sight of your dream wardrobe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-6 text-espresso/70"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-espresso">{favorites.length}</span>
                <span>Total Items</span>
              </div>
              <div className="w-1 h-1 bg-espresso/40 rounded-full" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">{inStockCount}</span>
                <span>Available</span>
              </div>
              <div className="w-1 h-1 bg-espresso/40 rounded-full" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-rust">{outOfStockCount}</span>
                <span>Out of Stock</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-sm text-espresso/70 mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-rust transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-espresso font-medium">Favorites</span>
        </motion.nav>

        {favorites.length > 0 ? (
          <>
            {/* Filters and Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-cream p-6 rounded-lg mb-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Filter className="w-5 h-5 text-espresso" />
                  <h3 className="font-serif text-lg font-semibold text-espresso">Filter & Sort</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-warm-brown/20 rounded-sm bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-rust/20"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Availability Filter */}
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="px-3 py-2 border border-warm-brown/20 rounded-sm bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-rust/20"
                  >
                    {availability.map((avail) => (
                      <option key={avail} value={avail}>
                        {avail}
                      </option>
                    ))}
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-warm-brown/20 rounded-sm bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-rust/20"
                  >
                    <option value="date-added">Recently Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>

                  {/* Clear All Button */}
                  <motion.button
                    onClick={clearAllFavorites}
                    className="flex items-center gap-2 px-4 py-2 text-rust hover:text-espresso border border-rust hover:border-espresso rounded-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </motion.button>
                </div>
              </div>

              <div className="mt-4 text-sm text-espresso/70">
                Showing {filteredFavorites.length} of {favorites.length} items
              </div>
            </motion.div>

            {/* Favorites Grid */}
            {filteredFavorites.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {filteredFavorites.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="relative group"
                    >
                      {/* Stock Status Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        {product.inStock ? (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            In Stock
                          </span>
                        ) : (
                          <span className="bg-rust text-ivory px-2 py-1 rounded-full text-xs font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Remove from Favorites Button */}
                      <motion.button
                        onClick={() => removeFavorite(product.id)}
                        className="absolute top-3 right-3 z-10 bg-ivory/90 hover:bg-ivory p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Remove from favorites"
                      >
                        <Heart className="w-4 h-4 text-rust fill-rust" />
                      </motion.button>

                      <ProductCard product={product} onClick={() => {}} index={index} />

                      {/* Action Buttons */}
                      <div className="mt-4 flex gap-2">
                        <motion.button
                          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-sm font-medium transition-colors ${
                            product.inStock
                              ? "bg-rust text-ivory hover:bg-rust/90"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!product.inStock}
                          whileHover={product.inStock ? { scale: 1.02 } : {}}
                          whileTap={product.inStock ? { scale: 0.98 } : {}}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </motion.button>
                        <motion.button
                          className="p-2 border border-warm-brown/20 rounded-sm hover:border-rust hover:text-rust transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Share item"
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <h3 className="font-serif text-2xl font-bold text-espresso mb-4">No items match your filters</h3>
                <p className="text-espresso/70 mb-6">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedAvailability("All")
                  }}
                  className="bg-rust text-ivory px-6 py-3 rounded-sm font-medium hover:bg-rust/90 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <Heart className="w-16 h-16 text-espresso/30 mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold text-espresso mb-4">No Favorites Yet</h2>
              <p className="text-espresso/70 mb-8 leading-relaxed">
                Start building your dream vintage collection! Browse our curated pieces and click the heart icon to save
                your favorites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/collections">
                  <motion.button
                    className="bg-rust text-ivory px-8 py-4 rounded-sm font-medium hover:bg-rust/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Collections
                  </motion.button>
                </Link>
                <Link href="/new-arrivals">
                  <motion.button
                    className="border-2 border-espresso text-espresso px-8 py-4 rounded-sm font-medium hover:bg-espresso hover:text-ivory transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    New Arrivals
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Continue Shopping CTA */}
      {favorites.length > 0 && (
        <section className="py-16 bg-warm-brown/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-4">
                Discover More Vintage Treasures
              </h2>
              <p className="text-espresso/70 mb-8 leading-relaxed">
                Keep exploring our collection to find more unique pieces that speak to your style. Your perfect vintage
                find might be just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/collections">
                  <motion.button
                    className="bg-gold text-espresso px-8 py-4 rounded-sm font-medium hover:bg-gold/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Collections
                  </motion.button>
                </Link>
                <Link href="/new-arrivals">
                  <motion.button
                    className="border-2 border-espresso text-espresso px-8 py-4 rounded-sm font-medium hover:bg-espresso hover:text-ivory transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    New Arrivals
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
    