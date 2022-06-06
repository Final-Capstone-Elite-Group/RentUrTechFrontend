import React, { useState } from 'react';
import axios from 'axios';
import style from './signup.module.scss';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    axios.post('http://localhost:3000/signup',
      {
        user: {
          name: user.name,
          username: user.username,
          password: user.password,
          email: user.email,
        },
      }, { withCredentials: true })
      .then((response) => {
        console.log('registration res: ', response);
      });
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit()}>
        <h1>Sign up</h1>
        <div className={style['form-group']}>
          <span htmlFor="name">
            Name
          </span>
          <input type="text" id="name" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        </div>
        <div className={style['form-group']}>
          <span htmlFor="username">
            Username
          </span>
          <input type="text" id="username" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
        </div>
        <div className={style['form-group']}>
          <span htmlFor="email">
            Email
          </span>
          <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        </div>
        <div className={style['form-group']}>
          <span htmlFor="password">
            Password
          </span>
          <input type="password" id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
