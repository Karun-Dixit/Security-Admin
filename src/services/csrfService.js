// CSRF Service: Handles fetching, caching, and refreshing CSRF tokens with deduplication
import axios from 'axios';

let csrfToken = null;
let fetchPromise = null;

const getCSRFToken = async (backendUrl) => {
  if (csrfToken) return csrfToken;
  if (fetchPromise) return fetchPromise;
  fetchPromise = axios.get(`${backendUrl}/api/csrf-token`, { withCredentials: true })
    .then(res => {
      if (res.data && res.data.csrfToken) {
        csrfToken = res.data.csrfToken;
        return csrfToken;
      }
      throw new Error('Failed to fetch CSRF token');
    })
    .finally(() => { fetchPromise = null; });
  return fetchPromise;
};

const refreshCSRFToken = async (backendUrl) => {
  csrfToken = null;
  return getCSRFToken(backendUrl);
};

const clearCSRFToken = () => { csrfToken = null; };

export default {
  getCSRFToken,
  refreshCSRFToken,
  clearCSRFToken,
};
