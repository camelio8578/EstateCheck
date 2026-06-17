'use client'

import { AlertTriangle, CheckCircle, Info, Clock, DollarSign, Shield, ArrowRight, Download } from 'lucide-react'
import { generateReport } from '../lib/utils'

export default function ReportView({ snapshot }: { snapshot: any }) {
  const report = generateReport(snapshot)
  
  const riskColors = {
    low: 'bg-emerald-100 text-emerald-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-rust-100 text-rust-800',
  }
  
  const severityIcons = {
    warning: <AlertTriangle className="w-5 h-5 text-amber-600" />,
    danger: <AlertTriangle className="w-5 h-5 text-rust-600" />,
    info: <Info className="w-5 h-5 text-stone-500" />,
  }
  
  return (
    <section id="report" className="py-16 bg-stone-100">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-stone-900 mb-2">
            Your estate snapshot report
          </h2>
          <p className="text-stone-600">
            Generated {new Date().toLocaleDateString()}
          </p>
        </div>
        
        {/* score card */}
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                Completeness Score
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-serif text-stone-900">
                  {report.completenessScore}
                </span>
                <span className="text-stone-400">/ 100</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-sm text-sm font-medium ${riskColors[report.riskLevel as keyof typeof riskColors]}`}>
              {report.riskLevel.toUpperCase()} RISK
            </div>
          </div>
          
          {/* score bar */}
          <div className="w-full bg-stone-200 h-3 rounded-full mb-6">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                report.completenessScore < 30 ? 'bg-rust-500' :
                report.completenessScore < 50 ? 'bg-orange-500' :
                report.completenessScore < 70 ? 'bg-amber-500' :
                'bg-emerald-500'
              }`}
              style={{ width: `${report.completenessScore}%` }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-200">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-stone-500 mt-0.5" />
              <div>
                <p className="text-sm text-stone-500">Est. probate cost</p>
                <p className="text-lg font-medium text-stone-900">
                  ${report.estimatedProbateCost.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-stone-500 mt-0.5" />
              <div>
                <p className="text-sm text-stone-500">Est. timeline</p>
                <p className="text-lg font-medium text-stone-900">
                  {report.estimatedTimeline}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* state notes */}
        <div className="card mb-6 bg-stone-50 border-stone-300">
          <p className="text-sm text-stone-600">
            <span className="font-medium text-stone-900">State note:</span> {report.stateSpecificNotes}
          </p>
        </div>
        
        {/* gaps */}
        <h3 className="text-lg font-medium text-stone-900 mb-4">
          Critical gaps found
        </h3>
        
        <div className="space-y-4 mb-10">
          {report.gaps.map((gap: any, i: number) => (
            <div key={i} className="card border-l-4 border-l-rust-500">
              <div className="flex items-start gap-3">
                {severityIcons[gap.severity as keyof typeof severityIcons]}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-stone-900">{gap.category}</h4>
                    <span className={`text-xs px-2 py-1 rounded-sm ${
                      gap.severity === 'danger' ? 'bg-rust-100 text-rust-700' :
                      gap.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      {gap.severity}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 mb-2">{gap.description}</p>
                  <p className="text-sm text-stone-500">
                    <span className="font-medium">Impact:</span> {gap.estimatedImpact}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {report.gaps.length === 0 && (
            <div className="card bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <p className="text-emerald-800 font-medium">
                  No critical gaps found. Your estate appears well-structured.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* recommendations */}
        <h3 className="text-lg font-medium text-stone-900 mb-4">
          Recommendations
        </h3>
        
        <div className="card mb-10">
          <ol className="space-y-3">
            {report.recommendations.map((rec: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-sm font-medium shrink-0">
                  {i + 1}
                </span>
                <p className="text-sm text-stone-700 pt-0.5">{rec}</p>
              </li>
            ))}
          </ol>
        </div>
        
        {/* CTA */}
        <div className="card bg-stone-800 text-stone-50 border-stone-800">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-stone-400 mt-1" />
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-2">
                Get the full estate vault
              </h3>
              <p className="text-stone-400 text-sm mb-4">
                Store all account details, documents, and instructions in one secure place. 
                Update anytime. Your family gets access only when needed.
              </p>
              <ul className="space-y-2 mb-6 text-sm text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Secure document storage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Automated institution notifications
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Jurisdiction-specific probate guides
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Crypto asset recovery instructions
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-stone-50 text-stone-900 px-6 py-3 rounded-sm font-medium text-sm hover:bg-white transition-colors inline-flex items-center justify-center gap-2">
                  Start free trial
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-stone-600 text-stone-300 px-6 py-3 rounded-sm font-medium text-sm hover:border-stone-400 transition-colors inline-flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF report
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* disclaimer */}
        <p className="text-xs text-stone-400 text-center mt-8">
          This report is for informational purposes only and does not constitute legal advice. 
          Estate laws vary by jurisdiction and change frequently. Consult a licensed attorney in your state.
        </p>
      </div>
    </section>
  )
}
