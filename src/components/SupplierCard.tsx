import type { Supplier } from '../data/mockData';

interface SupplierCardProps {
  supplier: Supplier;
}

const riskLabelMap = {
  High: 'High Risk',
  Medium: 'Medium Risk',
  Low: 'Low Risk',
};

export default function SupplierCard({ supplier }: SupplierCardProps) {
  const productionRate = Math.round((supplier.productionQuantity / supplier.plannedQuantity) * 100);

  return (
    <article className="supplier-card">
      <div className="supplier-card__header">
        <div>
          <p className="supplier-card__id">{supplier.id}</p>
          <h3>{supplier.name}</h3>
        </div>
        <span className={`risk-badge risk-badge--${supplier.riskLevel.toLowerCase()}`}>
          {riskLabelMap[supplier.riskLevel]}
        </span>
      </div>

      <div className="supplier-card__metrics">
        <div>
          <span>良率</span>
          <strong>{supplier.yieldRate.toFixed(1)}%</strong>
          <small>目標 {supplier.targetYield.toFixed(1)}%</small>
        </div>
        <div>
          <span>產量達成</span>
          <strong>{productionRate}%</strong>
          <small>
            {supplier.productionQuantity.toLocaleString()} / {supplier.plannedQuantity.toLocaleString()}
          </small>
        </div>
      </div>

      <div className="supplier-card__status">
        <span>{supplier.deliveryStatus}</span>
        <span>{supplier.delayDays > 0 ? `延遲 ${supplier.delayDays} 天` : '無延遲'}</span>
      </div>

      <p className="supplier-card__summary">{supplier.aiSummary}</p>
    </article>
  );
}
