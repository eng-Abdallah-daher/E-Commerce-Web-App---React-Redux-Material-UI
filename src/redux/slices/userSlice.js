import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  isAuthenticated: false,
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
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
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
