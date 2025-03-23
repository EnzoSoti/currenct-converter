import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-semibold text-blue-600 mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => setActiveTab('converter')}
            className={`w-full text-left px-4 py-2 rounded-lg transition duration-200 ${
              activeTab === 'converter'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            Currency Converter
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('rates')}
            className={`w-full text-left px-4 py-2 rounded-lg transition duration-200 ${
              activeTab === 'rates'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-blue-50'
            }`}
          >
            Exchange Rates
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;