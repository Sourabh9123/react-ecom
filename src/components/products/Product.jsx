import React from "react";
import AddToCart from "../Cart/AddToCart";

const Product = () => {
  return (
    <div className="container mt-5">
      <div className="card" style={{ width: "9rem" }}>
        <img
          src="image.png"
          className="card-img-top"
          style={{ width: "9rem" }}
          alt="..."
        />
        <div className="card-body">
          <p
            className="card-title"
            style={{
              fontSize: "0.7rem", // Makes the title small
              // Makes the title stand out
              textAlign: "center", // Centers the title
              marginBottom: "0.5rem", // Adds a little space below the title
            }}
          >
            This is Awasome Product
          </p>
          <p
            className="card-title"
            style={{
              fontSize: "0.9rem", // Makes the title small
              // Makes the title stand out
              textAlign: "center", // Centers the title
              marginBottom: "0.5rem", // Adds a little space below the title
            }}
          >
            RS.9800
          </p>

          <AddToCart product_id={"d260e0b8-aca3-473a-9f5b-881c7cf82ae6"} />
          <button
            href="#"
            className="btn btn-danger btn-sm  ms-1"
            style={{
              "--bs-btn-padding-y": ".20rem",
              "--bs-btn-padding-x": ".4rem",
              "--bs-btn-font-size": ".50rem",
            }}
          >
            <span> Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
