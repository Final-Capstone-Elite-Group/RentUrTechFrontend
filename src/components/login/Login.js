import React, { useState } from 'react';
import style from './login.module.scss';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  return (
    <div className={style.wrapper}>
      <form>
        <div className="form-inner">
          <h2>Log in</h2>
          <div className="form-group">
            <label htmlFor="email">
              Email:
              <input type="email" name="email" id="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input type="password" name="password" id="password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
            </label>
          </div>
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </div>
  );
};

export default Login;
