import React, { useState } from 'react';

function ExchangeRates({ rates }) {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  
  const currencies = Object.keys(rates).sort();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-blue-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Exchange Rates
        </h2>
        
        <div className="flex items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
          <span className="mr-2 font-medium text-gray-700">Base Currency:</span>
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="shadow border rounded-md py-1 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {currencies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {currencies
            .filter((currency) => currency !== baseCurrency)
            .map((currency) => {
              // Calculate the rate based on the selected base currency
              const baseRate = rates[baseCurrency] || 1;
              const targetRate = rates[currency] || 1;
              const calculatedRate = targetRate / baseRate;
              
              return (
                <div key={currency} className="border border-gray-200 rounded-lg p-3 text-center transition duration-200 hover:shadow-md hover:border-blue-200 bg-gradient-to-b from-white to-gray-50">
                  <div className="font-semibold text-gray-800 mb-1">{currency}</div>
                  <div className="text-blue-600 text-lg">{calculatedRate.toFixed(4)}</div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">No exchange rates available</p>
        </div>
      )}
    </div>
  );
}

export default ExchangeRates;