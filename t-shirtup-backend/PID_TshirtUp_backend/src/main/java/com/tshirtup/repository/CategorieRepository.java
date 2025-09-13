package com.tshirtup.repository;


import com.tshirtup.model.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interface pour accéder aux catégories depuis la base de données.
 * Étend JpaRepository pour avoir les méthodes classiques : findAll(), findById(), etc.
 */
public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}
