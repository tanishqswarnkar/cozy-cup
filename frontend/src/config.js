export const API_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || 'https://cozy-cup-7sct.onrender.com') 
  : 'http://localhost:5001';
