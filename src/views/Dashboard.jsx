import StatCard from '../components/StatCard';
import SocChart from '../components/SocChart';
import { useApi } from '../hooks/useApi';

export default function Dashboard() {
  const { data: dash, loading: l1 } = useApi('/fleet/dashboard', []);
  const { data: alerts, loading: l2 } = useApi('/fleet/alerts/active', []);

  if (l1 || l2) return (
    <div className="text-center py-20 text-gray-500">
      <i className="fas fa-spinner fa-spin text-2xl mb-2 block"></i>Loading Fleet Data...
    </div>
  );
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-200">Fleet Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon="fas fa-car" label="Total Vehicles" value={dash?.total_vehicles || 0} color="#94a3b8" />
        <StatCard icon="fas fa-road" label="Active Driving" value={dash?.active_driving || 0} color="#10b981" />
        <StatCard icon="fas fa-bolt" label="Active Charging" value={dash?.active_charging || 0} color="#3b82f6" />
        <StatCard icon="fas fa-battery-three-quarters" label="Avg SOC" value={dash?.avg_soc?.toFixed(1)} color="#f59e0b" />
        <StatCard icon="fas fa-temperature-half" label="Avg Temp" value={dash?.avg_temp?.toFixed(1)} color="#ef4444" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">State of Charge Distribution</h3>
          <SocChart distribution={dash?.soc_distribution} />
        </div>
        <div className="card p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Active Alerts</h3>
          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
            {(!alerts || alerts.length === 0) && <p className="text-sm text-gray-600">No active anomalies</p>}
            {alerts?.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-2 bg-gray-900/50 rounded">
                <span className={`badge mt-0.5 ${a.severity === 'critical' ? 'badge-crit' : 'badge-warn'}`}>
                  {a.severity === 'critical' ? 'CRIT' : 'WARN'}
                </span>
                <div>
                  <p className="text-sm text-gray-200">{a.message}</p>
                  <p className="text-xs text-gray-500 font-mono">{a.vehicle_id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}