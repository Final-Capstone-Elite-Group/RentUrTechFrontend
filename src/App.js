/* eslint-disable max-len */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Navigation from './components/navigation/Navigation';
import Signup from './components/signup/Signup';
import Reservation from './components/reservation/Reservation';
import ReservationParams from './components/reservation/ReservationParams';
import MyReservations from './components/my-reservations/MyReservations';
import Tech from './components/tech/Tech';
import Login from './components/login/Login';
import Details from './components/details/Details';
import AddEquipment from './components/equipment/AddEquipment';
import DeleteEquipment from './components/equipment/DeleteEquipment';
import LoadingCanvas from './components/loading/LoadingCanvas';
import './App.scss';

const App = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="App">
      <Navigation />
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <Routes>
        <Route index element={<Tech />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} isAllowed={!auth?.token} redirectPath="/" message="Already Logged In, please Log Out to coninue" />} />
        <Route path="/signup" element={<ProtectedRoute element={<Signup />} isAllowed={!auth?.token} redirectPath="/" message="Already Logged In, please Log Out to coninue" />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/my-reservations" element={<ProtectedRoute element={<MyReservations />} isAllowed={!!auth?.token} />} />
        <Route path="/add-equipment" element={<ProtectedRoute element={<AddEquipment />} isAllowed={!!auth?.token && auth?.user?.role.includes('admin')} />} />
        <Route path="/remove-equipment" element={<ProtectedRoute element={<DeleteEquipment />} isAllowed={!!auth?.token && auth?.user?.role.includes('admin')} />} />
        <Route path="/reservation" element={<ProtectedRoute element={<Reservation />} isAllowed={!!auth?.token} />} />
        <Route path="/reservation/:id" element={<ProtectedRoute element={<ReservationParams />} isAllowed={!!auth?.token} />} />
        <Route path="*" element={<LoadingCanvas />} />
      </Routes>
    </div>
  );
};

export default App;
