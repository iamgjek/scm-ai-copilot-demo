import { yieldTrendData } from '../data/reportData';
import ReportLayout from './ReportLayout';

interface ReportProps {
  onBack: () => void;
}

export default function YieldReport({ onBack }: ReportProps) {
  return (
    <ReportLayout
      title="良率趨勢報表"
      description="來源：MES 每日生產良率、NG 數與主要缺陷分類。"
      onBack={onBack}
    >
      {(supplierId) => {
        const rows = yieldTrendData.filter((row) => row.supplierId === supplierId);
        const avgYield = rows.reduce((sum, row) => sum + row.yieldRate, 0) / (rows.length || 1);
        const targetYield = rows[0]?.targetYield ?? 0;
        const totalNg = rows.reduce((sum, row) => sum + row.ngQty, 0);
        const belowTargetDays = rows.filter((row) => row.yieldRate < row.targetYield).length;

        return (
          <>
            <div className="kpi-grid">
              <div><span>平均良率</span><strong>{avgYield.toFixed(1)}%</strong></div>
              <div><span>目標良率</span><strong>{targetYield.toFixed(1)}%</strong></div>
              <div><span>NG 數</span><strong>{totalNg}</strong></div>
              <div><span>低於目標天數</span><strong>{belowTargetDays}</strong></div>
            </div>

            <div className="report-chart">
              {rows.map((row) => (
                <div className="chart-bar" key={`${row.supplierId}-${row.date}`}>
                  <div style={{ height: `${Math.max((row.yieldRate - 88) * 8, 12)}px` }} />
                  <span>{row.date}</span>
                  <strong>{row.yieldRate.toFixed(1)}%</strong>
                </div>
              ))}
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>日期</th><th>供應商</th><th>良率</th><th>目標</th><th>產量</th><th>NG 數</th><th>主要缺陷</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.supplierId}-${row.date}`}>
                      <td>{row.date}</td><td>{row.supplierName}</td><td>{row.yieldRate.toFixed(1)}%</td><td>{row.targetYield.toFixed(1)}%</td><td>{row.productionQty.toLocaleString()}</td><td>{row.ngQty}</td><td>{row.majorDefect}</td>
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
