
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const Sweatshirt = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch T-shirt Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products/filter", {
          params: {
            category: "MEN",
            subCategory: "Clothing",
            type: "Sweatshirt",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching T-shirts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        👕 Men's Clothing - T-Shirts
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No T-shirts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-3 text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sweatshirt;

