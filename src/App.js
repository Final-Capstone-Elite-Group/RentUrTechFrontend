import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import './App.scss';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="App">
      <h1> Hello There </h1>
      <Routes>
        <Route index element={<h1>home</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/signup" element={<h1>sign-up</h1>} />
        <Route path="/details/:id" element={<h1>details</h1>} />
        <Route path="/rent" element={<ProtectedRoute element={<h1>rent</h1>} isAllowed={!!user} />} />
        <Route path="/add-equipment" element={<ProtectedRoute element={<h1>add</h1>} isAllowed={!!user && user.roles.includes('admin')} />} />
        <Route path="/delete-equipment" element={<ProtectedRoute element={<h1>delete</h1>} isAllowed={!!user && user.roles.includes('admin')} />} />
        <Route path="*" element={<p>There nothing here: 404!</p>} />
      </Routes>
    </div>
  );
};

export default App;
