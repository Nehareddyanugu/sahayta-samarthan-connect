// apiService.ts — functions to talk to the backend

import axios from 'axios';

const API_BASE = 'http://your-backend-domain.com/api';  // change to where your backend is running

// Set up axios to send token if exists
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/users/register`, { name, email, password });
  return response.data;  // contains user info + token
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE}/users/login`, { email, password });
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_BASE}/users/profile`, { headers: getAuthHeaders() });
  return response.data;
};

export const submitRequest = async (title: string, description: string, category: string, location: string) => {
  const response = await axios.post(`${API_BASE}/requests`, { title, description, category, location }, { headers: getAuthHeaders() });
  return response.data;
};

export const fetchRequests = async () => {
  const response = await axios.get(`${API_BASE}/requests`);
  return response.data;
};

export const fetchRequestById = async (id: string) => {
  const response = await axios.get(`${API_BASE}/requests/${id}`);
  return response.data;
};
