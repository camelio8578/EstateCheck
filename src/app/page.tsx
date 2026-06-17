'use client'

import { useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SnapshotForm from './components/SnapshotForm'
import ReportView from './components/ReportView'
import Footer from './components/Footer'

export default function Home() {
  const [snapshot, setSnapshot] = useState<any>(null)
  const [showReport, setShowReport] = useState(false)
  
  const handleComplete = (data: any) => {
    setSnapshot(data)
    setShowReport(true)
    // scroll to report
    setTimeout(() => {
      document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <SnapshotForm onComplete={handleComplete} />
      {showReport && snapshot && <ReportView snapshot={snapshot} />}
      <Footer />
    </main>
  )
}
