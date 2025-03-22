const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5000;

// You would typically store this in an environment variable
const API_KEY = 'YOUR_API_KEY'; // Get a free API key from exchangerate-api.com or similar service

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cache with expiration
let ratesCache = {
  rates: {},
  timestamp: 0
};

// Function to fetch latest rates
async function fetchLatestRates() {
  // Check if cache is valid (less than 1 hour old)
  const now = Date.now();
  if (now - ratesCache.timestamp < 3600000) {
    return ratesCache.rates;
  }
  
  try {
    // Option 1: Using a free API (limited requests)
    const response = await axios.get(`https://open.er-api.com/v6/latest/USD`);
    
    // Option 2: If you have an API key for exchangerate-api.com
    // const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    
    if (response.data && response.data.rates) {
      ratesCache = {
        rates: response.data.rates,
        timestamp: now
      };
      return response.data.rates;
    }
    throw new Error('Invalid API response');
  } catch (error) {
    console.error('Error fetching rates:', error.message);
    
    // If cache exists but is expired, still use it as fallback
    if (Object.keys(ratesCache.rates).length > 0) {
      return ratesCache.rates;
    }
    
    // If no cache, use hardcoded rates as a last resort
    return {
      USD: 1,
      EUR: 0.91,
      GBP: 0.78,
      JPY: 144.5,
      CAD: 1.35,
      AUD: 1.48,
      CHF: 0.87,
      CNY: 7.14,
      INR: 83.12,
      BRL: 5.37
    };
  }
}

// API routes
app.get('/api/rates', async (req, res) => {
  try {
    const rates = await fetchLatestRates();
    res.json({
      success: true,
      rates,
      timestamp: ratesCache.timestamp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch exchange rates'
    });
  }
});

app.post('/api/convert', async (req, res) => {
  try {
    const { amount, from, to } = req.body;
    
    if (!amount || !from || !to) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }
    
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number'
      });
    }
    
    const rates = await fetchLatestRates();
    
    if (!rates[from] || !rates[to]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid currency code'
      });
    }
    
    // Calculate the conversion rate and converted amount
    const fromRate = rates[from];
    const toRate = rates[to];
    const rate = toRate / fromRate;
    const convertedAmount = amount * rate;
    
    res.json({
      success: true,
      amount,
      from,
      to,
      rate,
      convertedAmount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Conversion failed'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});