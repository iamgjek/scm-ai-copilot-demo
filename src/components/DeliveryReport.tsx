import { deliveryReportData } from '../data/reportData';
import ReportLayout from './ReportLayout';

interface ReportProps {
  onBack: () => void;
}

export default function DeliveryReport({ onBack }: ReportProps) {
  return (
    <ReportLayout title="交期異常報表" description="來源：採購 PO、需求日、承諾日與實際到貨紀錄。" onBack={onBack}>
      {(supplierId) => {
        const rows = deliveryReportData.filter((row) => row.supplierId === supplierId);
        const delayedRows = rows.filter((row) => row.delayDays > 0);
        const avgDelay = delayedRows.reduce((sum, row) => sum + row.delayDays, 0) / (delayedRows.length || 1);
        const maxDelay = Math.max(0, ...rows.map((row) => row.delayDays));

        return (
          <>
            <div className="kpi-grid">
              <div><span>延遲 PO 數</span><strong>{delayedRows.length}</strong></div>
              <div><span>平均延遲天數</span><strong>{avgDelay.toFixed(1)}</strong></div>
              <div><span>最長延遲天數</span><strong>{maxDelay}</strong></div>
              <div><span>追蹤 PO</span><strong>{rows.length}</strong></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>PO</th><th>品項</th><th>數量</th><th>需求日</th><th>承諾日</th><th>實際日</th><th>延遲</th><th>狀態</th></tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.poNo}>
                      <td>{row.poNo}</td><td>{row.itemName}</td><td>{row.orderQty.toLocaleString()}</td><td>{row.requiredDate}</td><td>{row.promisedDate}</td><td>{row.actualDate}</td><td>{row.delayDays} 天</td><td><span className="table-badge">{row.status}</span></td>
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
