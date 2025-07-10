"use client"

import { useState } from "react"
import Header from "./components/Header"
import HeroCarousel from "./components/HeroCarousel"
import BestSellers from "./components/BestSellers"
import NewArrivals from "./components/NewArrivals"
import CuratedCollections from "./components/CuratedCollections"
import EngagementSection from "./components/EngagementSection"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"
import ProductModal from "./components/ProductModal"

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <HeroCarousel />
      <BestSellers onProductClick={handleProductClick} />
      <NewArrivals onProductClick={handleProductClick} />
      <CuratedCollections onProductClick={handleProductClick} />
      <EngagementSection />
      <Newsletter />
      <Footer />
      <ProductModal product={selectedProduct} isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  )
}
