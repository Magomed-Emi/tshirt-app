/*package com.tshirtup.controller;

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
public class UtilisateurController {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    // ✅ Constructeur principal
    @Autowired
    public UtilisateurController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ Constructeur pour les tests unitaires
    public UtilisateurController(UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder, boolean forTesting) {
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

    // ✅ Connexion avec renvoi de isAdmin
    @PostMapping("/connexion")
    public ResponseEntity<?> connexion(@RequestBody Utilisateur credentials) {
        Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(credentials.getEmail());
        if (userOpt.isPresent()) {
            Utilisateur user = userOpt.get();
            if (passwordEncoder.matches(credentials.getMotDePasse(), user.getMotDePasse())) {

                Map<String, Object> data = new HashMap<>();
                data.put("id", user.getId());
                data.put("prenom", user.getPrenom());
                data.put("email", user.getEmail());
                data.put("isAdmin", user.isAdmin()); // ✅ Ajout du rôle admin

                return ResponseEntity.ok(data);
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

            // ✅ Empêcher doublons email
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
*/