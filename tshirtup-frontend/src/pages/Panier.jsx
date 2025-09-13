import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import "../css/style.css";

function Panier() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, p) => acc + p.prix * p.quantite, 0);

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h1>Mon Panier</h1>

        {cart.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cart.map((p) => (
                <div key={p.id} className="cart-item">
                  <Link to={`/produit/${p.id}`}>
                    <img src={p.imageUrl} alt={p.nom} className="cart-img" />
                  </Link>
                  <div className="cart-details">
                    <Link to={`/produit/${p.id}`} className="produit-nom">
                      <h3>{p.nom}</h3>
                    </Link>
                    <p>{p.prix.toFixed(2)} €</p>
                    <div className="cart-actions">
                      <input
                        type="number"
                        value={p.quantite}
                        min={1}
                        onChange={(e) =>
                          updateQuantity(p.id, parseInt(e.target.value))
                        }
                      />
                      <button onClick={() => removeFromCart(p.id)}>Retirer</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h2>Total : {total.toFixed(2)} €</h2>
            <button onClick={clearCart}>Vider le panier</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Panier;