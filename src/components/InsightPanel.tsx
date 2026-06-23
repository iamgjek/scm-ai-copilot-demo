import { suppliers } from '../data/mockData';

export default function InsightPanel() {
  const highRiskCount = suppliers.filter((supplier) => supplier.riskLevel === 'High').length;
  const yieldIssueCount = suppliers.filter((supplier) => supplier.yieldRate < supplier.targetYield).length;
  const delayedCount = suppliers.filter((supplier) => supplier.delayDays > 0).length;
  const changeCount = suppliers.filter(
    (supplier) => supplier.materialChanges.length > 0 || supplier.processChanges.length > 0,
  ).length;
  const averageYield =
    suppliers.reduce((sum, supplier) => sum + supplier.yieldRate, 0) / suppliers.length;

  return (
    <aside className="panel insight-panel" aria-label="AI Insight">
      <div className="panel__header">
        <div>
          <p className="eyebrow">AI Insight</p>
          <h2>營運分析</h2>
        </div>
      </div>

      <div className="insight-score">
        <span>平均良率</span>
        <strong>{averageYield.toFixed(1)}%</strong>
        <p>目前有 {yieldIssueCount} 家供應商低於目標良率。</p>
      </div>

      <div className="insight-grid">
        <div>
          <span>高風險</span>
          <strong>{highRiskCount}</strong>
        </div>
        <div>
          <span>交期延遲</span>
          <strong>{delayedCount}</strong>
        </div>
        <div>
          <span>變更事件</span>
          <strong>{changeCount}</strong>
        </div>
        <div>
          <span>追蹤供應商</span>
          <strong>{suppliers.length}</strong>
        </div>
      </div>

      <div className="insight-section">
        <h3>優先處理建議</h3>
        <ul>
          <li>ABC Electronics 同時出現高風險、延遲與變更事件，建議安排供應商品質會議。</li>
          <li>JKL Assembly 良率與產量低於計畫，需追蹤測試程式更新後的重測率。</li>
          <li>DEF Manufacturing 延遲 1 天，可要求補交計畫並監控治具校正狀態。</li>
        </ul>
      </div>

      <div className="insight-section">
        <h3>變更觀察</h3>
        <p>
          本週材料與製程變更集中於 ABC Electronics、JKL Assembly 與 MNO Technology，
          建議比對變更前後的良率與異常項目，確認是否需要重新設定檢驗規格。
        </p>
      </div>
    </aside>
  );
}
