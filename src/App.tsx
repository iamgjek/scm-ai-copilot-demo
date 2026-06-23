import { useState } from 'react';
import ChatPanel, { welcomeMessage, type ChatMessage } from './components/ChatPanel';
import DeliveryReport from './components/DeliveryReport';
import InsightPanel from './components/InsightPanel';
import InspectorReport from './components/InspectorReport';
import MaterialReport from './components/MaterialReport';
import ProcessReport from './components/ProcessReport';
import SupplierRiskDetail from './components/SupplierRiskDetail';
import SupplierCard from './components/SupplierCard';
import YieldReport from './components/YieldReport';
import { suppliers } from './data/mockData';
import type { ReportView } from './data/reportData';

export default function App() {
  const [currentView, setCurrentView] = useState<ReportView>('dashboard');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const goBackToDashboard = () => setCurrentView('dashboard');

  if (currentView === 'yieldReport') {
    return <YieldReport onBack={goBackToDashboard} />;
  }

  if (currentView === 'deliveryReport') {
    return <DeliveryReport onBack={goBackToDashboard} />;
  }

  if (currentView === 'materialReport') {
    return <MaterialReport onBack={goBackToDashboard} />;
  }

  if (currentView === 'processReport') {
    return <ProcessReport onBack={goBackToDashboard} />;
  }

  if (currentView === 'inspectorReport') {
    return <InspectorReport onBack={goBackToDashboard} />;
  }

  if (currentView === 'supplierRiskDetail') {
    return <SupplierRiskDetail onBack={goBackToDashboard} />;
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Pre-Sales Demo</p>
          <h1>智能協同生產監控平台 AI Copilot</h1>
        </div>
        <div className="topbar__meta">
          <span>Mock Data</span>
          <span>無後端串接</span>
        </div>
      </header>

      <section className="dashboard-layout">
        <aside className="panel supplier-panel" aria-label="供應商風險">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Supplier Risk</p>
              <h2>供應商風險卡片</h2>
            </div>
            <span className="count-pill">{suppliers.length} 家</span>
          </div>

          <div className="supplier-list">
            {suppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </aside>

        <ChatPanel
          messages={chatMessages}
          onMessagesChange={setChatMessages}
          onOpenReport={setCurrentView}
        />
        <InsightPanel />
      </section>
    </main>
  );
}
