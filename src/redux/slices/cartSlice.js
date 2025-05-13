import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  isCartOpen: false,
  confirmDialogOpen: false,
  itemToRemove: null
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity = 1 } = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
    },
    removeFromCart: (state, action) => {
      if (typeof action.payload === 'number') {
        state.items = state.items.filter((_, index) => index !== action.payload);
      } else if (typeof action.payload === 'object') {
        const itemToRemove = action.payload;
        state.items = state.items.filter(item =>
          !(item.name === itemToRemove.name && item.img === itemToRemove.img)
        );
      }
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    openConfirmDialog: (state, action) => {
      state.confirmDialogOpen = true;
      state.itemToRemove = action.payload;
      state.isCartOpen = false;
    },
    closeConfirmDialog: (state) => {
      state.confirmDialogOpen = false;
      state.itemToRemove = null;
    },
    confirmRemove: (state) => {
      if (state.itemToRemove !== null) {
        if (typeof state.itemToRemove === 'number') {
          state.items = state.items.filter((_, index) => index !== state.itemToRemove);
        } else if (typeof state.itemToRemove === 'object') {
          const itemToRemove = state.itemToRemove;
          state.items = state.items.filter(item =>
            !(item.name === itemToRemove.name && item.img === itemToRemove.img)
          );
        }
      }
      state.confirmDialogOpen = false;
      state.itemToRemove = null;
    }
  },
});
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  openConfirmDialog,
  closeConfirmDialog,
  confirmRemove
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state) => state.cart.items.length;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectConfirmDialogOpen = (state) => state.cart.confirmDialogOpen;
export default cartSlice.reducer;
