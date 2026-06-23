import { processParameterData } from '../data/reportData';
import ReportLayout from './ReportLayout';

interface ReportProps {
  onBack: () => void;
}

export default function ProcessReport({ onBack }: ReportProps) {
  return (
    <ReportLayout title="製程參數報表" description="來源：製程參數變更紀錄、設備機台與簽核狀態。" onBack={onBack}>
      {(supplierId) => {
        const rows = processParameterData.filter((row) => row.supplierId === supplierId);
        const pendingCount = rows.filter((row) => row.approvalStatus === 'Pending').length;

        return (
          <>
            <div className="kpi-grid">
              <div><span>參數異動</span><strong>{rows.length}</strong></div>
              <div><span>Pending</span><strong>{pendingCount}</strong></div>
              <div><span>涉及機台</span><strong>{new Set(rows.map((row) => row.machineNo)).size}</strong></div>
              <div><span>待確認製程</span><strong>{new Set(rows.map((row) => row.processName)).size}</strong></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>製程</th><th>機台</th><th>參數</th><th>標準值</th><th>實際值</th><th>異動時間</th><th>異動人</th><th>簽核</th></tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.supplierId}-${row.processName}-${row.machineNo}`}>
                      <td>{row.processName}</td><td>{row.machineNo}</td><td>{row.parameterName}</td><td>{row.standardValue}</td><td>{row.actualValue}</td><td>{row.changedAt}</td><td>{row.changedBy}</td><td><span className="table-badge table-badge--warn">{row.approvalStatus}</span></td>
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
