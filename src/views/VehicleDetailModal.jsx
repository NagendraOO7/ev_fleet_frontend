import { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useApi } from '../hooks/useApi';

export default function VehicleDetailModal({ vehicle, onClose }) {
  const [tab, setTab] = useState('info');
  const { data: latest } = useApi(`/vehicles/${vehicle._id}/latest`, []);
  const { data: telemetry } = useApi(`/vehicles/${vehicle._id}/telemetry?limit=1000`, []);
  const { data: trips } = useApi(`/vehicles/${vehicle._id}/trips`, []);
  
  const chartRef = useRef(null);
  const chartInst = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !telemetry?.data || tab !== 'telemetry') return;
    if (chartInst.current) chartInst.current.destroy();
    
    chartInst.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: telemetry.data.map(d => new Date(d.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})),
        datasets: [
          { label: 'SOC %', data: telemetry.data.map(d => d.soc_pct), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4, yAxisID: 'y' },
          { label: 'Temp °C', data: telemetry.data.map(d => d.battery_temp_c), borderColor: '#ef4444', tension: 0.4, yAxisID: 'y1' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
        scales: {
          x: { grid: { color: '#1f2937' }, ticks: { color: '#6b7280', maxTicksLimit: 10 } },
          y: { type: 'linear', position: 'left', grid: { color: '#1f2937' }, ticks: { color: '#10b981' }, title: { display: true, text: 'SOC %', color: '#10b981' } },
          y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, ticks: { color: '#ef4444' }, title: { display: true, text: 'Temp °C', color: '#ef4444' } }
        }
      }
    });
    return () => { if(chartInst.current) chartInst.current.destroy(); };
  }, [telemetry, tab]);

  const t = latest?.telemetry;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 font-mono">{vehicle.id}</h2>
            <p className="text-gray-400">{vehicle.make} {vehicle.model} &bull; {vehicle.battery_capacity_kwh} kWh</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl"><i className="fas fa-times"></i></button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-800 pb-3">
          {['info', 'telemetry', 'trips'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-gray-300'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === 'info' && t && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {label: 'Status', val: t.charging_status, icon: 'fa-circle-check'},
              {label: 'SOC', val: `${t.soc_pct.toFixed(1)}%`, icon: 'fa-battery-three-quarters'},
              {label: 'Speed', val: `${t.speed_kph} km/h`, icon: 'fa-gauge-high'},
              {label: 'Battery Temp', val: `${t.battery_temp_c.toFixed(1)} °C`, icon: 'fa-temperature-half'},
              {label: 'Latitude', val: t.location_lat?.toFixed(4), icon: 'fa-location-dot'},
              {label: 'Longitude', val: t.location_lng?.toFixed(4), icon: 'fa-location-dot'},
            ].map((item, i) => (
              <div key={i} className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-xs text-gray-500 mb-1"><i className={`fas ${item.icon} mr-1`}></i>{item.label}</p>
                <p className="text-lg font-bold text-gray-200 capitalize">{item.val}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'telemetry' && (
          <div style={{height: '400px'}}><canvas ref={chartRef}></canvas></div>
        )}

        {tab === 'trips' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs text-gray-500 uppercase bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3">Start Time</th>
                  <th className="px-4 py-3">End Time</th>
                  <th className="px-4 py-3">Distance (km)</th>
                  <th className="px-4 py-3">Max Speed (km/h)</th>
                </tr>
              </thead>
              <tbody>
                {trips?.trips?.map((t, i) => (
                  <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-mono text-xs">{new Date(t.start_time).toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono text-xs">{new Date(t.end_time).toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">{t.distance_km}</td>
                    <td className="px-4 py-3">{t.max_speed_kph}</td>
                  </tr>
                ))}
                {trips?.trips?.length === 0 && <tr><td colSpan="4" className="px-4 py-6 text-center text-gray-600">No trips detected</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}