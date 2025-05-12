
import { users } from "../../data/users";
import {  setCookie } from "./Functions";

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

export async function authenticate (email, password) {
    console.log(await hashPassword('123'))
    const hashedPassword = await hashPassword(password);
    const user = users.find(user => user.email === email);
    if (!user) {
        return { success: false, message: "User not found" };
    }
    if (user.password !== hashedPassword) {
        return { success: false, message: "Incorrect password" };
    }
    return { success: true, user: user };
}
export function logout(){
                setCookie('userName', [], 7);
                setCookie('userimage', [], 7);
                setCookie('address', [], 7);
                setCookie('email', [], 7);
                setCookie('cartItems', [], 7);
                setCookie('wishlistItems', [], 7);
    window.location.href = `/`;
}
