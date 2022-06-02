import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';


const App = () => (
  <div className="App">
    <h1> Hello There </h1>
    <Routes>
        <Route index element={<h1>"home</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/signup" element={<h1>sign-up</h1>} />
        <Route path="/details/:id" element={<h1>details</h1>} />
        <Route path="/rent/:id" element={<h1>rent</h1>} />
        <Route path="/add-equipment" element={<h1>add</h1>} />
        <Route path="/delete-equipment" element={<h1>delete</h1>} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
  </div>
);

export default App;
