import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Produits from "./pages/Produits";
import ProduitDetail from "./pages/ProduitDetail";
import Profil from "./pages/Profil";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsVente from "./pages/ConditionsVente";
import Panier from "./pages/Panier"; // ✅ Ajouté ici
import AdminProduits from "./pages/AdminProduits"; // ✅ Ajouté ici
import Header from "./components/Header";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import "./css/style.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produits/:categorieId" element={<Produits />} />
        <Route path="/produit/:id" element={<ProduitDetail />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/admin-produits" element={<AdminProduits />} /> {/* ✅ Route ajoutée pour US12 */}
        <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/conditions-vente" element={<ConditionsVente />} />
      </Routes>
      <CookieConsent />
      <Footer />
    </Router>
  );
}

export default App;
