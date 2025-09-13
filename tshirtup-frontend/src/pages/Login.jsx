import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", motDePasse: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/utilisateurs/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Identifiants invalides");
      }

      const utilisateur = await response.json();

      // ✅ Stockage complet, incluant isAdmin
      localStorage.setItem("estConnecte", "true");
      localStorage.setItem("id", utilisateur.id);
      localStorage.setItem("nom", utilisateur.nom);
      localStorage.setItem("prenom", utilisateur.prenom);
      localStorage.setItem("email", utilisateur.email);
      localStorage.setItem("adresse", utilisateur.adresse || "");
      localStorage.setItem("codePostal", utilisateur.codePostal || "");
      localStorage.setItem("ville", utilisateur.ville || "");
      localStorage.setItem("isAdmin", utilisateur.isAdmin ? "true" : "false");

      alert("Connexion réussie !");
      navigate("/");
      setTimeout(() => window.location.reload(), 50);
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="motDePasse"
            placeholder="Mot de passe"
            onChange={handleChange}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
