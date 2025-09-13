package com.tshirtup.service;

import com.tshirtup.model.Produit;
import com.tshirtup.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    private final ProduitRepository produitRepository;

    @Autowired
    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    public List<Produit> getProduitsByCategorieId(Long categorieId) {
        return produitRepository.findByCategorieId(categorieId);
    }

    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    // ✅ Ajout : suppression d’un produit
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}
