export default function Layout({ view, setView, children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-900/50 border-r border-gray-800 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
            <i className="fas fa-bolt text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">EV Fleet</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Command Center</p>
          </div>
        </div>
        
        <nav className="space-y-2 flex-1">
          {[
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
            { id: 'vehicles', icon: 'fa-car', label: 'Vehicles' }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)} 
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition ${view === item.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}
            >
              <i className={`fas ${item.icon} w-5`}></i> {item.label}
            </button>
          ))}
        </nav>
        
        <div className="text-xs text-gray-600 text-center mt-auto pt-6 border-t border-gray-800">
          System Status: Online<br/>
          <span className="text-emerald-500">●</span> Connected to DB
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}