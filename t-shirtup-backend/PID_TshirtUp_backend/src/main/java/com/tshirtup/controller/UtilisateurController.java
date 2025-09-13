package com.tshirtup.controller;

import com.tshirtup.model.Utilisateur;
import com.tshirtup.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:5173")
public class UtilisateurController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UtilisateurController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ Inscription
    @PostMapping("/inscription")
    public ResponseEntity<String> inscription(@RequestBody Utilisateur utilisateur) {
        if (utilisateurRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email déjà utilisé.");
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateurRepository.save(utilisateur);
        return ResponseEntity.status(HttpStatus.CREATED).body("Inscription réussie.");
    }

    // ✅ Connexion avec retour de rôle (isAdmin)
    @PostMapping("/connexion")
    public ResponseEntity<?> connexion(@RequestBody Utilisateur credentials) {
        Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(credentials.getEmail());
        if (userOpt.isPresent()) {
            Utilisateur user = userOpt.get();
            if (passwordEncoder.matches(credentials.getMotDePasse(), user.getMotDePasse())) {

                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("nom", user.getNom());
                response.put("prenom", user.getPrenom());
                response.put("email", user.getEmail());
                response.put("adresse", user.getAdresse());
                response.put("codePostal", user.getCodePostal());
                response.put("ville", user.getVille());
                response.put("isAdmin", user.isAdmin()); // ✅ rôle envoyé

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants invalides.");
    }

    // ✅ Mise à jour du profil
    @PutMapping("/{id}")
    public ResponseEntity<String> modifierUtilisateur(@PathVariable Long id, @RequestBody Utilisateur updated) {
        Optional<Utilisateur> existing = utilisateurRepository.findById(id);
        if (existing.isPresent()) {
            Utilisateur user = existing.get();

            // ✅ Vérifie que l'email n'est pas déjà pris
            if (!user.getEmail().equals(updated.getEmail()) &&
                    utilisateurRepository.findByEmail(updated.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email déjà utilisé.");
            }

            user.setNom(updated.getNom());
            user.setPrenom(updated.getPrenom());
            user.setEmail(updated.getEmail());
            user.setAdresse(updated.getAdresse());
            user.setCodePostal(updated.getCodePostal());
            user.setVille(updated.getVille());

            utilisateurRepository.save(user);
            return ResponseEntity.ok("Informations mises à jour.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur introuvable.");
    }
}
