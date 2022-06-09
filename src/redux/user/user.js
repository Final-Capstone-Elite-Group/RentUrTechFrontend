import axios from 'axios';
import { toast } from 'react-toastify';

const GET_USER = 'user/GET_USER';
const POST_USER = 'user/POST_USER';
const LOGIN_USER = 'user/LOGIN_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';

const initialState = {
  user: {},
};

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const postUser = (payload) => ({
  type: POST_USER,
  payload,
});

export const login = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const authenticateUser = (user) => async (dispatch) => {
  await axios.post('http://localhost:3000/login', {
    username: user.username,
    password: user.password,
  })
    .then((res) => {
      if (res.status === 200) {
        dispatch(login(res.data));
        localStorage.setItem(
          'authentication',
          JSON.stringify(res.data),
        );
      }
    }).catch((e) => {
      console.log(e);
    });
};

export const postUserToAPI = (user) => async (dispatch) => {
  await axios.post('http://localhost:3000/signup',
    {
      user,
    })
    .then((response) => {
      if (response.status === 201) {
        toast.success('🦄 User Created!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(postUser(response.data));
      }
    }).catch((e) => {
      if (e) {
        toast.error(e.response.data.errors, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
};

export const logout = () => ({
  type: LOGOUT_USER,
  payload: null,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    case POST_USER: {
      return { ...action.payload };
    }
    case LOGIN_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return null;
    }
    default:
      return state;
  }
};

export default authReducer;
