import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Product:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product error:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const handleAddToCart = async () => {
    if(!localStorage.getItem('access_token')){
      window.location.href='/login';
      return;
    }
    const token = localStorage.getItem("access_token");

    console.log("Token:", token);
    console.log("Product:", product);

    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">

      <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">

        <div className="flex flex-col md:flex-row gap-8">

          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />

          <div className="flex-1">

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-4">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-green-600 mb-6">
              ${product.price}
            </p>

            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart 🛒
            </button>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-blue-600 hover:underline"
              >
                ← Back to Home
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;