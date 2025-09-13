import { Link } from "react-router-dom";
import "../css/style.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        <Link to="/confidentialite">Politique de confidentialité</Link> |{" "}
        <Link to="/conditions-vente">Conditions générales de vente</Link>
      </p>
    </footer>
  );
}

export default Footer;
