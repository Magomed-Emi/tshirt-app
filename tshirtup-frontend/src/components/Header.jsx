import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [prenom, setPrenom] = useState("");
  const [estConnecte, setEstConnecte] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("estConnecte") === "true";
    const storedPrenom = localStorage.getItem("prenom") || "";
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    setEstConnecte(loggedIn);
    setPrenom(storedPrenom);
    setIsAdmin(adminFlag);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setEstConnecte(false);
    setPrenom("");
    setIsAdmin(false);
    navigate("/");
    setTimeout(() => window.location.reload(), 50);
  };

  return (
    <header style={{ padding: "1rem", textAlign: "center" }}>
      <Link to="/">Accueil</Link>{" "}
      {!estConnecte ? (
        <>
          <Link to="/register" style={{ margin: "0 1rem" }}>Inscription</Link>
          <Link to="/login">Connexion</Link>
        </>
      ) : (
        <>
          <Link to="/profil" style={{ margin: "0 1rem" }}>Profil</Link>
        </>
      )}

      <Link to="/panier" style={{ margin: "0 1rem" }}>Panier</Link>

      {isAdmin && (
        <Link to="/admin-produits" style={{ margin: "0 1rem", color: "#e84a4a" }}>
          Admin
        </Link>
      )}

      {estConnecte && (
        <>
          <span style={{ marginLeft: "1rem", fontWeight: "bold", color: "#4a4afc" }}>
            Bienvenue, {prenom}
          </span>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "1rem",
              backgroundColor: "#444",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Déconnexion
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
