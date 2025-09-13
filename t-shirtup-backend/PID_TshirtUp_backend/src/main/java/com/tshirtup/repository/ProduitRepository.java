package com.tshirtup.repository;

import com.tshirtup.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // ✅ Méthode clé pour rechercher les produits par catégorie
    List<Produit> findByCategorieId(Long categorieId);
}
