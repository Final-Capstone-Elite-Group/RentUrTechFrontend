const GET_USER = 'user/GET_USER';

const initialState = {
  id: '1',
  name: 'robin',
  roles: 'admin',
  email: 'admin@admin.com',
  password: '123456',
};

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default reducer;
