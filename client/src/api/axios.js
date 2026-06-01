import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const sessionId = localStorage.getItem('sessionId');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (sessionId) config.headers['x-session-id'] = sessionId;
  return config;
});

export default api;
