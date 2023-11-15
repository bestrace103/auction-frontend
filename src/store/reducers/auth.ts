import { createSlice } from '@reduxjs/toolkit';
import { UserType } from 'src/types';

type initialStateType = {
  token: string;
  user: UserType;
  isLoggedIn: boolean;
  loading: boolean;
};

const initialUser: UserType = {
  _id: '',
  full_name: '',
  phone_number: '',
  role: ''
};

const initialState: initialStateType = {
  token: '',
  user: initialUser,
  isLoggedIn: false,
  loading: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.loading = false;
    },

    edit(state, action) {
      state.user = action.payload;
    },

    signout(state) {
      state.token = '';
      state.user = initialUser;
      state.isLoggedIn = false;
    },
  },
});

export default auth.reducer;

export const { signin, signout, edit } = auth.actions;
