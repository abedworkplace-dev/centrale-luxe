// src/redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Récupère les favoris sauvegardés ou démarre à vide []
const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('cl_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existsIndex = state.items.findIndex(item => item.id === product.id);

      if (existsIndex >= 0) {
        state.items.splice(existsIndex, 1);
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          tag: product.tag || 'Luxe',
          img: product.img,
          price: product.price,
          stock: product.stock !== undefined ? product.stock : true,
          bracelets: product.bracelets || [],
          tailles: product.tailles || []
        });
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (id) => (state) => state.wishlist.items.some(item => item.id === id);

export default wishlistSlice.reducer;