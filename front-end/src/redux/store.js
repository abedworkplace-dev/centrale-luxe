// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer
  }
});

// Sauvegarde automatique à chaque changement du state Redux
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('cl_cart', JSON.stringify(state.cart.items));
    localStorage.setItem('cl_wishlist', JSON.stringify(state.wishlist.items));
    localStorage.setItem('cl_selected_product', JSON.stringify(state.products.selectedProduct));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde dans le localStorage:", error);
  }
});