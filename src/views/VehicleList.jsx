import { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { useApi } from '../hooks/useApi';

export default function VehicleList({ onSelect }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading } = useApi(`/vehicles?search=${search}&page=${page}&limit=20`, [search, page]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-200">Vehicle Fleet</h2>
        <div className="relative w-72">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
          <input 
            type="text" placeholder="Search by Make, Model, or ID..." 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-emerald-500"
            value={search} 
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {loading && <div className="text-center py-10 text-gray-500">Loading...</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.data?.map(v => (
          <VehicleCard key={v._id} vehicle={v} onSelect={onSelect} />
        ))}
      </div>

      {data?.pagination && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <span>Page {data.pagination.page} of {data.pagination.pages}</span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)} 
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 hover:bg-gray-700"
            >
              Prev
            </button>
            <button 
              disabled={page === data.pagination.pages} 
              onClick={() => setPage(p => p + 1)} 
              className="px-3 py-1 bg-gray-800 rounded disabled:opacity-30 hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}