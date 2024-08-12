import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddToCart from "../Cart/AddToCart";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/store/product/${id}/`
        );
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image || "default_image.png"}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-primary">{product.name}</h2>
            <p className="text-muted">
              Category: {product.category?.name || "Unknown Category"}
            </p>
            <p>{product.discription}</p>
            <h4 className="text-success">Price: ${product.price}</h4>
            <p>
              <strong>Available Sizes:</strong> {product.avalible_sizes}
            </p>
            <p>
              <strong>Quantity in stock:</strong> {product.product_quantity}
            </p>
            <button className="btn btn-primary">Buy Now</button>
            <AddToCart product_id={id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
