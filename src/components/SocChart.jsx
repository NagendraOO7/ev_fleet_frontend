import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function SocChart({ distribution }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !distribution) return;
    if (chartRef.current) chartRef.current.destroy();

    const labels = ['0-10','10-20','20-30','30-40','40-50','50-60','60-70','70-80','80-90','90-100','100+'];
    const values = labels.map((l, i) => 
      (distribution.find(d => String(d._id) === (i < 10 ? String(i * 10) : l)) || {}).count || 0
    );
    
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: { 
        labels, 
        datasets: [{ data: values, backgroundColor: '#10b981', borderRadius: 4 }] 
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } }, 
        scales: { 
          x: { grid: { display: false }, ticks: { color: '#6b7280' } }, 
          y: { grid: { color: '#1f2937' }, ticks: { color: '#6b7280' } } 
        } 
      }
    });
  }, [distribution]);

  return <div style={{ height: '250px' }}><canvas ref={canvasRef}></canvas></div>;
}