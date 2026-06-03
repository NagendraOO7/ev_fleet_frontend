// src/api/fetchApi.js
const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function fetchApi(url) {
  const res = await fetch(`https://ev-fleet-backend-9yab.onrender.com${url}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}