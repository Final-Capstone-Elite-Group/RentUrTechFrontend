import axios from 'axios';

const GET_USER = 'user/GET_USER';
const POST_USER = 'user/POST_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';

const initialState = {
  id: '1',
  name: 'robin',
  role: 'admin',
};

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const postUser = (payload) => ({
  type: POST_USER,
  payload,
});

export const postUserToAPI = (user) => async (dispatch) => {
  dispatch(postUser(user));

  await axios.post('http://localhost:3000/signup',
    {
      user,
    })
    .then((response) => {
      console.log('registration res: ', response);
    }).catch((e) => {
      console.log(e);
    });
};

export const logout = () => ({
  type: LOGOUT_USER,
  payload: null,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    case LOGOUT_USER: {
      return null;
    }
    case POST_USER: {
      return { ...action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
