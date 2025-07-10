"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"
import FilterSidebar from "../components/FilterSidebar"
import SortDropdown from "../components/SortDropdown"
import SearchBar from "../components/SearchBar"
import Pagination from "../components/Pagination"
import MobileFilterDrawer from "../components/MobileFilterDrawer"
import Breadcrumbs from "../components/Breadcrumbs"
import { Filter, Grid, List, X } from "lucide-react"

// Extended product data
const allProducts = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: "$285",
    originalPrice: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    subcategory: "Jackets",
    era: "1970s",
    sizes: ["S", "M", "L"],
    color: "Brown",
    condition: "Excellent",
    isSale: true,
    isNew: false,
    rating: 5,
    reviews: 24,
    description: "Classic 70s brown leather with authentic patina and vintage charm.",
  },
  {
    id: 2,
    name: "High-Waisted Denim",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    subcategory: "Jeans",
    era: "1980s",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Blue",
    condition: "Very Good",
    isSale: false,
    isNew: false,
    rating: 4,
    reviews: 18,
    description: "Perfect fit vintage Levi's from the 80s with authentic wear.",
  },
  {
    id: 3,
    name: "Silk Blouse",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
    category: "Tops",
    subcategory: "Blouses",
    era: "1960s",
    sizes: ["S", "M", "L"],
    color: "Floral",
    condition: "Excellent",
    isSale: false,
    isNew: true,
    rating: 5,
    reviews: 31,
    description: "Delicate floral print from the 60s era with silk fabric.",
  },
  {
    id: 4,
    name: "Wool Coat",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    subcategory: "Coats",
    era: "1950s",
    sizes: ["S", "M", "L", "XL"],
    color: "Camel",
    condition: "Excellent",
    isSale: false,
    isNew: false,
    rating: 4,
    reviews: 12,
    description: "Elegant camel coat with vintage buttons and timeless style.",
  },
  {
    id: 5,
    name: "Vintage Dress",
    price: "$195",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    subcategory: "Midi Dresses",
    era: "1970s",
    sizes: ["XS", "S", "M", "L"],
    color: "Green",
    condition: "Very Good",
    isSale: false,
    isNew: false,
    rating: 5,
    reviews: 27,
    description: "Flowing midi dress with vintage print and comfortable fit.",
  },
  {
    id: 6,
    name: "Retro Sunglasses",
    price: "$85",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    subcategory: "Eyewear",
    era: "1980s",
    sizes: ["One sizes"],
    color: "Black",
    condition: "Excellent",
    isSale: false,
    isNew: true,
    rating: 4,
    reviews: 8,
    description: "Classic 80s style sunglasses with UV protection.",
  },
  {
    id: 7,
    name: "Vintage Scarf",
    price: "$45",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    subcategory: "Scarves",
    era: "1960s",
    sizes: ["One sizes"],
    color: "Multi",
    condition: "Good",
    isSale: false,
    isNew: true,
    rating: 5,
    reviews: 15,
    description: "Colorful vintage scarf with geometric patterns.",
  },
  {
    id: 8,
    name: "70s Flare Jeans",
    price: "$145",
    originalPrice: "$175",
    image: "/placeholder.svg?height=400&width=300",
    category: "Bottoms",
    subcategory: "Jeans",
    era: "1970s",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Blue",
    condition: "Very Good",
    isSale: true,
    isNew: true,
    rating: 4,
    reviews: 22,
    description: "Authentic 70s flare jeans with perfect vintage wash.",
  },
  {
    id: 9,
    name: "Bohemian Dress",
    price: "$175",
    image: "/placeholder.svg?height=400&width=300",
    category: "Dresses",
    subcategory: "Maxi Dresses",
    era: "1970s",
    sizes: ["S", "M", "L"],
    color: "Earth Tones",
    condition: "Excellent",
    isSale: false,
    isNew: true,
    rating: 5,
    reviews: 19,
    description: "Flowing bohemian maxi dress with intricate embroidery.",
  },
  {
    id: 10,
    name: "Vintage Boots",
    price: "$225",
    image: "/placeholder.svg?height=400&width=300",
    category: "Shoes",
    subcategory: "Boots",
    era: "1980s",
    sizes: ["6", "7", "8", "9", "10"],
    color: "Brown",
    condition: "Very Good",
    isSale: false,
    isNew: true,
    rating: 4,
    reviews: 11,
    description: "Classic leather boots with vintage character.",
  },
  {
    id: 11,
    name: "Statement Necklace",
    price: "$65",
    image: "/placeholder.svg?height=400&width=300",
    category: "Accessories",
    subcategory: "Jewelry",
    era: "1960s",
    sizes: ["One sizes"],
    color: "Gold",
    condition: "Excellent",
    isSale: false,
    isNew: true,
    rating: 5,
    reviews: 7,
    description: "Bold vintage necklace perfect for statement looks.",
  },
  {
    id: 12,
    name: "Suede Fringe Jacket",
    price: "$295",
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    subcategory: "Jackets",
    era: "1970s",
    sizes: ["S", "M", "L"],
    color: "Tan",
    condition: "Excellent",
    isSale: false,
    isNew: false,
    rating: 5,
    reviews: 16,
    description: "Authentic 70s suede jacket with fringe details.",
  },
]

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500],
    sizes: [] as string[],
    colors: [] as string[],
    eras: [] as string[],
    conditions: [] as string[],
    onSale: false,
    newArrivals: false,
  })

  const itemsPerPage = 12

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Search query
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price range filter
      const price = Number.parseInt(product.price.replace("$", ""))
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false
      }

      // sizes filter
      if (filters.sizes.length > 0 && !filters.sizes.some((sizes) => product.sizes.includes(sizes))) {
        return false
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
        return false
      }

      // Era filter
      if (filters.eras.length > 0 && !filters.eras.includes(product.era)) {
        return false
      }

      // Condition filter
      if (filters.conditions.length > 0 && !filters.conditions.includes(product.condition)) {
        return false
      }

      // Sale filter
      if (filters.onSale && !product.isSale) {
        return false
      }

      // New arrivals filter
      if (filters.newArrivals && !product.isNew) {
        return false
      }

      return true
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", "")))
        break
      case "price-high":
        filtered.sort((a, b) => Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", "")))
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      eras: [],
      conditions: [],
      onSale: false,
      newArrivals: false,
    })
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs />

        {/* Page Header */}
        <div
          className="mb-8"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Shop All</h1>
          <p className="text-lg text-espresso/80">
            Discover our complete collection of carefully curated vintage pieces
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} onClearAll={clearAllFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="mb-6 space-y-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <motion.button
                    className="lg:hidden flex items-center gap-2 bg-rust text-ivory px-4 py-2 rounded-sm font-medium"
                    onClick={() => setIsMobileFilterOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </motion.button>

                  {/* Results Count */}
                  <span className="text-espresso/70">
                    {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex bg-cream rounded-sm p-1">
                    <motion.button
                      className={`p-2 rounded-sm transition-colors ${
                        viewMode === "grid" ? "bg-rust text-ivory" : "text-espresso hover:bg-ivory"
                      }`}
                      onClick={() => setViewMode("grid")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className={`p-2 rounded-sm transition-colors ${
                        viewMode === "list" ? "bg-rust text-ivory" : "text-espresso hover:bg-ivory"
                      }`}
                      onClick={() => setViewMode("list")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="List view"
                    >
                      <List className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Sort Dropdown */}
                  <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                </div>
              </div>

              {/* Active Filters */}
              {(filters.categories.length > 0 ||
                filters.sizes.length > 0 ||
                filters.colors.length > 0 ||
                filters.eras.length > 0 ||
                filters.conditions.length > 0 ||
                filters.onSale ||
                filters.newArrivals ||
                searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap items-center gap-2"
                >
                  <span className="text-sm text-espresso/70">Active filters:</span>
                  {searchQuery && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gold text-espresso px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="hover:text-rust">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  )}
                  {[...filters.categories, ...filters.sizes, ...filters.colors, ...filters.eras, ...filters.conditions]
                    .concat(filters.onSale ? ["On Sale"] : [])
                    .concat(filters.newArrivals ? ["New Arrivals"] : [])
                    .map((filter, index) => (
                      <motion.span
                        key={`${filter}-${index}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-rust text-ivory px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {filter}
                        <button
                          onClick={() => {
                            // Remove specific filter logic would go here
                          }}
                          className="hover:text-gold"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.span>
                    ))}
                  <motion.button
                    className="text-sm text-rust hover:text-espresso underline"
                    onClick={clearAllFilters}
                    whileHover={{ scale: 1.05 }}
                  >
                    Clear all
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${currentPage}`}
                
                transition={{ duration: 0.4 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-6"
                }
              >
                {paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                <h3 className="font-serif text-2xl font-bold text-espresso mb-4">No items found</h3>
                <p className="text-espresso/70 mb-6">Try adjusting your filters or search terms</p>
                <motion.button
                  className="bg-gold text-espresso px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-colors"
                  onClick={clearAllFilters}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onClearAll={clearAllFilters}
      />

      {/* Product Modal */}
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />

      <Footer />
    </div>
  )
}
