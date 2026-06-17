import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// utility for tailwind classes - copied from shadcn but simplified
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// state probate data - compiled from various sources, not legal advice
export const stateProbateData: Record<string, {
  averageCost: number
  averageTimeline: string
  hasSmallEstate: boolean
  smallEstateThreshold: number
  notes: string
}> = {
  'california': {
    averageCost: 8500,
    averageTimeline: '12-18 months',
    hasSmallEstate: true,
    smallEstateThreshold: 184500,
    notes: 'Probate fees set by statute. Attorney and executor fees based on estate value.'
  },
  'texas': {
    averageCost: 4500,
    averageTimeline: '6-12 months',
    hasSmallEstate: true,
    smallEstateThreshold: 75000,
    notes: 'Independent administration available if will allows. Much faster than dependent.'
  },
  'new york': {
    averageCost: 12000,
    averageTimeline: '15-24 months',
    hasSmallEstate: true,
    smallEstateThreshold: 50000,
    notes: 'Surrogate\'s Court. High attorney fees in NYC metro area.'
  },
  'florida': {
    averageCost: 5500,
    averageTimeline: '6-12 months',
    hasSmallEstate: true,
    smallEstateThreshold: 75000,
    notes: 'Summary administration available for small estates. Formal administration required otherwise.'
  },
  'illinois': {
    averageCost: 6000,
    averageTimeline: '12-18 months',
    hasSmallEstate: true,
    smallEstateThreshold: 100000,
    notes: 'Probate required if real estate involved regardless of value.'
  },
  // default for states not listed
  'default': {
    averageCost: 5000,
    averageTimeline: '9-15 months',
    hasSmallEstate: true,
    smallEstateThreshold: 50000,
    notes: 'Probate laws vary significantly by state. Consult local attorney.'
  }
}

// rough crypto exchange policies - this changes constantly
export const cryptoPolicies: Record<string, string> = {
  'coinbase': 'Account frozen. Heirs must provide death certificate, probate documents, and court order. Process takes 6-12 months.',
  'binance.us': 'Account frozen. Complex international verification required. May require legal intervention.',
  'kraken': 'Account frozen. Requires death certificate, will, and KYC verification of heirs. 3-6 month process.',
  'gemini': 'Account frozen. Requires extensive documentation. Known for being slow with estate claims.',
  'metamask': 'Self-custody. If private keys lost, assets are permanently inaccessible. No recovery possible.',
  'ledger': 'Self-custody. If seed phrase lost, assets are permanently inaccessible. No recovery possible.',
  'other': 'Policy varies. Most exchanges freeze accounts and require extensive documentation.'
}

export interface ReportData {
  snapshotId: string
  completenessScore: number
  estimatedProbateCost: number
  estimatedTimeline: string
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  gaps: GapItem[]
  recommendations: string[]
  stateSpecificNotes: string
}

export interface GapItem {
  category: string
  severity: 'warning' | 'danger' | 'info'
  description: string
  estimatedImpact: string
}

export function generateReport(snapshot: any): ReportData {
  const stateData = stateProbateData[snapshot.state.toLowerCase()] || stateProbateData['default']
  
  let score = 0
  const gaps: any[] = []
  const recommendations: string[] = []
  
  // scoring logic - arbitrary but directionally correct
  if (snapshot.hasWill) score += 20
  if (snapshot.hasTrust) score += 25
  if (snapshot.bankAccounts > 0) score += 10
  if (snapshot.cryptoWallets.length > 0) score += 5 // crypto actually complicates things
  if (snapshot.insurancePolicies > 0) score += 10
  if (snapshot.realEstate > 0) score += 10
  if (snapshot.digitalAssets.length > 0) score += 5
  
  // gaps
  if (!snapshot.hasWill) {
    gaps.push({
      category: 'Legal Structure',
      severity: 'danger',
      description: 'No will on file. State will determine asset distribution via intestacy laws.',
      estimatedImpact: 'Assets may not go to intended heirs. Court appoints guardian for minor children.'
    })
    recommendations.push('Create a will immediately. Use LegalZoom or consult attorney.')
  }
  
  if (!snapshot.hasTrust && snapshot.realEstate > 0) {
    gaps.push({
      category: 'Real Estate',
      severity: 'warning',
      description: 'Real estate without trust will require probate.',
      estimatedImpact: `Probate costs: $${stateData.averageCost.toLocaleString()}. Timeline: ${stateData.averageTimeline}.`
    })
    recommendations.push('Consider a revocable living trust to avoid probate on real estate.')
  }
  
  if (snapshot.cryptoWallets.length > 0) {
    gaps.push({
      category: 'Digital Assets',
      severity: 'danger',
      description: `${snapshot.cryptoWallets.length} crypto wallet(s) detected. Self-custody wallets are permanently lost if keys are not documented.`,
      estimatedImpact: '100% loss of crypto assets if private keys/seed phrases are not securely stored and accessible to heirs.'
    })
    recommendations.push('Document all private keys and seed phrases in a secure physical location. Consider a digital asset trust.')
  }
  
  if (snapshot.digitalAssets.includes('social-media')) {
    gaps.push({
      category: 'Digital Legacy',
      severity: 'info',
      description: 'Social media accounts have no clear inheritance pathway.',
      estimatedImpact: 'Accounts may be memorialized, deleted, or locked indefinitely depending on platform policy.'
    })
    recommendations.push('Use platform legacy contact features (Facebook, Google) or document wishes.')
  }
  
  if (snapshot.bankAccounts > 3) {
    gaps.push({
      category: 'Account Complexity',
      severity: 'warning',
      description: `${snapshot.bankAccounts} bank accounts detected. Heirs may not know all accounts exist.`,
      estimatedImpact: 'Unclaimed assets escheat to state after 3-5 years of inactivity.'
    })
    recommendations.push('Consolidate accounts where possible. Maintain a master list accessible to executor.')
  }
  
  // risk level
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
  if (score < 30) riskLevel = 'critical'
  else if (score < 50) riskLevel = 'high'
  else if (score < 70) riskLevel = 'medium'
  
  return {
    snapshotId: snapshot.id,
    completenessScore: score,
    estimatedProbateCost: stateData.averageCost,
    estimatedTimeline: stateData.averageTimeline,
    riskLevel,
    gaps,
    recommendations,
    stateSpecificNotes: stateData.notes
  }
}
