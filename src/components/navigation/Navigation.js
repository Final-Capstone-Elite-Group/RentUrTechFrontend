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
      </aside>
    </>
  );
};

export default Navigation;
