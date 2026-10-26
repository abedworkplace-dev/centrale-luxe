// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Récupère le panier sauvegardé ou démarre à vide []
const loadCartFromStorage = () => {
    try {
        const saved = localStorage.getItem('cl_cart');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        return [];
    }
};

const initialState = {
    items: loadCartFromStorage(),
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const selectedBracelet = product.bracelet || (product.bracelets && product.bracelets[0]) || 'Standard';
            const selectedTaille = product.taille || (product.tailles && product.tailles[0]) || '';
            const cartItemId = `${product.id}-${selectedBracelet}-${selectedTaille}`;

            const existingItem = state.items.find(item => item.cartItemId === cartItemId);

            // Si le produit est DÉJÀ dans le panier, on ne touche pas à la quantité
            if (existingItem) {
                return;
            }

            // S'il n'y est pas encore, on l'ajoute avec une quantité de 1
            state.items.push({
                id: product.id,
                cartItemId,
                name: product.name,
                tag: product.tag || 'Luxe',
                img: product.img,
                price: product.price,
                qty: product.qty || 1,
                bracelet: selectedBracelet,
                braceletOptions: product.bracelets || [selectedBracelet],
                taille: selectedTaille,
                tailleOptions: product.tailles || []
            });
        },
        updateQty: (state, action) => {
            const { cartItemId, delta } = action.payload;
            const item = state.items.find(i => i.cartItemId === cartItemId);
            if (item) {
                item.qty = Math.max(1, item.qty + delta);
            }
        },
        updateVariant: (state, action) => {
            const { cartItemId, field, value } = action.payload;
            const item = state.items.find(i => i.cartItemId === cartItemId);
            if (item) {
                item[field] = value;
                item.cartItemId = `${item.id}-${item.bracelet}-${item.taille}`;
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.cartItemId !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, updateQty, updateVariant, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
// MAINTENANT (compte le nombre de produits uniques dans le panier) :
export const selectCartCount = (state) => state.cart.items.length;
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

export default cartSlice.reducer;