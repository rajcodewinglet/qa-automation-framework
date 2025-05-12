// import dotenv from "dotenv";
// dotenv.config();

// /**
//  * Get base URL dynamically based on the module
//  * @param {string} module - Module name (e.g., 'eds', 'ems', etc.)
//  * @returns {string} - Base URL
//  */
// export const getBaseUrl = (module) => {
//   switch (module.toLowerCase()) {
//     case "eds":
//       return process.env.BASE_URL_EDS;
//     case "ems":
//       return process.env.BASE_URL_EMS;
//     case "default":
//     default:
//       return process.env.BASE_URL_DEFAULT;
//   }
// };

// /**
//  * Static auth token (optional fallback)
//  */
// export const AUTH_TOKEN = process.env.AUTH_TOKEN;

// /**
//  * Get Authorization headers dynamically
//  * @param {string} [token] - Optional custom token
//  * @returns {object} - Headers with Authorization
//  */
// export const getAuthHeader = (token) => ({
//   Authorization: `Bearer ${token || process.env.AUTH_TOKEN}`,
//   "Content-Type": "application/json",
// });
import dotenv from "dotenv";
dotenv.config();

/**
 * Get base URL dynamically based on the module
 * @param {string} module - Module name (e.g., 'eds', 'ems', 'superadmin')
 * @returns {string} - Base URL
 */
export const getBaseUrl = (module) => {
  switch (module.toLowerCase()) {
    case "eds":
      return process.env.BASE_URL_EDS;
    case "ems":
      return process.env.BASE_URL_EMS;
    case "superadmin":
      return process.env.BASE_URL_SuperAdmin;
    case "default":
    default:
      return process.env.BASE_URL_DEFAULT; // Ensure a default is set in the env file
  }
};

/**
 * Get Authorization Token dynamically based on the module
 * @param {string} module - Module name (e.g., 'eds', 'ems', 'superadmin')
 * @returns {string} - Authorization token
 */
export const getAuthToken = (module) => {
  switch (module.toLowerCase()) {
    case "eds":
      return process.env.AUTH_TOKEN_EDS;
    case "ems":
      return process.env.AUTH_TOKEN_EMS;
    case "superadmin":
      return process.env.AUTH_TOKEN_SuperAdmin;
    default:
      return process.env.AUTH_TOKEN; // Fallback token (e.g., for default or other cases)
  }
};

/**
 * Get Authorization headers dynamically based on the module
 * @param {string} module - Module name (e.g., 'eds', 'ems', 'superadmin')
 * @returns {object} - Headers with Authorization
 */
export const getAuthHeader = (module) => ({
  Authorization: `Bearer ${getAuthToken(module)}`,
  "Content-Type": "application/json",
});
