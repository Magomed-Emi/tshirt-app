import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

function Register() {
  const navigate = useNavigate();

  const [utilisateur, setUtilisateur] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    adresse: "",
    codePostal: "",
    ville: "",
  });

  const handleChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/utilisateurs/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message || "Erreur lors de l'inscription");
      }

      alert(message);

      setUtilisateur({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        adresse: "",
        codePostal: "",
        ville: "",
      });

      navigate("/login");
    } catch (error) {
      alert("Erreur : " + error.message);
      console.error("Erreur inscription :", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="nom" placeholder="Nom" value={utilisateur.nom} onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" value={utilisateur.prenom} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={utilisateur.email} onChange={handleChange} required />
          <input type="password" name="motDePasse" placeholder="Mot de passe" value={utilisateur.motDePasse} onChange={handleChange} required />
          <input type="text" name="adresse" placeholder="Adresse" value={utilisateur.adresse} onChange={handleChange} required />
          <input type="text" name="codePostal" placeholder="Code postal" value={utilisateur.codePostal} onChange={handleChange} required />
          <input type="text" name="ville" placeholder="Ville" value={utilisateur.ville} onChange={handleChange} required />
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
