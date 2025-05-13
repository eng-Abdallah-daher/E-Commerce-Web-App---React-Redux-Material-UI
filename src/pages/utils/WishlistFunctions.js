import { getCookie, setCookie } from './Functions';
export let statusofheart = false
export function falsing(){
    statusofheart = false
}
export function statusofhearttrue(){
    statusofheart = true
}
export const getWishlist = () => {
    try {
        const saved = getCookie("wishlistItems");
        return saved ? saved : [];
    } catch (err) {
        console.error("Wishlist error (get):", err);
        return [];
    }
};
export var list = getWishlist();
export function getWishlistItems() {
    list = getWishlist() 
}
export const addToWishlist = (index) => {
    try {
        if(index<0) return;
        const wishlist = getWishlist();
        if (!wishlist.includes(index)) {
            wishlist.push(index);
            setCookie("wishlistItems", wishlist, 7); 
        }
    } catch (err) {
        console.error("Wishlist error (add):", err);
    }
};
export const removeFromWishlist = (index) => {
    getWishlistItems();
    try {
        const wishlist = getWishlist();
        const updatedWishlist = wishlist.filter((i) => i !== index);
        setCookie("wishlistItems", updatedWishlist, 7);
    } catch (err) {
        console.error("Wishlist error (remove):", err);
    }
};
export const clearWishlist = () => {
    try {
        setCookie('wishlistItems', [], 7);
    } catch (err) {
        console.error("Wishlist error (clear):", err);
    }
};
