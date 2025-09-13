package com.tshirtup;

import com.tshirtup.model.Categorie;
import com.tshirtup.model.Produit;
import com.tshirtup.repository.CategorieRepository;
import com.tshirtup.repository.ProduitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

/**
 * Classe pour insérer des données de test dans la base de données au démarrage.
 */
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(CategorieRepository categorieRepository, ProduitRepository produitRepository) {
        return args -> {

            if (categorieRepository.count() == 0) {
                Categorie cat1 = new Categorie("T-shirts", "Tous les t-shirts disponibles");
                categorieRepository.save(cat1);



                Produit p1 = new Produit("T-shirt blanc", "Un basique élégant", new BigDecimal("19.99"), "image1.jpg", cat1);
                Produit p2 = new Produit("T-shirt noir", "Sobre et efficace", new BigDecimal("21.99"), "image2.jpg", cat1);



                produitRepository.save(p1);
                produitRepository.save(p2);

                System.out.println("✅ Données test insérées avec succès !");
            } else {
                System.out.println("ℹ️ Les données existent déjà, insertion ignorée.");
            }
        };
    }
}
