import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../generic reusable component/Loader/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  // const [imageGallery] = useState([
  //   "/product1.jpg",
  //   "/product2.jpg",
  //   "/product3.jpg",
  //   "/product4.jpg"
  // ]);

   useEffect(() => {
   
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

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

  const whatsappNumber = "8801711923309";

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Please select a size",
        confirmButtonColor: "#000",
        background: "#fff",
        color: "#000"
      });
      return;
    }
    if (!quantity || quantity <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select a valid quantity",
        confirmButtonColor: "#000",
        background: "#fff",
        color: "#000"
      });
      return;
    }

    const productName = product.name;
    const price = product.discountPrice || product.price;
    const size = selectedSize;
    const qty = quantity;
    const imageUrl = product.image;

    const message = `🛍️ *New Order Enquiry* 🛍️

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

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const discountAmount = Math.max(
    0,
    Math.floor(product.price) - Math.ceil(product.discountPrice || product.price)
  );

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-34 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <button
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-gray-700 transition flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="text-gray-500">Product Details</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Left - Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center h-96 overflow-hidden">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.image}
                alt={product.name}
                className="max-h-80 w-auto object-contain"
              />
            </div>

            {/* Image Gallery */}
            {/* <div className="grid grid-cols-4 gap-3">
              {imageGallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`bg-white rounded-xl p-2 border-2 transition-all ${
                    currentImage === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-16 w-full object-contain"
                  />
                </button>
              ))}
            </div> */}
          </motion.div>

          {/* Right - Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-6 md:p-8"
          >
            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                ৳{product.discountPrice ? Math.ceil(product.discountPrice) : Math.floor(product.price)}
              </p>
              
              {product.discountPrice && (
                <>
                  <p className="text-xl text-gray-400 line-through">
                    ৳{Math.floor(product.price)}
                  </p>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "bg-black text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                Quantity
              </h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-l-lg border-r border-gray-200 hover:bg-gray-200 transition"
                  disabled={quantity <= 1}
                >
                  <span className="text-lg">-</span>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 h-10 text-center border-t border-b border-gray-200 focus:outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-r-lg border-l border-gray-200 hover:bg-gray-200 transition"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-4">
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping on orders over 5000
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  7-day return policy
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure payment
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {["description", "details", "shipping", "returns"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-center font-medium text-sm md:text-base border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "No description available for this product."}
                </p>
              </div>
            )}
            
            {activeTab === "details" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.details || "No additional details available."}
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong>Material:</strong> Premium quality fabric</li>
                  <li><strong>Care:</strong> Machine wash cold, tumble dry low</li>
                  <li><strong>Origin:</strong> Imported</li>
                </ul>
              </div>
            )}
            
            {activeTab === "shipping" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  We offer fast and reliable shipping options. Most orders are processed within 24 hours and delivered within 3-5 business days.
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong>Standard Shipping:</strong> 3-5 business days - $4.99</li>
                  <li><strong>Express Shipping:</strong> 2-3 business days - $9.99</li>
                  <li><strong>Free Shipping:</strong> On all orders over $50</li>
                </ul>
              </div>
            )}
            
            {activeTab === "returns" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  We want you to be completely satisfied with your purchase. If you're not happy for any reason, we accept returns within 30 days of purchase.
                </p>
                <ul className="mt-4 space-y-2">
                  <li><strong>Return Period:</strong> 30 days from delivery date</li>
                  <li><strong>Condition:</strong> Items must be unworn, unwashed, and with original tags attached</li>
                  <li><strong>Process:</strong> Initiate return through our website or contact customer service</li>
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;