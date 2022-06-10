/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import Navigation from './components/navigation/Navigation';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import './App.scss';
import Carousel from './components/carousel/Carousel';
import initState from './redux/equipment/equipmentAPI';
import AddEquipment from './components/equipment/AddEquipment';

const App = () => {
  const user = useSelector((state) => state.auth);
  const { equipments } = useSelector((state) => state.equipment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initState());
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route index element={<Carousel collection={equipments} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:id" element={<h1>details</h1>} />
        <Route path="/my-reservations" element={<h1>My Reservations</h1>} />
        <Route path="/reserve" element={<ProtectedRoute element={<h1>rent</h1>} isAllowed={!!user} />} />
        <Route path="/add-equipment" element={<AddEquipment />} />
        {/* <Route path="/remove-equipment" element={<ProtectedRoute element={<h1>delete</h1>} isAllowed={!!user && user.role.includes('admin')} />} /> */}
        <Route path="*" element={<p>There nothing here: 404!</p>} />
      </Routes>
    </div>
  );
};

export default App;
