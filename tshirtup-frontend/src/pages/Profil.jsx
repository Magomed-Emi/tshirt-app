import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

function Profil() {
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState({
    id: null,
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    codePostal: "",
    ville: "",
  });

  useEffect(() => {
    const estConnecte = localStorage.getItem("estConnecte") === "true";
    if (!estConnecte) {
      navigate("/login");
    }

    const id = localStorage.getItem("id");
    const nom = localStorage.getItem("nom") || "";
    const prenom = localStorage.getItem("prenom") || "";
    const email = localStorage.getItem("email") || "";
    const adresse = localStorage.getItem("adresse") || "";
    const codePostal = localStorage.getItem("codePostal") || "";
    const ville = localStorage.getItem("ville") || "";

    setUtilisateur({ id, nom, prenom, email, adresse, codePostal, ville });
  }, [navigate]);

  const handleChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/utilisateurs/${utilisateur.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(utilisateur),
      });

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message);
      }

      alert("Profil mis à jour !");
      localStorage.setItem("nom", utilisateur.nom);
      localStorage.setItem("prenom", utilisateur.prenom);
      localStorage.setItem("email", utilisateur.email);
      localStorage.setItem("adresse", utilisateur.adresse);
      localStorage.setItem("codePostal", utilisateur.codePostal);
      localStorage.setItem("ville", utilisateur.ville);
      navigate("/");
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h1>Mon profil</h1>
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="nom" placeholder="Nom" value={utilisateur.nom} onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" value={utilisateur.prenom} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={utilisateur.email} onChange={handleChange} required />
          <input type="text" name="adresse" placeholder="Adresse" value={utilisateur.adresse} onChange={handleChange} required />
          <input type="text" name="codePostal" placeholder="Code postal" value={utilisateur.codePostal} onChange={handleChange} required />
          <input type="text" name="ville" placeholder="Ville" value={utilisateur.ville} onChange={handleChange} required />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
}

export default Profil;
