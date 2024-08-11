import React, { useEffect, useState } from "react";
import AddToCart from "../Cart/AddToCart";
import axios from "axios";

const Product = () => {
  const [productItems, setProductItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://localhost:8000/api/store/product/";

      const response = await axios.get(url);
      if (response.status === 200) {
        // console.log(response);
        await setProductItems(response.data.results);
        console.log(response.data.results);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {productItems.map((item) => (
            <div className="col-2 mt-2" key={item.id}>
              <div className="card" style={{ width: "9rem" }}>
                <img
                  src={item.image || "image.png"}
                  className="card-img-top"
                  style={{ width: "9rem" }}
                  alt={item.name}
                />
                <div className="card-body">
                  <p
                    className="card-title"
                    style={{
                      fontSize: "0.7rem", // Makes the title small
                      textAlign: "center", // Centers the title
                      marginBottom: "0.5rem", // Adds a little space below the title
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="card-title"
                    style={{
                      fontSize: "0.9rem", // Makes the title small
                      textAlign: "center", // Centers the title
                      marginBottom: "0.5rem", // Adds a little space below the title
                    }}
                  >
                    RS.{item.price}
                  </p>

                  <AddToCart product_id={item.id} />
                  <button
                    className="btn btn-danger btn-sm ms-1"
                    style={{
                      "--bs-btn-padding-y": ".20rem",
                      "--bs-btn-padding-x": ".4rem",
                      "--bs-btn-font-size": ".50rem",
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
