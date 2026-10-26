// src/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remonte instantanément en haut à chaque changement de page
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}