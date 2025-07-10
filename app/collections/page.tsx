"use client"
import { motion } from "framer-motion"
import Header from "../components/Header"
import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    id: "70s-jackets",
    name: "70s Jackets",
    description: "Groovy outerwear from the disco era with authentic vintage charm",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 12,
    featured: true,
  },
  {
    id: "vintage-denim",
    name: "Vintage Denim",
    description: "Classic jeans and denim pieces with authentic wear and character",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 18,
    featured: true,
  },
  {
    id: "silk-satin",
    name: "Silk & Satin",
    description: "Luxurious fabrics from decades past in elegant silhouettes",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 8,
    featured: false,
  },
  {
    id: "statement-coats",
    name: "Statement Coats",
    description: "Bold outerwear that makes an impression and tells a story",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 15,
    featured: true,
  },
  {
    id: "vintage-dresses",
    name: "Vintage Dresses",
    description: "Timeless feminine silhouettes from every era",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 22,
    featured: false,
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Perfect finishing touches for your vintage look",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 35,
    featured: false,
  },
  {
    id: "bohemian-chic",
    name: "Bohemian Chic",
    description: "Free-spirited pieces with artistic flair and flowing fabrics",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 14,
    featured: false,
  },
  {
    id: "power-suits",
    name: "Power Suits",
    description: "Sharp tailoring from the era of shoulder pads and confidence",
    image: "/placeholder.svg?height=400&width=600",
    itemCount: 9,
    featured: false,
  },
]

export default function CollectionsPage() {
  const featuredCollections = collections.filter((collection) => collection.featured)
  const otherCollections = collections.filter((collection) => !collection.featured)

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-sm text-espresso/70 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-rust transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-espresso font-medium">Collections</span>
        </motion.nav>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-espresso mb-6">Our Collections</h1>
          <p className="text-lg text-espresso/80 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated vintage collections, each representing a distinct era, style, and story. From
            groovy 70s pieces to elegant silk treasures, find your perfect vintage match.
          </p>
        </motion.div>

        {/* Featured Collections */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl font-bold text-espresso mb-8 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/collections/${collection.id}`}>
                  <div className="group cursor-pointer bg-cream rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-ivory/90 backdrop-blur-sm rounded-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-sm text-espresso font-medium">{collection.itemCount} pieces</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-espresso mb-2 group-hover:text-rust transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-espresso/70 text-sm leading-relaxed">{collection.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* All Collections */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-serif text-3xl font-bold text-espresso mb-8 text-center">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/collections/${collection.id}`}>
                  <div className="group cursor-pointer bg-cream rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <span className="bg-ivory/90 text-espresso text-xs font-medium px-2 py-1 rounded-full">
                          {collection.itemCount}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-semibold text-espresso mb-1 group-hover:text-rust transition-colors">
                        {collection.name}
                      </h3>
                      <p className="text-espresso/60 text-xs">{collection.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
