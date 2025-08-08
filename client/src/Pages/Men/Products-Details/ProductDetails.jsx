import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch product details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [axiosSecure, id]);

  // Your WhatsApp number in international format without '+' or '00'
  const whatsappNumber = "8801723148545";

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Please select a size",
        confirmButtonColor: "#d33",
      });
      return;
    }
    if (!quantity || quantity <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select a valid quantity",
        confirmButtonColor: "#d33",
      });
      return;
    }

    const productName = product.name;
    const price = product.discountPrice || product.price;
    const size = selectedSize;
    const qty = quantity;
    const imageUrl = product.image;

    const message = 
`🛍️ *New Order Enquiry* 🛍️

*Product:* ${productName}
*Price:* ৳${price}
*Size:* ${size}
*Quantity:* ${qty}

✨ Please provide details on availability and payment options.

👇 Product Image Preview:
${imageUrl}

Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        ⏳ Loading Product Details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 text-xl">
        ❌ Product not found
      </div>
    );
  }

  const discountAmount = Math.max(
    0,
    product.price - (product.discountPrice || product.price)
  );

  return (
    <div className="min-h-screen pt-29 px-4 md:px-20 bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-700 text-white font-semibold hover:bg-purple-800 transition shadow-lg"
        aria-label="Go back"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        {/* Left - Product Image with zoom on hover */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 flex justify-center items-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[520px] w-full object-contain rounded-xl transition-transform duration-500 hover:scale-105 cursor-zoom-in"
          />
        </motion.div>

        {/* Right - Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-wide">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-5">
              <p className="text-3xl font-bold text-green-600">
                ৳{product.discountPrice || product.price}
              </p>
              {product.discountPrice && (
                <p className="text-gray-400 line-through text-xl">
                  ৳{product.price}
                </p>
              )}
              {discountAmount > 0 && (
                <p className="text-red-500 font-semibold text-lg bg-red-100 px-3 py-1 rounded-full shadow-sm">
                  🔥 Save ৳{discountAmount}
                </p>
              )}
            </div>

            {/* Size Selection Buttons */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                Select Size:
              </label>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full font-semibold transition 
                      ${
                        selectedSize === size
                          ? "bg-purple-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-purple-200"
                      }
                    `}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-lg"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-extrabold text-xl shadow-lg hover:from-pink-500 hover:to-orange-400 transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        <div className="flex space-x-8 border-b-2 pb-3 mb-6 text-lg font-semibold text-gray-600">
          {["description", "details", "returns"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 border-b-4 transition-all ${
                activeTab === tab
                  ? "border-purple-600 text-purple-600 font-bold"
                  : "border-transparent hover:text-purple-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="text-gray-700 text-lg leading-relaxed min-h-[100px]">
          {activeTab === "description" && (
            <p>{product.description || "No description available for this product."}</p>
          )}
          {activeTab === "details" && (
            <p>{product.details || "No additional details available."}</p>
          )}
          {activeTab === "returns" && (
            <p>
              Returns accepted within 7 days of purchase. Product must be unused and
              in original packaging. Contact support for more info.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
