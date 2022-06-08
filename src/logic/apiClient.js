import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMiwiZXhwIjoxNjU0ODEwNTk1fQ.M4sZrC8VNZZdJ2cYl92QiBQBHulXdSKm8YAZctekabY' },
});

export default apiClient;
