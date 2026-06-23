import { supplierRiskDetailData } from '../data/reportData';
import ReportLayout from './ReportLayout';

interface ReportProps {
  onBack: () => void;
}

export default function SupplierRiskDetail({ onBack }: ReportProps) {
  return (
    <ReportLayout title="供應商風險明細" description="來源：良率、交期、材料、製程與檢驗異動加權風險分數。" onBack={onBack}>
      {(supplierId) => {
        const rows = supplierRiskDetailData.filter((row) => row.supplierId === supplierId);
        const row = rows[0];

        return (
          <>
            {row && (
              <div className="risk-breakdown">
                <div className="risk-total">
                  <span>總風險分數</span>
                  <strong>{row.totalRiskScore}</strong>
                </div>
                <div className="risk-score-list">
                  {[
                    ['良率', row.yieldRiskScore],
                    ['交期', row.deliveryRiskScore],
                    ['材料', row.materialRiskScore],
                    ['製程', row.processRiskScore],
                    ['檢驗', row.inspectorRiskScore],
                  ].map(([label, score]) => (
                    <div className="score-row" key={label}>
                      <span>{label}</span>
                      <div><i style={{ width: `${Number(score) * 2}%` }} /></div>
                      <strong>{score}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>供應商</th><th>總分</th><th>良率</th><th>交期</th><th>材料</th><th>製程</th><th>檢驗</th><th>AI 原因</th><th>建議處置</th></tr>
                </thead>
                <tbody>
                  {rows.map((risk) => (
                    <tr key={risk.supplierId}>
                      <td>{risk.supplierName}</td><td>{risk.totalRiskScore}</td><td>{risk.yieldRiskScore}</td><td>{risk.deliveryRiskScore}</td><td>{risk.materialRiskScore}</td><td>{risk.processRiskScore}</td><td>{risk.inspectorRiskScore}</td><td>{risk.aiReason}</td><td>{risk.suggestedAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      }}
    </ReportLayout>
  );
}
