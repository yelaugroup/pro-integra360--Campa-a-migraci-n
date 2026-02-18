
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  FileText, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  Clock, 
  Calendar as CalendarIcon,
  ChevronRight,
  MoreVertical,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recepcion');

  const stats = [
    { title: 'Vehículos Hoy', value: '14', change: '+2', icon: Wrench, color: 'text-blue-600' },
    { title: 'Facturación Mes', value: '12.450€', change: '+15%', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Citas Pendientes', value: '8', change: '-1', icon: Clock, color: 'text-amber-600' },
    { title: 'Nuevos Clientes', value: '24', change: '+5', icon: Users, color: 'text-purple-600' },
  ];

  const recentOrders = [
    { id: 'OR-4521', client: 'Juan García', vehicle: 'Seat Leon - 4521 JPG', status: 'Reparando', priority: 'Alta' },
    { id: 'OR-4522', client: 'Marta Soler', vehicle: 'Toyota Rav4 - 8812 LMK', status: 'En espera', priority: 'Media' },
    { id: 'OR-4523', client: 'Pedro Ruiz', vehicle: 'BMW 320d - 1102 BCD', status: 'Finalizado', priority: 'Baja' },
    { id: 'OR-4524', client: 'Ana Belén', vehicle: 'Audi A3 - 9920 HGT', status: 'Reparando', priority: 'Alta' },
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-anthracite text-white hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brand-yellow rounded-lg flex items-center justify-center text-brand-anthracite font-black">PRO</div>
            <span className="font-bold tracking-tight">Integra360</span>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-white/10 text-brand-yellow">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-semibold">Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-gray-400">
            <Wrench className="w-5 h-5" />
            <span>Recepción / Taller</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-gray-400">
            <FileText className="w-5 h-5" />
            <span>Facturación</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-gray-400">
            <Users className="w-5 h-5" />
            <span>Clientes</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 transition text-gray-400">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link to="/migracion-software-taller" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition">
            <LogOut className="w-5 h-5" />
            <span>Salir de Demo</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-brand-anthracite">Resumen General</h1>
            <p className="text-gray-500 text-sm">Bienvenido de nuevo, Taller Central</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Buscar vehículo o cliente..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-brand-yellow w-64 shadow-sm" />
            </div>
            <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-black text-brand-anthracite mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-brand-anthracite flex items-center">
                <Clock className="w-5 h-5 mr-2 text-brand-yellow" /> Órdenes en Curso
              </h2>
              <button className="text-xs font-bold text-brand-anthracite hover:underline uppercase tracking-wider">Ver todas</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Referencia</th>
                    <th className="px-6 py-4 font-semibold">Cliente / Vehículo</th>
                    <th className="px-6 py-4 font-semibold">Estado</th>
                    <th className="px-6 py-4 font-semibold">Prioridad</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition cursor-pointer">
                      <td className="px-6 py-4 font-bold text-brand-anthracite">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{order.client}</span>
                          <span className="text-xs text-gray-400">{order.vehicle}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'Reparando' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'En espera' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center">
                           <div className={`w-2 h-2 rounded-full mr-2 ${
                             order.priority === 'Alta' ? 'bg-red-500' :
                             order.priority === 'Media' ? 'bg-amber-500' : 'bg-gray-400'
                           }`}></div>
                           <span className="text-gray-600">{order.priority}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar Demo */}
          <div className="space-y-6">
            <div className="bg-brand-anthracite text-white p-6 rounded-2xl shadow-lg border border-white/5">
              <h2 className="font-bold mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-brand-yellow" /> Próximas Citas
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5">
                    <div className="text-center bg-brand-yellow text-brand-anthracite px-2 py-1 rounded font-black text-xs">
                      <div>14</div>
                      <div className="text-[10px] leading-none">OCT</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold">Revisión 20.000km</div>
                      <div className="text-xs text-gray-400">Mercedes Clase A - 10:30h</div>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto text-gray-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-brand-anthracite mb-4">Stock de Recambios</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Aceite 5W30</span>
                  <span className="font-bold text-red-500">2 Unid.</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-red-500 h-2 rounded-full w-[20%]"></div>
                </div>
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-gray-500">Filtros Aire (Genéricos)</span>
                  <span className="font-bold text-green-600">18 Unid.</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full">
                  <div className="bg-green-500 h-2 rounded-full w-[80%]"></div>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-gray-100 text-brand-anthracite rounded-lg text-sm font-bold hover:bg-brand-yellow transition">Gestionar Pedido</button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Demo Badge */}
      <div className="fixed bottom-6 right-6 bg-brand-yellow text-brand-anthracite px-4 py-2 rounded-full shadow-2xl font-black text-xs uppercase tracking-widest border-2 border-brand-anthracite flex items-center animate-bounce">
        <span className="mr-2">●</span> Modo Demo Interactiva
      </div>
    </div>
  );
};

export default Dashboard;
