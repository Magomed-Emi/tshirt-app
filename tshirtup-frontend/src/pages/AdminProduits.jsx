import { useEffect, useState } from "react";
import "../css/style.css";

function AdminProduits() {
  const [produits, setProduits] = useState([]);
  const [editingProduit, setEditingProduit] = useState(null);
  const [newProduit, setNewProduit] = useState({
    nom: "",
    prix: "",
    description: "",
    image: "",
  });

  const fetchProduits = async () => {
    const res = await fetch("http://localhost:8080/api/produits");
    const data = await res.json();
    setProduits(data);
  };

  useEffect(() => {
    fetchProduits();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    await fetch(`http://localhost:8080/api/produits/${id}`, {
      method: "DELETE",
    });
    setProduits(produits.filter((p) => p.id !== id));
  };

  const handleEdit = (produit) => {
    setEditingProduit(produit);
    setNewProduit({ ...produit }); // Pré-remplir
  };

  const handleChange = (e) => {
    setNewProduit({ ...newProduit, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/produits/${editingProduit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduit),
    });

    setProduits((prev) =>
      prev.map((p) => (p.id === editingProduit.id ? newProduit : p))
    );

    setEditingProduit(null);
    setNewProduit({ nom: "", prix: "", description: "", image: "" });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">🧩 Gestion des produits</h2>

      {editingProduit && (
        <form className="form" onSubmit={handleUpdate}>
          <h3>Modifier le produit</h3>
          <input name="nom" value={newProduit.nom} onChange={handleChange} placeholder="Nom" />
          <input name="prix" value={newProduit.prix} onChange={handleChange} placeholder="Prix" />
          <input name="description" value={newProduit.description} onChange={handleChange} placeholder="Description" />
          <input name="image" value={newProduit.image} onChange={handleChange} placeholder="URL image" />
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditingProduit(null)}>Annuler</button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Prix (€)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td><img src={produit.image} alt={produit.nom} className="admin-img" /></td>
              <td>{produit.nom}</td>
              <td>{produit.prix}</td>
              <td>{produit.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(produit)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(produit.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProduits;
