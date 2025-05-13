import { store } from '../../redux/store';
import {
  addToWishlistAction,
  removeFromWishlistAction,
  clearWishlistAction
} from '../../redux/slices/wishlistSlice';
export const getWishlist = () => {
  try {
    const state = store.getState();
    return state.wishlist.itemIndices || [];
  } catch (err) {
    console.error("Wishlist error (get):", err);
    return [];
  }
};
export const addToWishlist = (index) => {
  try {
    if (index < 0) return;
    store.dispatch(addToWishlistAction(index));
  } catch (err) {
    console.error("Wishlist error (add):", err);
  }
};
export const removeFromWishlist = (index) => {
  try {
    store.dispatch(removeFromWishlistAction(index));
  } catch (err) {
    console.error("Wishlist error (remove):", err);
  }
};
export const clearWishlist = () => {
  try {
    store.dispatch(clearWishlistAction());
  } catch (err) {
    console.error("Wishlist error (clear):", err);
  }
};
export let statusofheart = false;
export function falsing() {
  statusofheart = false;
}
export function statusofhearttrue() {
  statusofheart = true;
}
export let list = getWishlist();
export function getWishlistItems() {
  list = getWishlist();
}
