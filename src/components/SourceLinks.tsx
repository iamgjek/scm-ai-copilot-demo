import type { ReportSource, ReportView } from '../data/reportData';

interface SourceLinksProps {
  sources: ReportSource[];
  onOpenReport: (view: ReportView) => void;
}

export default function SourceLinks({ sources, onOpenReport }: SourceLinksProps) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="source-links">
      <span>資料來源：</span>
      <div>
        {sources.map((source) => (
          <button key={source.view} type="button" onClick={() => onOpenReport(source.view)}>
            {source.label}
          </button>
        ))}
      </div>
    </div>
  );
}
