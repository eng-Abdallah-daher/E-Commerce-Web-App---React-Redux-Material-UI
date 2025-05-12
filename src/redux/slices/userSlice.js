import { createSlice } from '@reduxjs/toolkit';
import { setCookie, getCookie, deleteCookie } from '../../pages/utils/Functions';

const getUserFromCookies = () => {
  const name = getCookie('userName');
  const email = getCookie('email');
  const userimage = getCookie('userimage');
  const address = getCookie('address');

  if (name && email) {
    return {
      name,
      email,
      userimage: userimage || '',
      address: address || '',
    };
  }
  return null;
};

const initialState = {
  currentUser: getUserFromCookies(),
  isAuthenticated: !!getUserFromCookies(),
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      
      deleteCookie('userName');
      deleteCookie('email');
      deleteCookie('userimage');
      deleteCookie('address');
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };

      if (action.payload.name) setCookie('userName', action.payload.name, 7);
      if (action.payload.email) setCookie('email', action.payload.email, 7);
      if (action.payload.userimage) setCookie('userimage', action.payload.userimage, 7);
      if (action.payload.address) setCookie('address', action.payload.address, 7);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  loginSuccess, 
  loginFailure, 
  logout, 
  setUser,
  updateUserProfile, 
  clearError 
} = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserError = (state) => state.user.error;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
