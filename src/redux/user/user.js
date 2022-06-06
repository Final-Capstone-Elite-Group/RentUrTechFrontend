const GET_USER = 'user/GET_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';

const initialState = {
  id: '1',
  name: 'robin',
  roles: 'admin',
};

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const logout = () => ({
  type: GET_USER,
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
    default:
      return state;
  }
};

export default reducer;
