package com.tshirtup.controller;

import com.tshirtup.model.Produit;
import com.tshirtup.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:5173")
public class ProduitController {

    private final ProduitService produitService;

    @Autowired
    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    //  Obtenir tous les produits
    @GetMapping
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> produits = produitService.getAllProduits();
        return ResponseEntity.ok(produits);
    }

    //  Obtenir un produit par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //  Obtenir les produits d'une catégorie
    @GetMapping("/categorie/{categorieId}")
    public ResponseEntity<List<Produit>> getProduitsByCategorieId(@PathVariable Long categorieId) {
        List<Produit> produits = produitService.getProduitsByCategorieId(categorieId);
        return ResponseEntity.ok(produits);
    }

    //  Créer un nouveau produit
    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestBody Produit produit) {
        Produit savedProduit = produitService.saveProduit(produit);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        return produitService.getProduitById(id)
                .<ResponseEntity<?>>map(existing -> {
                    existing.setNom(produit.getNom());
                    existing.setPrix(produit.getPrix());
                    existing.setDescription(produit.getDescription());
                    existing.setImageUrl(produit.getImageUrl());

                    produitService.saveProduit(existing);
                    return ResponseEntity.ok(existing);
                })
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Produit non trouvé"));
    }





    // Supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduit(@PathVariable Long id) {
        if (produitService.getProduitById(id).isPresent()) {
            produitService.deleteProduit(id);
            return ResponseEntity.ok("Produit supprimé avec succès");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Produit introuvable");
        }
    }
}
