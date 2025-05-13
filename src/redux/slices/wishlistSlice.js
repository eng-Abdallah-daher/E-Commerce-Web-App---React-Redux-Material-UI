import { createSlice } from '@reduxjs/toolkit';
import { obj } from '../../data/products';
const initialState = {
  items: [],
  itemIndices: [],
  isWishlistOpen: false,
  confirmDialogOpen: false,
  itemToRemove: null,
  isClearAll: false
};
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
    addToWishlistAction: (state, action) => {
      const productIndex = action.payload;
      if (!state.itemIndices.includes(productIndex)) {
        state.itemIndices.push(productIndex);
        try {
          state.items.push(obj.results[productIndex]);
        } catch (e) {
        }
      }
    },
    removeFromWishlistAction: (state, action) => {
      const productIndex = action.payload;
      state.itemIndices = state.itemIndices.filter(index => index !== productIndex);
      state.items = state.items.filter(item =>
        item.index !== productIndex && item.originalIndex !== productIndex
      );
    },
    clearWishlistAction: (state) => {
      state.items = [];
      state.itemIndices = [];
    },
    toggleWishlist: (state) => {
      state.isWishlistOpen = !state.isWishlistOpen;
    },
    openWishlist: (state) => {
      state.isWishlistOpen = true;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
    openConfirmDialog: (state, action) => {
      state.confirmDialogOpen = true;
      state.itemToRemove = action.payload;
      state.isClearAll = false;
      state.isWishlistOpen = false;
    },
    openClearAllConfirmDialog: (state) => {
      state.confirmDialogOpen = true;
      state.isClearAll = true;
      state.isWishlistOpen = false;
    },
    closeConfirmDialog: (state) => {
      state.confirmDialogOpen = false;
      state.itemToRemove = null;
      state.isClearAll = false;
    },
    refreshWishlist: (state) => {
      state.items = state.itemIndices.map(index => {
        try {
          return obj.results[index];
        } catch (e) {
          return { index };
        }
      });
    }
  },
});
export const {
  setWishlistItems,
  addToWishlistAction,
  removeFromWishlistAction,
  clearWishlistAction,
  toggleWishlist,
  openWishlist,
  closeWishlist,
  openConfirmDialog,
  openClearAllConfirmDialog,
  closeConfirmDialog,
  refreshWishlist
} = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsWishlistOpen = (state) => state.wishlist.isWishlistOpen;
export const selectConfirmDialogOpen = (state) => state.wishlist.confirmDialogOpen;
export const selectIsClearAll = (state) => state.wishlist.isClearAll;
export const selectItemToRemove = (state) => state.wishlist.itemToRemove;
export default wishlistSlice.reducer;
