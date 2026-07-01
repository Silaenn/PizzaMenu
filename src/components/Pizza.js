import { useCart } from "./CartContext";

function Pizza({ pizzaObj, index }) {
  const { dispatch } = useCart();

  return (
    <li
      className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}
      style={{ animationDelay: `${(index || 0) * 0.1}s` }}
    >
      <div className="pizza-img-wrapper">
        <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      </div>
      <div className="pizza-body">
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <div className="pizza-footer">
          <span className="pizza-price">
            {pizzaObj.soldOut ? "SOLD OUT" : `$${pizzaObj.price}`}
          </span>
          {!pizzaObj.soldOut && (
            <button
              className="btn btn-add"
              onClick={() =>
                dispatch({
                  type: "ADD_ITEM",
                  payload: {
                    id: pizzaObj.name,
                    name: pizzaObj.name,
                    price: pizzaObj.price,
                    photoName: pizzaObj.photoName,
                  },
                })
              }
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Pizza;
