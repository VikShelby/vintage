"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../contexts/CartContext"
import { ArrowLeft, Package, Truck, CreditCard, Check, MapPin, User, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ShippingInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface OrderSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

const countries = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
]

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    subtotal: 0,
    shipping: 15,
    tax: 0,
    total: 0,
  })

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0 && !orderComplete) {
      router.push("/shop")
    }
  }, [state.items.length, router, orderComplete])

  // Calculate order summary
  useEffect(() => {
    const subtotal = state.totalPrice
    const shipping = subtotal > 100 ? 0 : 15 // Free shipping over $100
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + shipping + tax

    setOrderSummary({
      subtotal,
      shipping,
      tax,
      total,
    })
  }, [state.totalPrice])

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateStep = (step: number) => {
    if (step === 1) {
      return (
        shippingInfo.firstName &&
        shippingInfo.lastName &&
        shippingInfo.email &&
        shippingInfo.phone &&
        shippingInfo.address &&
        shippingInfo.city &&
        shippingInfo.state &&
        shippingInfo.zipCode &&
        shippingInfo.country
      )
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order number
    const orderNum = `VR${Date.now().toString().slice(-6)}`
    setOrderNumber(orderNum)
    setOrderComplete(true)
    setIsProcessing(false)
    clearCart()
  }

  const steps = [
    { number: 1, title: "Shipping", icon: Package },
    { number: 2, title: "Review", icon: Truck },
    { number: 3, title: "Complete", icon: Check },
  ]

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-ivory">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>

            <h1 className="font-serif text-4xl font-bold text-espresso mb-4">Order Confirmed!</h1>
            <p className="text-lg text-espresso/80 mb-6">
              Thank you for your order. We'll prepare your vintage pieces with care.
            </p>

            <div className="bg-cream p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-espresso mb-2">Order Details</h3>
              <p className="text-espresso/70">
                Order Number: <span className="font-mono font-semibold">{orderNumber}</span>
              </p>
              <p className="text-espresso/70">
                Total: <span className="font-semibold">${orderSummary.total.toFixed(2)}</span>
              </p>
              <p className="text-espresso/70">Payment: Cash on Delivery</p>
            </div>

            <div className="space-y-4">
              <p className="text-espresso/80">
                📦 Your order will be carefully packaged and shipped within 2-3 business days.
              </p>
              <p className="text-espresso/80">💰 Payment will be collected upon delivery.</p>
              <p className="text-espresso/80">
                📧 You'll receive tracking information via email once your order ships.
              </p>
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <Link href="/shop">
                <motion.button
                  className="bg-gold text-espresso px-6 py-3 rounded-sm font-medium hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/shop">
          <motion.button
            className="flex items-center gap-2 text-espresso hover:text-rust transition-colors mb-6"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </motion.button>
        </Link>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <motion.div
                  className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
                    currentStep >= step.number
                      ? "bg-rust text-ivory"
                      : currentStep === step.number
                        ? "bg-gold text-espresso"
                        : "bg-cream text-espresso/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="font-medium">{step.title}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-rust" : "bg-espresso/20"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-cream p-6 rounded-lg"
                >
                  <h2 className="font-serif text-2xl font-bold text-espresso mb-6 flex items-center gap-3">
                    <Package className="w-6 h-6" />
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-espresso mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Address *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">City *</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">State/Province *</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">ZIP/Postal Code *</label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-espresso mb-2">Country *</label>
                      <select
                        value={shippingInfo.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="w-full px-4 py-3 border border-espresso/20 rounded-sm focus:outline-none focus:border-rust bg-ivory transition-colors"
                        required
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <motion.button
                    className={`w-full mt-6 py-4 rounded-sm font-medium text-lg transition-all ${
                      validateStep(1)
                        ? "bg-gold text-espresso hover:bg-opacity-90"
                        : "bg-espresso/20 text-espresso/50 cursor-not-allowed"
                    }`}
                    onClick={handleNextStep}
                    disabled={!validateStep(1)}
                    whileHover={validateStep(1) ? { scale: 1.02 } : {}}
                    whileTap={validateStep(1) ? { scale: 0.98 } : {}}
                  >
                    Continue to Review
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Review Order */}
              {currentStep === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Shipping Address */}
                  <div className="bg-cream p-6 rounded-lg">
                    <h3 className="font-serif text-xl font-bold text-espresso mb-4 flex items-center gap-3">
                      <MapPin className="w-5 h-5" />
                      Shipping Address
                    </h3>
                    <div className="text-espresso/80">
                      <p className="font-medium">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p>{countries.find((c) => c.code === shippingInfo.country)?.name}</p>
                      <p className="mt-2">
                        📧 {shippingInfo.email} | 📞 {shippingInfo.phone}
                      </p>
                    </div>
                    <motion.button
                      className="text-rust hover:text-espresso underline text-sm mt-2"
                      onClick={() => setCurrentStep(1)}
                      whileHover={{ x: -2 }}
                    >
                      Edit Address
                    </motion.button>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-cream p-6 rounded-lg">
                    <h3 className="font-serif text-xl font-bold text-espresso mb-4 flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      Payment Method
                    </h3>
                    <div className="flex items-center gap-4 p-4 bg-ivory rounded-sm border-2 border-gold">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-espresso" />
                      </div>
                      <div>
                        <p className="font-semibold text-espresso">Cash on Delivery</p>
                        <p className="text-sm text-espresso/70">Pay when you receive your order</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-warm-brown/10 rounded-sm">
                      <p className="text-sm text-espresso/80">
                        💡 <strong>How it works:</strong> Your order will be shipped and payment will be collected by
                        our delivery partner when your vintage pieces arrive at your doorstep.
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-cream p-6 rounded-lg">
                    <h3 className="font-serif text-xl font-bold text-espresso mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {state.items.map((item) => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-4 bg-ivory rounded-sm">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover rounded-sm"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-espresso">{item.name}</h4>
                            <p className="text-sm text-espresso/70">{item.category}</p>
                            {item.selectedSize && <p className="text-sm text-espresso/70">Size: {item.selectedSize}</p>}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-espresso">Qty: {item.quantity}</span>
                              <span className="font-semibold text-espresso">{item.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      className="flex-1 bg-cream text-espresso py-4 rounded-sm font-medium border-2 border-espresso/20 hover:border-rust transition-colors"
                      onClick={() => setCurrentStep(1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Shipping
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-gold text-espresso py-4 rounded-sm font-medium text-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-cream p-6 rounded-lg sticky top-24"
            >
              <h3 className="font-serif text-xl font-bold text-espresso mb-4">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-espresso text-sm truncate">{item.name}</p>
                      {item.selectedSize && <p className="text-xs text-espresso/70">Size: {item.selectedSize}</p>}
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-espresso/70">Qty: {item.quantity}</span>
                        <span className="text-sm font-semibold text-espresso">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-espresso/20 pt-4 space-y-2">
                <div className="flex justify-between text-espresso">
                  <span>Subtotal:</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-espresso">
                  <span>Shipping:</span>
                  <span>{orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-espresso">
                  <span>Tax:</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-espresso/20 pt-2 flex justify-between font-bold text-lg text-espresso">
                  <span>Total:</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              {orderSummary.shipping === 0 && (
                <div className="mt-4 p-3 bg-green-100 rounded-sm">
                  <p className="text-sm text-green-800 font-medium">🎉 You qualify for free shipping!</p>
                </div>
              )}

              <div className="mt-6 p-4 bg-warm-brown/10 rounded-sm">
                <p className="text-sm text-espresso/80">
                  <strong>💰 Cash on Delivery</strong>
                  <br />
                  Pay ${orderSummary.total.toFixed(2)} when your order arrives
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
