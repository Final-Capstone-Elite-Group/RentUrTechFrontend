import { NavLink, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiMenuAlt4 } from 'react-icons/hi';
import {
  FaPinterestP, FaFacebookF, FaAngleDoubleLeft,
  FaGooglePlusG, FaVimeoV,
} from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { logout } from '../../redux/user/user';
import logo from '../../images/logo1.svg';
import style from './navigation.module.scss';

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();
  const closedLocation = ['/add-equipment', '/reserve', '/login', '/signup', '/remove-equipment'];

  useEffect(() => {
    if (closedLocation.includes(location.pathname)) {
      menuRef.current.className = style.close_menu;
      hamburgerRef.current.className = style.hamburger_white;
    } else {
      hamburgerRef.current.className = style.hamburger;
    }
  }, [location]);

  const handleMenuClose = () => {
    menuRef.current.className = style.close_menu;
  };
  const handleMenuOpen = () => {
    menuRef.current.className = style.open_menu;
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div ref={hamburgerRef} className={style.hamburger}>
        <HiMenuAlt4 onClick={handleMenuOpen} />
      </div>
      <aside ref={menuRef}>
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
                exact
                className={({ isActive }) => (isActive ? style.active : 'inactive')}
              >
                Techs
              </NavLink>
            </li>
            <li>
              <NavLink to="/reserve" className={({ isActive }) => (isActive ? style.active : 'inactive')}>
                Reserve
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-reservations" className={({ isActive }) => (isActive ? style.active : 'inactive')}>
                My Reservations
              </NavLink>
            </li>
            {user?.roles === 'admin' && (
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
            {user ? (
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
        
        </div>
      </aside>
    </>
  );
};

export default Navigation;
