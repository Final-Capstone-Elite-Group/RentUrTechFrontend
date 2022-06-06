import React, { useState } from 'react';
import style from './login.module.scss';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <div className={style.wrapper}>
      <form>
        <div className="form-inner">
          <h2>Log in</h2>
          <div className="form-group">
            <label htmlFor="email">
              Email:
              <input type="email" name="email" id="email" />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input type="password" name="password" id="password" />
            </label>
          </div>
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </div>
  );
};

export default Login;
