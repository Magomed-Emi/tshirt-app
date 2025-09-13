import { Link } from "react-router-dom";

function CategorieCard({ categorie }) {
  return (
    <Link to={`/produits/${categorie.id_categorie}`} className="card">
      <img src={categorie.image} alt={categorie.nom} />
      <h3>{categorie.nom}</h3>
    </Link>
  );
}

export default CategorieCard;
