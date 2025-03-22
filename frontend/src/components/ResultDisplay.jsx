import React from 'react';

function ResultDisplay({ result }) {
  const { amount, from, to, convertedAmount, rate } = result;
  
  return (
    <div className="text-center bg-gradient-to-b from-blue-50 to-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Conversion Result</h2>
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-2xl font-bold bg-blue-500 text-white py-3 px-6 rounded-md shadow-sm w-full max-w-md">
          {amount.toFixed(2)} {from} = {convertedAmount.toFixed(2)} {to}
        </div>
        
        <div className="flex justify-between w-full max-w-md text-gray-700 bg-gray-50 p-3 rounded border border-gray-200">
          <div>
            <span className="text-xs uppercase tracking-wide">Exchange Rate</span>
            <div>1 {from} = {rate.toFixed(6)} {to}</div>
          </div>
          
          <div>
            <span className="text-xs uppercase tracking-wide">Inverse Rate</span>
            <div>1 {to} = {(1 / rate).toFixed(6)} {from}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDisplay;