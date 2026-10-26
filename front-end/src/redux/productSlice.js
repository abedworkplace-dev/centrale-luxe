// src/redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { initialProducts } from '../data/products';

const loadSelectedProduct = () => {
  try {
    const saved = localStorage.getItem('cl_selected_product');
    return saved ? JSON.parse(saved) : initialProducts[0];
  } catch (e) {
    return initialProducts[0];
  }
};

const initialState = {
  products: initialProducts,
  selectedProduct: loadSelectedProduct(),
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const found = state.products.find(p => p.id === action.payload);
      if (found) {
        state.selectedProduct = found;
      }
    }
  }
});

export const { setSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.products.products;
export const selectCurrentProduct = (state) => state.products.selectedProduct;

export default productSlice.reducer;