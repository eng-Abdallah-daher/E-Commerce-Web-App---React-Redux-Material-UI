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
export const persistMiddleware = createListenerMiddleware();
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
persistMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    confirmRemove
  ),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    saveToLocalStorage('cartItems', state.cart.items);
  }
});
persistMiddleware.startListening({
  actionCreator: refreshWishlist,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    saveToLocalStorage('wishlistItems', state.wishlist.itemIndices);
  }
});
persistMiddleware.startListening({
  matcher: isAnyOf(loginSuccess, updateUserProfile),
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    const { currentUser } = state.user;
    if (currentUser) {
      saveToLocalStorage('userName', currentUser.name);
      saveToLocalStorage('email', currentUser.email);
      saveToLocalStorage('userimage', currentUser.userimage);
      if (currentUser.address) {
        saveToLocalStorage('address', currentUser.address);
      }
    }
  }
});
persistMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('userimage');
    localStorage.removeItem('address');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('wishlistItems');
  }
});
