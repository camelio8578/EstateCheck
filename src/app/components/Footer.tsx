'use client'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-stone-200 font-medium mb-3">EstateCheck</h4>
            <p className="text-sm">
              Helping families prepare for the inevitable. 
              Built because we needed it ourselves.
            </p>
          </div>
          <div>
            <h4 className="text-stone-200 font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-stone-200">Estate planning guide</a></li>
              <li><a href="#" className="hover:text-stone-200">State probate laws</a></li>
              <li><a href="#" className="hover:text-stone-200">Crypto inheritance</a></li>
              <li><a href="#" className="hover:text-stone-200">Digital asset checklist</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-200 font-medium mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-stone-200">Privacy policy</a></li>
              <li><a href="#" className="hover:text-stone-200">Terms of service</a></li>
              <li><a href="#" className="hover:text-stone-200">Not legal advice</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} EstateCheck. Not a law firm.</p>
        </div>
      </div>
    </footer>
  )
}
