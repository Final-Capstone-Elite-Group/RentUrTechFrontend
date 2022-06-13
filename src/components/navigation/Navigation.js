import { NavLink, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiMenuAlt4 } from 'react-icons/hi';
import {
  FaPinterestP, FaFacebookF, FaAngleDoubleLeft,
  FaGooglePlusG, FaVimeoV,
} from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { logOut } from '../../redux/user/user';
import { setMenu } from '../../redux/menu/menu';
import logo from '../../images/logo1.svg';
import style from './navigation.module.scss';

const Navigation = () => {
  const menuState = (useSelector((state) => state.menu));
  const [locationState, setLocationState] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const closedLocation = ['/', '/my-reservations', '/details/:id'];

  useEffect(() => {
    if (closedLocation.includes(location.pathname)) {
      dispatch(setMenu(true));
      setLocationState(true);
    } else {
      dispatch(setMenu(false));
      setLocationState(false);
    }
  }, [location]);

  const handleMenuClose = () => {
    dispatch(setMenu(false));
  };
  const handleMenuOpen = () => {
    dispatch(setMenu(true));
  };
  const handleLogout = () => {
    dispatch(logOut);
  };

  return (
    <>
      <div className={locationState ? style.hamburger : style.hamburger_white}>
        <HiMenuAlt4 onClick={handleMenuOpen} />
      </div>
      <aside className={`${locationState && style.relative} ${!menuState && style.close_menu}`}>
        <button type="button" className={style.closing_button} onClick={handleMenuClose}>
          <FaAngleDoubleLeft />
        </button>
        <div className={style.logo}>
          <img src={logo} alt="logo" />
        </div>

        <nav>
          <ul className={style.nav_list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? style.active : 'inactive')}
              >
                Techs
              </NavLink>
            </li>
            <li>
              <NavLink to="/reserve" className={({ isActive }) => (isActive ? style.active : 'inactive')}>
                Reservation
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-reservations" className={({ isActive }) => (isActive ? style.active : 'inactive')}>
                My Reservations
              </NavLink>
            </li>
            {auth?.user?.role === 'admin' && (
            <>
              <li>
                <NavLink to="/add-equipment" className={({ isActive }) => (isActive ? style.active : 'inactive')}>
                  Add Techs
                </NavLink>
              </li>
              <li>
                <NavLink to="/remove-equipment" className={({ isActive }) => (isActive ? style.active : 'inactive')}>
                  Remove Techs
                </NavLink>
              </li>
            </>
            )}
          </ul>

        </nav>
        <div className={style.social_links}>
          <div className={style.user_login}>
            {auth?.token ? (
              <Popup modal trigger={<button type="button" onClick={handleLogout}>Logout</button>}>
                {(close) => (
                  <>
                    <div className={style.overlay}>
                      <div className={style.modal}>
                        <div className={style.logout_message}>
                          Are you sure you want to Logout?
                        </div>
                        <div className={style.logout_choices}>
                          <button type="button" onClick={handleLogout}>Confirm</button>
                          <button
                            type="button"
                            onClick={() => {
                              close();
                            }}
                          >
                            Close
                          </button>

                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Popup>
            ) : (
              <>
                <NavLink to="/login">
                  Login
                </NavLink>
                <NavLink to="/signup">
                  Sign up
                </NavLink>
              </>
            )}
          </div>
          <ul>
            <li><a aria-label="Save" href="https://twitter.com/?lang=en"><BsTwitter /></a></li>
            <li><a aria-label="Save" href="https://twitter.com/?lang=en"><FaFacebookF /></a></li>
            <li><a aria-label="Save" href="https://twitter.com/?lang=en"><FaGooglePlusG /></a></li>
            <li><a aria-label="Save" href="https://twitter.com/?lang=en"><FaVimeoV /></a></li>
            <li><a aria-label="Save" href="https://twitter.com/?lang=en"><FaPinterestP /></a></li>
          </ul>
          <p className={style.copy}> &copy; Copyright 2022, RUT incorporated</p>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
