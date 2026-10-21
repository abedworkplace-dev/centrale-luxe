import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './home';
import MainLayout from './mainLayout';
import ProduitDetails from './produitDetails';
import Panier from './panier';
import Contact from './contact';
import Wishlist from './wishlist';
import Faq from './faq';
import Boutique from './boutique';
import './App.css'
import './responsive.css'

function App() {


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}/>
        <Route path="/produit-details" element={<ProduitDetails />}/>
        <Route path="/panier" element={<Panier />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/faq" element={<Faq />}/>
        <Route path="/boutique" element={<Boutique />}/>
      </Route>
    </Routes>
  )
}

export default App
