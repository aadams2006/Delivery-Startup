import React, { useState } from 'react';
import { Bell, Package, Truck, Building, Calendar, ChevronRight, Settings, LogOut, X, MapPin, Clock, DollarSign } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentShipments = [
    { id: 1, type: 'P2P', status: 'In Transit', destination: '123 Main St, Anytown, USA', eta: '2 hours', cost: '$15.99' },
    { id: 2, type: 'Business', status: 'Delivered', destination: '456 Elm St, Otherville, USA', eta: 'Delivered', cost: '$24.99' },
    { id: 3, type: 'Corporate', status: 'Scheduled', destination: '789 Oak Ave, Bigcity, USA', eta: '1 day', cost: '$99.99' },
  ];

  const openShipmentModal = (shipment) => {
    setSelectedShipment(shipment);
    setShowModal(true);
  };

  const closeShipmentModal = () => {
    setSelectedShipment(null);
    setShowModal(false);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Welcome back, John!</h3>
            <p className="text-gray-600 mb-4">Here's a quick overview of your Hovr activity:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Total Shipments</h4>
                <p className="text-2xl font-bold text-blue-600">24</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Active Shipments</h4>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-700 mb-2">Total Savings</h4>
                <p className="text-2xl font-bold text-purple-600">$127.50</p>
              </div>
            </div>
            {/* Quick Actions and Recent Shipments sections remain here */}
          </div>
        );
      case 'shipments':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">All Shipments</h3>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{shipment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.eta}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.cost}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => openShipmentModal(shipment)}
                        >
                          Details <ChevronRight className="inline-block w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Shipments</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <ul className="divide-y divide-gray-200">
                <li className="py-4">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">P2P Shipment to 123 Pine St</p>
                      <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Business Delivery to 456 Oak Ave</p>
                      <p className="text-sm text-gray-500">Aug 5, 10:00 AM</p>
                    </div>
                  </div>
                </li>
                <li className="py-4">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Corporate Shipment to 789 Maple Rd</p>
                      <p className="text-sm text-gray-500">Aug 7, 9:00 AM</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Settings</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="John Doe" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="john.doe@example.com" />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md" defaultValue="(123) 456-7890" />
                </div>
                <div className="mt-6">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Hovr</h1>
        </div>
        <nav className="mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center w-full px-4 py-2 text-left ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button className="flex items-center text-gray-600 hover:text-red-600">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600" onClick={toggleNotification}>
                <Bell className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {renderTabContent()}
        </div>
      </main>

      {/* Shipment Details Modal */}
      {showModal && selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Shipment Details</h3>
              <button onClick={closeShipmentModal} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p><span className="font-medium">ID:</span> #{selectedShipment.id}</p>
              <p><span className="font-medium">Type:</span> {selectedShipment.type}</p>
              <p><span className="font-medium">Status:</span> {selectedShipment.status}</p>
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span>{selectedShipment.destination}</span>
              </p>
              <p className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span>ETA: {selectedShipment.eta}</span>
              </p>
              <p className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                <span>Cost: {selectedShipment.cost}</span>
              </p>
            </div>
            <button
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={closeShipmentModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-8 w-80">
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>New Notification</AlertTitle>
            <AlertDescription>
              Your shipment #1234 has been delivered successfully.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
