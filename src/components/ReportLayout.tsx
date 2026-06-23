import { useMemo, useState, type ReactNode } from 'react';
import { suppliers } from '../data/mockData';

interface ReportLayoutProps {
  title: string;
  description: string;
  children: (supplierId: string) => ReactNode;
  onBack: () => void;
}

export default function ReportLayout({ title, description, children, onBack }: ReportLayoutProps) {
  const [supplierId, setSupplierId] = useState('SUP-001');
  const supplierOptions = useMemo(
    () => suppliers.map((supplier) => ({ id: supplier.id, name: supplier.name })),
    [],
  );

  return (
    <main className="app-shell report-shell">
      <header className="topbar report-topbar">
        <button className="back-button" type="button" onClick={onBack}>
          返回 AI Copilot
        </button>
        <div>
          <p className="eyebrow">Report Drill Down</p>
          <h1>{title}</h1>
        </div>
        <div className="topbar__meta">
          <span>Mock Data</span>
          <span>資料區間 2026/06/10 - 2026/06/17</span>
        </div>
      </header>

      <section className="panel report-panel">
        <div className="report-toolbar">
          <div>
            <p className="eyebrow">Data Source</p>
            <p>{description}</p>
          </div>
          <label>
            <span>供應商篩選</span>
            <select value={supplierId} onChange={(event) => setSupplierId(event.target.value)}>
              {supplierOptions.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {children(supplierId)}
      </section>
    </main>
  );
}
