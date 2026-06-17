'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Wallet, Home, FileText, Users, Monitor, CreditCard } from 'lucide-react'

export default function SnapshotForm({ onComplete }: { onComplete: (data: any) => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    state: '',
    hasWill: null as boolean | null,
    hasTrust: null as boolean | null,
    bankAccounts: 1,
    cryptoWallets: [] as string[],
    insurancePolicies: 0,
    realEstate: 0,
    digitalAssets: [] as string[],
    dependents: 0,
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ]
  
  const cryptoOptions = ['Coinbase', 'Binance.US', 'Kraken', 'Gemini', 'MetaMask', 'Ledger', 'Other wallet']
  const digitalOptions = ['Social media accounts', 'Cloud storage', 'Domain names', 'Digital photos', 'Subscription services']
  
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const toggleCrypto = (wallet: string) => {
    setFormData(prev => ({
      ...prev,
      cryptoWallets: prev.cryptoWallets.includes(wallet)
        ? prev.cryptoWallets.filter(w => w !== wallet)
        : [...prev.cryptoWallets, wallet]
    }))
  }
  
  const toggleDigital = (asset: string) => {
    setFormData(prev => ({
      ...prev,
      digitalAssets: prev.digitalAssets.includes(asset)
        ? prev.digitalAssets.filter(a => a !== asset)
        : [...prev.digitalAssets, asset]
    }))
  }
  
  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // generate ID locally for demo
    const snapshot = {
      ...formData,
      id: 'snap_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    
    onComplete(snapshot)
    setIsSubmitting(false)
  }
  
  const canProceed = () => {
    if (step === 1) return formData.email.includes('@') && formData.state !== ''
    if (step === 2) return formData.hasWill !== null
    if (step === 3) return true
    if (step === 4) return true
    return true
  }
  
  return (
    <section id="snapshot" className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-stone-900 mb-3">
            Your estate snapshot
          </h2>
          <p className="text-stone-600">
            Step {step} of 4. Takes about 3 minutes.
          </p>
        </div>
        
        {/* progress bar - simple */}
        <div className="w-full bg-stone-200 h-1 mb-10 rounded-full">
          <div 
            className="bg-stone-700 h-1 rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
        
        {/* step 1: basics */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email <span className="text-stone-400">(for your report)</span>
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={formData.email}
                onChange={e => updateField('email', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                State of residence
              </label>
              <div className="relative">
                <select
                  className="input-field appearance-none"
                  value={formData.state}
                  onChange={e => updateField('state', e.target.value)}
                >
                  <option value="">Select state...</option>
                  {states.map(s => (
                    <option key={s} value={s.toLowerCase()}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Probate laws vary significantly by state.
              </p>
            </div>
          </div>
        )}
        
        {/* step 2: legal structure */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Do you have a will?</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    A legal document specifying how your assets are distributed.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => updateField('hasWill', true)}
                  className={`flex-1 py-3 px-4 rounded-sm border text-sm font-medium transition-colors ${
                    formData.hasWill === true
                      ? 'border-stone-800 bg-stone-800 text-white'
                      : 'border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateField('hasWill', false)}
                  className={`flex-1 py-3 px-4 rounded-sm border text-sm font-medium transition-colors ${
                    formData.hasWill === false
                      ? 'border-rust-600 bg-rust-600 text-white'
                      : 'border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <FileText className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Do you have a living trust?</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Avoids probate for assets held in the trust.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => updateField('hasTrust', true)}
                  className={`flex-1 py-3 px-4 rounded-sm border text-sm font-medium transition-colors ${
                    formData.hasTrust === true
                      ? 'border-stone-800 bg-stone-800 text-white'
                      : 'border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateField('hasTrust', false)}
                  className={`flex-1 py-3 px-4 rounded-sm border text-sm font-medium transition-colors ${
                    formData.hasTrust === false
                      ? 'border-stone-300 text-stone-700 bg-stone-100'
                      : 'border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* step 3: assets */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Bank accounts</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Checking, savings, CDs, investment accounts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateField('bankAccounts', Math.max(0, formData.bankAccounts - 1))}
                  className="w-10 h-10 rounded-sm border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{formData.bankAccounts}</span>
                <button
                  onClick={() => updateField('bankAccounts', formData.bankAccounts + 1)}
                  className="w-10 h-10 rounded-sm border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <Wallet className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Crypto wallets</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Select all that apply. Self-custody wallets are high risk.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {cryptoOptions.map(wallet => (
                  <button
                    key={wallet}
                    onClick={() => toggleCrypto(wallet)}
                    className={`px-4 py-2 rounded-sm border text-sm transition-colors ${
                      formData.cryptoWallets.includes(wallet)
                        ? 'border-stone-800 bg-stone-800 text-white'
                        : 'border-stone-300 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {wallet}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <Home className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Real estate</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Properties you own (primary residence, rental, land).
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateField('realEstate', Math.max(0, formData.realEstate - 1))}
                  className="w-10 h-10 rounded-sm border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{formData.realEstate}</span>
                <button
                  onClick={() => updateField('realEstate', formData.realEstate + 1)}
                  className="w-10 h-10 rounded-sm border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* step 4: digital + family */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <Monitor className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Digital assets</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Accounts and services with no clear inheritance path.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {digitalOptions.map(asset => (
                  <button
                    key={asset}
                    onClick={() => toggleDigital(asset)}
                    className={`px-4 py-2 rounded-sm border text-sm transition-colors ${
                      formData.digitalAssets.includes(asset)
                        ? 'border-stone-800 bg-stone-800 text-white'
                        : 'border-stone-300 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {asset}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-5 h-5 text-stone-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-stone-900">Dependents</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Minor children or adults who rely on you financially.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateField('dependents', Math.max(0, formData.dependents - 1))}
                  className="w-10 h-10 rounded-sm border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{formData.dependents}</span>
                <button
                  onClick={() => updateField('dependents', formData.dependents + 1)}
                  className="w-10 h-10 rounded-sm border border-stone-300 flex items-center justify-center hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* navigation */}
        <div className="flex justify-between mt-10">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary"
            >
              Back
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary ml-auto inline-flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-50 border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate report'
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
