const API_BASE = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:5000/api/v1`
  : 'http://localhost:5000/api/v1';

export default API_BASE;
