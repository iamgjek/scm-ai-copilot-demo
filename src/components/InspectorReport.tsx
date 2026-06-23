import { inspectorChangeData } from '../data/reportData';
import ReportLayout from './ReportLayout';

interface ReportProps {
  onBack: () => void;
}

export default function InspectorReport({ onBack }: ReportProps) {
  return (
    <ReportLayout title="檢驗人員異動報表" description="來源：檢驗站別、人員異動與交接確認紀錄。" onBack={onBack}>
      {(supplierId) => {
        const rows = inspectorChangeData.filter((row) => row.supplierId === supplierId);
        const notConfirmed = rows.filter((row) => row.handoverStatus === 'Not Confirmed').length;

        return (
          <>
            <div className="kpi-grid">
              <div><span>異動筆數</span><strong>{rows.length}</strong></div>
              <div><span>未確認交接</span><strong>{notConfirmed}</strong></div>
              <div><span>檢驗站別</span><strong>{new Set(rows.map((row) => row.inspectionStation)).size}</strong></div>
              <div><span>風險提示</span><strong>{rows.length}</strong></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>檢驗站</th><th>前任檢驗員</th><th>現任檢驗員</th><th>異動日</th><th>交接狀態</th><th>風險說明</th></tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.supplierId}-${row.inspectionStation}`}>
                      <td>{row.inspectionStation}</td><td>{row.previousInspector}</td><td>{row.currentInspector}</td><td>{row.changedDate}</td><td><span className="table-badge table-badge--warn">{row.handoverStatus}</span></td><td>{row.riskNote}</td>
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
