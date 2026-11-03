"use client"

import { SystemStatusProvider } from "./contexts/SystemStatusContext"
import Header from "./components/Header"
import Hero from "./components/Hero"
import SystemStatus from "./components/SystemStatus"
import Footer from "./components/Footer"

export default function MainPage() {
  return (
    <SystemStatusProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />
        <SystemStatus />
        <Hero />
        <Footer />
      </div>
    </SystemStatusProvider>
  )
}
