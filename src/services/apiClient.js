// Secure API Client: Axios wrapper with CSRF protection and auto-retry on 403
import axios from 'axios';
import { getBackendUrl } from '../utils/env';
import csrfService from './csrfService';

const apiClient = axios.create({
  baseURL: getBackendUrl(),
  withCredentials: true,
});

// Request interceptor to inject CSRF token
apiClient.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    const token = await csrfService.getCSRFToken(getBackendUrl());
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

// Response interceptor for 403 auto-retry
apiClient.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;
    if (error.response && error.response.status === 403 && !original._retry) {
      original._retry = true;
      await csrfService.refreshCSRFToken(getBackendUrl());
      const token = await csrfService.getCSRFToken(getBackendUrl());
      original.headers['X-CSRF-Token'] = token;
      return apiClient(original);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
