






import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const SoftAccessories= () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Leather Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products/filter", {
          params: {
            category: "WOMEN",
            subCategory: "Accessories",
            type: "Soft Accessories",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Leather products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🧥 Men's Clothing - Leather
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No Leather products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative border border-gray-200 rounded-xl p-4 bg-white text-center shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Wishlist icon */}
              <span
                className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer select-none"
                title="Add to wishlist"
              >
                <CiHeart />
              </span>

              {/* Product image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover rounded-md transition-transform duration-300 hover:scale-105"
              />

              {/* Product name */}
              <div
                className="mt-4 mb-2 font-semibold text-lg text-left truncate"
                title={item.name}
              >
                {item.name}
              </div>

              {/* Price section */}
              <div className="flex items-center justify-start space-x-2">
                <span className="line-through text-gray-400">
                  ৳{item.price}
                </span>
                <span className="text-green-600 font-bold">
                  ৳{item.discountPrice}
                </span>
                {item.discount && (
                  <span className="bg-red-100 text-red-600 rounded px-3 py-1 text-sm font-bold ml-2">
                    {item.discount} OFF
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoftAccessories;
