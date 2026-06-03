import { useState, useEffect } from 'react';
import { fetchApi } from '../api/fetchApi';

export function useApi(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    
    fetchApi(url)
      .then(d => { if (isMounted) setData(d); })
      .catch(err => { if (isMounted) setError(err); })
      .finally(() => { if (isMounted) setLoading(false); });
      
    return () => { isMounted = false; };
  }, deps);

  return { data, loading, error };
}