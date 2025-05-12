const config = {
  // Base URLs for different modules
  urls: {
    ems: process.env.BASE_URL_EMS || 'https://ems-api.example.com',
    eds: process.env.BASE_URL_EDS || 'https://eds-api.example.com',
  },
  
  // Environment specific settings
  environment: process.env.NODE_ENV || 'development',
  
  // Common headers or settings
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

module.exports = config; 