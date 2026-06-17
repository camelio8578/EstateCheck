'use client'

import { useState } from 'react'
import { Shield, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo - simple, not too polished */}
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-stone-700" strokeWidth={1.5} />
            <span className="font-serif text-lg text-stone-900 tracking-tight">
              EstateCheck
            </span>
          </div>
          
          {/* nav - minimal */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#snapshot" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              How it works
            </a>
            <a href="#report" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
              Sample report
            </a>
            <button className="btn-primary text-xs">
              Get snapshot
            </button>
          </nav>
          
          {/* mobile menu toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* mobile nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-stone-100">
            <a href="#snapshot" className="block py-2 text-sm text-stone-600">
              How it works
            </a>
            <a href="#report" className="block py-2 text-sm text-stone-600">
              Sample report
            </a>
            <button className="btn-primary text-xs mt-2 w-full">
              Get snapshot
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
