'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SnapshotForm } from './components/SnapshotForm';
import { ReportView } from './components/ReportView';
import { Footer } from './components/Footer';
import { EstateSnapshot, EstateReport } from './lib/types';

export default function Home() {
  const [snapshots, setSnapshots] = useState<EstateSnapshot[]>([]);
  const [report, setReport] = useState<EstateReport | undefined>();

  const handleSnapshotSubmit = (snapshot: EstateSnapshot) => {
    const updatedSnapshots = [...snapshots, snapshot];
    setSnapshots(updatedSnapshots);
    
    // Generate report
    setReport({
      id: Date.now().toString(),
      snapshots: updatedSnapshots,
      generatedAt: new Date(),
      summary: `Estate assessment report containing ${updatedSnapshots.length} property snapshot(s).`,
    });
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SnapshotForm onSubmit={handleSnapshotSubmit} />
      {snapshots.length > 0 && <ReportView report={report} />}
      <Footer />
    </main>
  );
}
