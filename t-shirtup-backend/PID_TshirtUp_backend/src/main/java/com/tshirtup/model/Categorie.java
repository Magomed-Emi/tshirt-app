package com.tshirtup.model;

import jakarta.persistence.*;
@Entity
public class Categorie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrémentation de l'ID
    private Long id;

    @Column(nullable = false) // Le nom est obligatoire
    private String nom;

    private String description;

    // Constructeur vide obligatoire pour JPA
    public Categorie() {
    }

    // Constructeur utile si on veut créer une catégorie manuellement
    public Categorie(String nom, String description) {
        this.nom = nom;
        this.description = description;
    }

    // Getters et setters classiques

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // Méthode utile pour afficher une catégorie dans la console
    @Override
    public String toString() {
        return "Categorie{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
