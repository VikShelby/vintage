"use client"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import SortDropdown from "../components/SortDropdown"
import { Calendar, Filter, Sparkles } from "lucide-react"
import Link from "next/link"

// New arrivals product data
const newArrivals = [
  {
    id: 101,
    name: "Vintage Chanel Blazer",
    price: "$850",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "statement-coats",
    era: "1980s",
    rating: 5,
    reviews: 3,
    sizes: ["S", "M"],
    description: "Authentic Chanel blazer with signature gold buttons and timeless silhouette.",
    isNew: true,
    arrivalDate: "2024-01-08",
    daysAgo: 2,
  },
  {
    id: 102,
    name: "70s Bohemian Maxi Dress",
    price: "$225",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    collection: "vintage-dresses",
    era: "1970s",
    rating: 5,
    reviews: 1,
    sizes: ["XS", "S", "M"],
    description: "Flowing maxi dress with intricate paisley print and bell sleeves.",
    isNew: true,
    arrivalDate: "2024-01-08",
    daysAgo: 2,
  },
  {
    id: 103,
    name: "Vintage Hermès Scarf",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1960s",
    rating: 5,
    reviews: 2,
    description: "Rare Hermès silk scarf with equestrian motif in pristine condition.",
    isNew: true,
    arrivalDate: "2024-01-07",
    daysAgo: 3,
  },
  {
    id: 104,
    name: "Mod Mini Dress",
    price: "$185",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    collection: "vintage-dresses",
    era: "1960s",
    rating: 4,
    reviews: 4,
    sizes: ["XS", "S"],
    description: "Classic mod-style mini dress with geometric pattern and A-line silhouette.",
    isNew: true,
    arrivalDate: "2024-01-07",
    daysAgo: 3,
  },
  {
    id: 105,
    name: "Vintage Levi's Trucker Jacket",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "vintage-denim",
    era: "1970s",
    rating: 5,
    reviews: 6,
    sizes: ["S", "M", "L"],
    description: "Classic Levi's trucker jacket with perfect vintage fade and wear.",
    isNew: true,
    arrivalDate: "2024-01-06",
    daysAgo: 4,
  },
  {
    id: 106,
    name: "Art Deco Evening Bag",
    price: "$275",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1920s",
    rating: 5,
    reviews: 1,
    description: "Exquisite beaded evening bag with Art Deco design and chain handle.",
    isNew: true,
    arrivalDate: "2024-01-06",
    daysAgo: 4,
  },
  {
    id: 107,
    name: "Vintage Band T-Shirt",
    price: "$95",
    originalPrice: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    collection: "vintage-dresses",
    era: "1990s",
    rating: 4,
    reviews: 8,
    sizes: ["S", "M", "L"],
    description: "Authentic vintage band tee with original tour dates and graphics.",
    isNew: true,
    isSale: true,
    arrivalDate: "2024-01-05",
    daysAgo: 5,
  },
  {
    id: 108,
    name: "Cashmere Turtleneck",
    price: "$145",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    collection: "silk-satin",
    era: "1980s",
    rating: 5,
    reviews: 3,
    sizes: ["XS", "S", "M", "L"],
    description: "Luxurious cashmere turtleneck in rich burgundy with perfect drape.",
    isNew: true,
    arrivalDate: "2024-01-05",
    daysAgo: 5,
  },
  {
    id: 109,
    name: "Vintage Cowboy Boots",
    price: "$195",
    image: "/placeholder.svg?height=400&width=300",
    category: "Shoes",
    collection: "accessories",
    era: "1970s",
    rating: 4,
    reviews: 2,
    sizes: ["6", "7", "8", "9"],
    description: "Authentic leather cowboy boots with intricate stitching and worn-in character.",
    isNew: true,
    arrivalDate: "2024-01-04",
    daysAgo: 6,
  },
  {
    id: 110,
    name: "Silk Kimono Robe",
    price: "$285",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    collection: "silk-satin",
    era: "1950s",
    rating: 5,
    reviews: 1,
    sizes: ["One Size"],
    description: "Stunning silk kimono with hand-painted floral motifs and flowing sleeves.",
    isNew: true,
    arrivalDate: "2024-01-04",
    daysAgo: 6,
  },
  {
    id: 111,
    name: "Vintage Sunglasses",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    collection: "accessories",
    era: "1970s",
    rating: 4,
    reviews: 5,
    description: "Classic oversized sunglasses with gradient lenses and gold frames.",
    isNew: true,
    arrivalDate: "2024-01-03",
    daysAgo: 7,
  },
  {
    id: 112,
    name: "Pleated Midi Skirt",
    price: "$115",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    collection: "vintage-dresses",
    era: "1980s",
    rating: 4,
    reviews: 7,
    sizes: ["XS", "S", "M"],
    description: "High-waisted pleated skirt in rich navy with vintage charm.",
    isNew: true,
    arrivalDate: "2024-01-03",
    daysAgo: 7,
  },
]

const categories = ["All", "Outerwear", "Dresses", "Tops", "Bottoms", "Accessories", "Shoes"]
const eras = ["All Eras", "1920s", "1950s", "1960s", "1970s", "1980s", "1990s"]

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedEra, setSelectedEra] = useState("All Eras")
  const [sortBy, setSortBy] = useState("newest")

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = newArrivals

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Filter by era
    if (selectedEra !== "All Eras") {
      filtered = filtered.filter((product) => product.era === selectedEra)
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime())
        break
      case "price-low":
        filtered.sort((a, b) => Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", "")))
        break
      case "price-high":
        filtered.sort((a, b) => Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", "")))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [selectedCategory, selectedEra, sortBy])

  const recentArrivals = newArrivals.filter((product) => product.daysAgo <= 3)

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-espresso to-warm-brown text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-ivory/20 rounded-full" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-ivory/20 rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-ivory/20 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Sparkles className="w-8 h-8 text-gold" />
              <span className="bg-gold text-espresso px-4 py-2 rounded-full text-sm font-medium">
                Fresh Finds Weekly
              </span>
              <Sparkles className="w-8 h-8 text-gold" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl font-bold mb-6"
            >
              New Arrivals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-ivory/90 leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              Discover the latest vintage treasures added to our collection. From rare designer pieces to timeless
              classics, each arrival is carefully curated and authenticated for your wardrobe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-6 text-ivory/80"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Updated Daily</span>
              </div>
              <div className="w-1 h-1 bg-ivory/40 rounded-full" />
              <span>{newArrivals.length} New Pieces</span>
              <div className="w-1 h-1 bg-ivory/40 rounded-full" />
              <span>Authenticated & Ready</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Just Arrived Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-4">Just Arrived</h2>
            <p className="text-espresso/70 max-w-2xl mx-auto">
              The newest additions to our collection, arrived within the last 3 days
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArrivals.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute top-3 left-3 z-10 bg-rust text-ivory px-2 py-1 rounded-full text-xs font-medium">
                  {product.daysAgo === 1 ? "Yesterday" : `${product.daysAgo} days ago`}
                </div>
                <ProductCard product={product} onClick={() => {}} index={index} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <button className="text-rust hover:text-espresso font-medium underline">View All Recent Arrivals →</button>
          </motion.div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
            <span className="text-espresso font-medium">New Arrivals</span>
          </motion.nav>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-cream p-6 rounded-lg mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <Filter className="w-5 h-5 text-espresso" />
              <h3 className="font-serif text-lg font-semibold text-espresso">Filter & Sort</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-espresso mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-warm-brown/20 rounded-sm bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-rust/20"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Era Filter */}
              <div>
                <label className="block text-sm font-medium text-espresso mb-2">Era</label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full p-2 border border-warm-brown/20 rounded-sm bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-rust/20"
                >
                  {eras.map((era) => (
                    <option key={era} value={era}>
                      {era}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-espresso mb-2">Sort By</label>
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-espresso/70">
                  <span className="font-medium text-espresso">{filteredProducts.length}</span> items found
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                >
                  <div className="absolute top-3 right-3 z-10 bg-gold text-espresso px-2 py-1 rounded-full text-xs font-medium">
                    NEW
                  </div>
                  <ProductCard product={product} onClick={() => {}} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <h3 className="font-serif text-2xl font-bold text-espresso mb-4">No items found</h3>
              <p className="text-espresso/70 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedEra("All Eras")
                  setSortBy("newest")
                }}
                className="bg-rust text-ivory px-6 py-3 rounded-sm font-medium hover:bg-rust/90 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-warm-brown/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso mb-4">Never Miss a New Arrival</h2>
            <p className="text-espresso/70 mb-8 leading-relaxed">
              Be the first to know when we add new vintage treasures to our collection. Subscribe to our newsletter for
              exclusive early access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-3 border border-warm-brown/20 rounded-sm bg-ivory text-espresso focus:outline-none focus:ring-2 focus:ring-rust/20"
              />
              <motion.button
                className="bg-rust text-ivory px-6 py-3 rounded-sm font-medium hover:bg-rust/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
