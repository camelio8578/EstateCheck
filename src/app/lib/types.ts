// types - keeping this simple, no fancy patterns

export interface EstateSnapshot {
  id: string
  email: string
  state: string
  hasWill: boolean | null
  hasTrust: boolean | null
  bankAccounts: number
  cryptoWallets: string[]
  insurancePolicies: number
  realEstate: number
  digitalAssets: string[]
  dependents: number
  createdAt: string
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

// a full report bundles one or more snapshots with their generated analysis
export interface EstateReport {
  id: string
  snapshots: EstateSnapshot[]
  reports: ReportData[]
  createdAt: string
}

// generic envelope returned by the API routes
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// state probate data - rough estimates, real lawyers would charge $500/hr for this
export interface StateProbateInfo {
  state: string
  averageCost: number
  averageTimeline: string
  hasSmallEstate: boolean
  smallEstateThreshold: number
  notes: string
}

// a full report bundles one or more snapshots with their generated analysis
export interface EstateReport {
  id: string
  snapshots: EstateSnapshot[]
  reports: ReportData[]
  createdAt: string
}

// generic envelope returned by the API routes
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
