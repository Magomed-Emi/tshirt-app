import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useCart from "../hooks/useCart";

function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/produits/${id}`)
      .then((res) => res.json())
      .then((data) => setProduit(data))
      .catch((err) => console.error("Erreur de chargement du produit :", err));
  }, [id]);

  if (!produit)
    return <p style={{ textAlign: "center" }}>Produit introuvable.</p>;

  const handleAddToCart = () => {
    console.log("✅ CLIC détecté");
    console.log("Produit ajouté :", produit);
    addToCart(produit);
    navigate("/panier"); // ✅ redirection vers panier
  };

  return (
    <div className="produit-detail-container">
      <h1>{produit.nom}</h1>
      <img src={produit.imageUrl} alt={produit.nom} />
      <p>{produit.description}</p>
      <strong>{produit.prix.toFixed(2)} €</strong>

      <br /><br />

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
          backgroundColor: "#111",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🛒 Ajouter au panier
      </button>
    </div>
  );
}

export default ProduitDetail;
