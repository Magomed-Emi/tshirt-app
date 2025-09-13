import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const nomsCategories = {
  1: "T-shirts Classiques",
  2: "T-shirts Graphiques",
  3: "T-shirts Sport",
  4: "Éditions limitées",
  5: "T-shirts personnalisés"
};

function Produits() {
  const { categorieId } = useParams();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const url = categorieId
      ? `http://localhost:8080/api/produits/categorie/${categorieId}`
      : `http://localhost:8080/api/produits`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProduits(data))
      .catch((err) => console.error("Erreur de chargement des produits :", err));
  }, [categorieId]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        {categorieId
          ? `Catégorie : ${nomsCategories[categorieId] || "Inconnue"}`
          : "Tous les produits"}
      </h1>

      <div className="grid">
        {produits.length === 0 ? (
          <p>Aucun produit trouvé.</p>
        ) : (
          produits.map((p) => (
            <Link to={`/produit/${p.id}`} key={p.id} className="card">
              <img src={p.imageUrl} alt={p.nom} />
              <h3>{p.nom}</h3>
              <p>{p.description}</p>
              <strong>{p.prix.toFixed(2)} €</strong>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Produits;
