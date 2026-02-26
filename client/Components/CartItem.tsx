import { useState } from "react";

function CartItem() {
  const [quantity, setQuantity] = useState(1); // Initial quantity = 1

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="container mt-4 text-center">
      <h4>🛍 Product: iPhone 15 Pro</h4>
      <p>Price: $1000</p>

      <div className="d-flex justify-content-center align-items-center gap-3">
        <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>
          –
        </button>

        <span className="fw-bold">{quantity}</span>

        <button className="btn btn-outline-secondary" onClick={increaseQuantity}>
          +
        </button>
      </div>

      <p className="mt-3">
        Total: <strong>${(1000 * quantity)}</strong>
      </p>
    </div>
  );
}

export default CartItem;
