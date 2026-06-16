'use client';

import React from 'react';
import { EstateReport } from '../lib/types';
import { formatDate, formatCurrency } from '../lib/utils';
import { Download } from 'lucide-react';

interface ReportViewProps {
  report?: EstateReport;
}

export const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  if (!report) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">No reports available yet. Create a snapshot to get started.</p>
        </div>
      </section>
    );
  }

  const handleDownload = () => {
    const reportText = `
ESTATE ASSESSMENT REPORT
Generated: ${formatDate(report.generatedAt)}

Summary:
${report.summary}

Snapshots:
${report.snapshots.map((s, i) => `
${i + 1}. ${s.address}
   Date: ${formatDate(s.timestamp)}
   Value: ${formatCurrency(s.propertyValue)}
   Condition: ${s.condition.toUpperCase()}
   Features: ${s.features.join(', ')}
   Notes: ${s.notes || 'N/A'}
`).join('')}
    `.trim();

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportText));
    element.setAttribute('download', `estate-report-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Estate Assessment Report</h2>
              <p className="text-gray-600 mt-2">Generated: {formatDate(report.generatedAt)}</p>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>

          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-700">{report.summary}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Snapshots</h3>
            <div className="space-y-6">
              {report.snapshots.map((snapshot, index) => (
                <div key={snapshot.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">#{index + 1} {snapshot.address}</h4>
                      <p className="text-sm text-gray-600 mt-1">{formatDate(snapshot.timestamp)}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                      snapshot.condition === 'excellent' ? 'bg-green-100 text-green-800' :
                      snapshot.condition === 'good' ? 'bg-blue-100 text-blue-800' :
                      snapshot.condition === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {snapshot.condition.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Property Value</p>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(snapshot.propertyValue)}</p>
                    </div>
                  </div>
                  
                  {snapshot.features.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Features</p>
                      <div className="flex flex-wrap gap-2">
                        {snapshot.features.map((feature, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {snapshot.notes && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Notes</p>
                      <p className="text-gray-700">{snapshot.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
