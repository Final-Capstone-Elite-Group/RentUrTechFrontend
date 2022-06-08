/* eslint-disable max-len */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Navigation from './components/navigation/Navigation';
import Signup from './components/signup/Signup';
import Reserve from './components/reserve/Reserve';
import MyReservations from './components/my-reservations/MyReservations';
import './App.scss';

const App = () => {
  const user = useSelector((state) => state.users.user);
  return (
    <div className="App">
      <Navigation />
      <ToastContainer
        position="top-right"
        theme="colored"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Routes>
        <Route index element={<h1>home</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:id" element={<h1>details</h1>} />
        <Route path="/my-reservations" element={<h1>My Reservations</h1>} />
        <Route path="/reserve" element={<ProtectedRoute element={<h1>rent</h1>} isAllowed={!!user} />} />
        <Route path="/add-equipment" element={<ProtectedRoute element={<h1>add</h1>} isAllowed={!!user && user.role.includes('admin')} />} />
        <Route path="/remove-equipment" element={<ProtectedRoute element={<h1>delete</h1>} isAllowed={!!user && user.role.includes('admin')} />} />
        <Route path="*" element={<p>There nothing here: 404!</p>} />
      </Routes>
    </div>
  );
};

export default App;
