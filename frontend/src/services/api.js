import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const loginManager = (credentials) => apiClient.post('/manager/login', credentials);
export const registerManager = (payload) => apiClient.post('/manager/register', payload);

export const fetchDrivers = () => apiClient.get('/driver');
export const fetchBuses = () => apiClient.get('/bus');
export const fetchRoutes = () => apiClient.get('/busroutes');
export const fetchLocalPassengers = () => apiClient.get('/localpassengers');
export const fetchBusSchedules = () => apiClient.get('/bus-schedules');

