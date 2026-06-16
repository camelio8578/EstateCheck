export interface EstateSnapshot {
  id: string;
  timestamp: Date;
  address: string;
  propertyValue: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  features: string[];
  notes?: string;
}

export interface EstateReport {
  id: string;
  snapshots: EstateSnapshot[];
  generatedAt: Date;
  summary: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
