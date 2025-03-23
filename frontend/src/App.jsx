import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyForm from './components/CurrencyForm';
import ResultDisplay from './components/ResultDisplay';
import ExchangeRates from './components/ExchangeRates';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LogoutButton from './components/LogoutButton';
import { AuthProvider, useAuth } from './AuthContext';
import UserInfo from './components/UserInfo';
import Sidebar from './components/Sidebar';
import './css/index.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch('/api/rates');
      const data = await response.json();
      if (data.success) {
        setRates(data.rates);
      } else {
        setError('Failed to fetch exchange rates');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    }
  };

  const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          from: fromCurrency,
          to: toCurrency,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          amount,
          from: fromCurrency,
          to: toCurrency,
          convertedAmount: data.convertedAmount,
          rate: data.rate,
        });
      } else {
        setError(data.message || 'Conversion failed');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const CurrencyConverter = () => {
    const [activeTab, setActiveTab] = useState('converter'); // State to manage active tab
  
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex gap-6">
          {/* Sidebar */}
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
  
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-end mb-4">
              <LogoutButton />
            </div>
  
            {/* Display the logged-in user info */}
            <UserInfo />
  
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
              {activeTab === 'converter' ? 'Currency Converter' : 'Exchange Rates'}
            </h1>
  
            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === 'converter' && (
              <>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <CurrencyForm onConvert={convertCurrency} loading={loading} />
                </div>
  
                {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                    <p>{error}</p>
                  </div>
                )}
  
                {result && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <ResultDisplay result={result} />
                  </div>
                )}
              </>
            )}
  
            {activeTab === 'rates' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <ExchangeRates rates={rates} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/currency"
            element={
              <ProtectedRoute>
                <CurrencyConverter />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;