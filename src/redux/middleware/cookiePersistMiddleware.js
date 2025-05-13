import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  confirmRemove
} from '../slices/cartSlice';
import {
  refreshWishlist
} from '../slices/wishlistSlice';
import {
  loginSuccess,
  logout,
  updateUserProfile
} from '../slices/userSlice';
import { setCookie, removeCookie } from '../../utils/cookieUtils';

export const cookiePersistMiddleware = createListenerMiddleware();

cookiePersistMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    confirmRemove
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    setCookie('cartItems', state.cart.items);
  }
});

cookiePersistMiddleware.startListening({
  actionCreator: refreshWishlist,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    setCookie('wishlistItems', state.wishlist.itemIndices);
  }
});

cookiePersistMiddleware.startListening({
  matcher: isAnyOf(loginSuccess, updateUserProfile),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const { currentUser } = state.user;
    if (currentUser) {
      setCookie('userName', currentUser.name);
      setCookie('email', currentUser.email);
      setCookie('userimage', currentUser.userimage);
      if (currentUser.address) {
        setCookie('address', currentUser.address);
      }
    }
  }
});

cookiePersistMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    removeCookie('userName');
    removeCookie('email');
    removeCookie('userimage');
    removeCookie('address');
    removeCookie('cartItems');
    removeCookie('wishlistItems');
  }
});
