// CSRF Hooks: useCSRF and useSecureForm
import { useCallback, useEffect, useState } from 'react';
import { getBackendUrl } from '../utils/env';
import csrfService from './csrfService';

export function useCSRF() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToken = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const t = await csrfService.getCSRFToken(getBackendUrl());
      setToken(t);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchToken(); }, [fetchToken]);

  return { token, loading, error, refresh: fetchToken };
}

export function useSecureForm(onSubmit) {
  const { token, loading, error, refresh } = useCSRF();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      await refresh();
    }
    onSubmit(e, token);
  };
  return { handleSubmit, loading, error };
}
