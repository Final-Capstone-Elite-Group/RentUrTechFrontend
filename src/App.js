/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import initState from './redux/equipment/equipmentAPI';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Navigation from './components/navigation/Navigation';
import Signup from './components/signup/Signup';
import Reserve from './components/reserve/Reserve';
import MyReservations from './components/my-reservations/MyReservations';
import Login from './components/login/Login';
import Button from './components/button/Button'
import Carousel from './components/carousel/Carousel';
import Details from './components/details/Details';
import './App.scss';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const { equipments } = useSelector((state) => state.equipment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initState());
  }, [dispatch])

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
        <Route index element={<Carousel collection={equipments} />} />
        <Route path="/login" element={<ProtectedRoute element={<Login />} isAllowed={!auth?.token} redirectPath="/" message="Already Logged In, please Log Out to coninue" />} />
        <Route path="/signup" element={<ProtectedRoute element={<Signup />} isAllowed={!auth?.token} redirectPath="/" message="Already Logged In, please Log Out to coninue" />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/my-reservations" element={<ProtectedRoute element={<MyReservations />} isAllowed={!!auth?.token} />} />
        <Route path="/reserve" element={<ProtectedRoute element={<Reserve />} isAllowed={!!auth?.token} />} />
        <Route path="/reserve/:id" element={<ProtectedRoute element={<Reserve />} isAllowed={!!auth?.token} />} />
        <Route path="/add-equipment" element={<ProtectedRoute element={<h1>add</h1>} isAllowed={!!auth?.token && auth?.user?.role.includes('admin')} />} />
        <Route path="/remove-equipment" element={<ProtectedRoute element={<h1>delete</h1>} isAllowed={!!auth?.token && auth?.user?.role.includes('admin')} />} />
        <Route path="*" element={<p>There nothing here: 404!</p>} />
      </Routes>
    </div>
  );
};

export default App;
