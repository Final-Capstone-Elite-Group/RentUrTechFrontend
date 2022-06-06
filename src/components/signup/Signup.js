import React, { useState } from 'react';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });
  return (
    <div className="wrapper">
      <form>
        <h1>Sign up</h1>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <input type="text" id="name" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="username">
            Username
            <input type="text" id="username" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input type="password" id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Signup;
