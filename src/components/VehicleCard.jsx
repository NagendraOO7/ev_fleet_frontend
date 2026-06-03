export default function VehicleCard({ vehicle, onSelect }) {
  const t = vehicle.latest_telemetry;
  const statusColor = t?.charging_status === 'driving' ? 'bg-emerald-500' : 
                      t?.charging_status === 'charging' ? 'bg-blue-500' : 'bg-gray-600';

  return (
    <div 
      onClick={() => onSelect(vehicle)} 
      className="card p-4 cursor-pointer hover:border-emerald-500/30 transition-all"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm font-bold text-emerald-400">{vehicle.id}</span>
        <div className={`w-2.5 h-2.5 rounded-full ${statusColor} ${t?.charging_status === 'driving' ? 'animate-pulse' : ''}`}></div>
      </div>
      <p className="font-medium text-gray-200">{vehicle.make} {vehicle.model}</p>
      <p className="text-xs text-gray-500 mb-3">{vehicle.battery_capacity_kwh} kWh Battery</p>
      
      {t ? (
        <div className="grid grid-cols-3 gap-2 border-t border-gray-800 pt-3">
          <div><p className="text-[10px] text-gray-500">SOC</p><p className="text-sm font-bold">{t.soc_pct.toFixed(1)}%</p></div>
          <div><p className="text-[10px] text-gray-500">Speed</p><p className="text-sm font-bold">{t.speed_kph} <span className="text-[10px] font-normal text-gray-500">km/h</span></p></div>
          <div><p className="text-[10px] text-gray-500">Temp</p><p className="text-sm font-bold">{t.battery_temp_c.toFixed(1)}°C</p></div>
        </div>
      ) : (
        <p className="text-xs text-gray-600 pt-3 border-t border-gray-800">No telemetry</p>
      )}
    </div>
  );
}