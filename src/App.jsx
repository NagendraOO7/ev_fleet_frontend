import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import VehicleList from './views/VehicleList';
import VehicleDetailModal from './views/VehicleDetailModal';

export default function App() {
  const [view, setView] = useState('dashboard');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <Layout view={view} setView={setView}>
      {view === 'dashboard' && <Dashboard />}
      {view === 'vehicles' && <VehicleList onSelect={(v) => setSelectedVehicle(v)} />}
      {selectedVehicle && <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
    </Layout>
  );
}