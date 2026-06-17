'use client'

import { ArrowDown, AlertTriangle } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* not too flashy - muted, serious tone */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-200 rounded-full text-xs text-stone-700 mb-8">
          <AlertTriangle className="w-3 h-3" />
          <span>73 million boomers entering mortality window</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
          What happens to your stuff<br className="hidden md:block" /> when you die?
        </h1>
        
        <p className="text-lg text-stone-600 mb-4 leading-relaxed">
          The average estate takes 12–18 months to settle. 
          Most families don't know where half the accounts are. 
          <span className="text-stone-900 font-medium"> $100+ billion in assets go unclaimed.</span>
        </p>
        
        <p className="text-sm text-stone-500 mb-10">
          Get a free 5-minute snapshot of what your family would face.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#snapshot" className="btn-primary inline-flex items-center gap-2">
            Start free snapshot
            <ArrowDown className="w-4 h-4" />
          </a>
          <a href="#report" className="btn-secondary">
            See sample report
          </a>
        </div>
        
        {/* trust indicators - understated */}
        <div className="mt-12 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-400">
            No account required. No spam. Just the facts.
          </p>
        </div>
      </div>
    </section>
  )
}
