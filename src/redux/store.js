import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import { getCookie } from '../utils/cookieUtils';
import { cookiePersistMiddleware } from './middleware/cookiePersistMiddleware';
import { getWishlist } from '../pages/utils/WishlistFunctions';



const preloadedState = {
  cart: {
    items: getCookie('cartItems', []),
    isCartOpen: false,
    confirmDialogOpen: false,
    itemToRemove: null
  },
  wishlist: {
    items: getWishlist(),
    itemIndices: getCookie('wishlistItems', []),
    isWishlistOpen: false,
    confirmDialogOpen: false,
    itemToRemove: null,
    isClearAll: false
  },
  user: {
    currentUser: {
      name: getCookie('userName', null),
      email: getCookie('email', null),
      userimage: getCookie('userimage', null),
      address: getCookie('address', null)
    },
    isAuthenticated: !!getCookie('userName', null),
    loading: false,
    error: null
  }
};
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    user: userReducer,
    products: productsReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cookiePersistMiddleware.middleware)
});
export default store;
