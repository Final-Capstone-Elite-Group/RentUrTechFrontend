import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMiwiZXhwIjoxNjU0NzcyNTIxfQ.U3UmuI4_Jga3iihxcCX3bPo3hmkuc8Pl1y6eDRN3sD4' },
});

export default axiosInstance;
