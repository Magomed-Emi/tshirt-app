import { useEffect, useState } from "react";
import "../css/style.css"; // Ou un fichier CSS contenant .cookie-banner

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience.
        En continuant, vous acceptez notre{" "}
        <a href="/politique-confidentialite" style={{ textDecoration: "underline" }}>
          politique de confidentialité
        </a>.
      </p>
      <button onClick={handleAccept}>Accepter</button>
    </div>
  );
}

export default CookieConsent;
