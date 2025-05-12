export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh-token'
  },
  EMAIL: {
    SEND: '/api/email/send',
    SEND_BULK: '/api/email/send-bulk',
    TEMPLATES: '/api/email/templates'
  },
  PROCESS_WIZARD: {
    START: '/api/process/start',
    NEXT: '/api/process/next',
    PREVIOUS: '/api/process/previous',
    SUBMIT: '/api/process/submit'
  }
}; 