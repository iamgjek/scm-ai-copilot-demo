import { materialChangeData } from '../data/reportData';
import ReportLayout from './ReportLayout';

interface ReportProps {
  onBack: () => void;
}

export default function MaterialReport({ onBack }: ReportProps) {
  return (
    <ReportLayout title="材料異動報表" description="來源：BOM 指定品牌、現場投料品牌、批號與變更簽核紀錄。" onBack={onBack}>
      {(supplierId) => {
        const rows = materialChangeData.filter((row) => row.supplierId === supplierId);
        const pendingCount = rows.filter((row) => row.approvalStatus === 'Pending').length;
        const mismatchCount = rows.filter((row) => row.bomBrand !== row.actualBrand).length;

        return (
          <>
            <div className="kpi-grid">
              <div><span>品牌不一致</span><strong>{mismatchCount}</strong></div>
              <div><span>Pending</span><strong>{pendingCount}</strong></div>
              <div><span>材料批次</span><strong>{rows.length}</strong></div>
              <div><span>高風險項</span><strong>{rows.filter((row) => row.riskNote.includes('不一致')).length}</strong></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>料號</th><th>材料</th><th>BOM 品牌</th><th>實際品牌</th><th>批號</th><th>異動日</th><th>簽核</th><th>風險說明</th></tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.supplierId}-${row.itemNo}`}>
                      <td>{row.itemNo}</td><td>{row.materialName}</td><td>{row.bomBrand}</td><td>{row.actualBrand}</td><td>{row.lotNo}</td><td>{row.changeDate}</td><td><span className="table-badge table-badge--warn">{row.approvalStatus}</span></td><td>{row.riskNote}</td>
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
