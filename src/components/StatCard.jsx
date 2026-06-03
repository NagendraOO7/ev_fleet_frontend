export default function StatCard({ icon, label, value, color }) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3 mb-2">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center" 
          style={{ background: color + '20', color }}
        >
          <i className={`${icon} text-lg`}></i>
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold tracking-tight" style={{ color }}>
        {value !== null ? value : '—'}
      </div>
    </div>
  );
}