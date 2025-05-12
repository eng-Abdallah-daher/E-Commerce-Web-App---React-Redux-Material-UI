import { createSlice } from '@reduxjs/toolkit';
import { getWishlist as getWishlistFromCookies } from '../../pages/utils/WishlistFunctions';
import { obj } from '../../data/products';

const getWishlistItems = () => {
  const savedWishlistIndexes = getWishlistFromCookies();
  return savedWishlistIndexes.map(index => obj.results[index]);
};

const initialState = {
  items: getWishlistItems(),
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
      
      
      
      state.items = getWishlistItems();
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
      state.items = getWishlistItems();
    }
  },
});

export const {
  setWishlistItems,
  addToWishlistAction,
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
