import allProduits from "./allProduits.js";
import fetch from "node-fetch";

for (const p of allProduits) {
  try {
    // Vérifie d'abord si le produit existe
    const check = await fetch(`http://localhost:8080/api/produits/nom/${encodeURIComponent(p.nom)}`);
    if (check.ok) {
      const exists = await check.json();
      if (exists) {
        console.log(`⏭️ Déjà existant : ${p.nom}`);
        continue; // ne pas réinsérer
      }
    }

    const produit = {
      nom: p.nom,
      description: p.description,
      prix: p.prix,
      imageUrl: p.image,
      categorie: {
        id: p.id_categorie
      }
    };

    const response = await fetch("http://localhost:8080/api/produits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produit)
    });

    if (!response.ok) {
      console.error(`❌ Erreur pour ${p.nom} :`, response.statusText);
    } else {
      console.log(`✅ Inséré : ${p.nom}`);
    }
  } catch (error) {
    console.error(`⚠️ Erreur réseau pour ${p.nom} :`, error);
  }
}
