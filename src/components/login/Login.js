import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import style from '../../sass/shared/form.module.scss';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  return (
    <>
      <ToastContainer />
      <div className={style.wrapper}>
        <form>
          <div>
            <h1>Login</h1>
            <div className={style.logo} />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="name">
              Username
            </span>
            <input type="text" id="name" name="name" value={user.name} onChange={(e) => setUser({ ...user, username: e.target.value })} required />
          </div>
          <div className={style['form-group']}>
            <span htmlFor="username">
              password
            </span>
            <input type="password" id="password" name="password" value={user.username} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
          </div>
          <input type="submit" value="Log in" className={style.submit} />
          <NavLink to="/signup">signup</NavLink>
        </form>
      </div>
    </>
  );
};

export default Login;
