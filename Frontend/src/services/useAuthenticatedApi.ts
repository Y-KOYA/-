// src/services/useAuthenticatedApi.ts
import axios from 'axios';

export const useAuthenticatedApi = () => {
  const token = sessionStorage.getItem('authToken');

  const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return apiClient;
};
