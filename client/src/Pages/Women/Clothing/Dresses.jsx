import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from "sweetalert2";

const ProductCard = ({ item, isWishlisted, onToggleWishlist, onClick }) => {
  return (
     <motion.div
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.3 }}
  onClick={() => onClick(item._id)}
  className="relative flex flex-col rounded-xl p-4 bg-white text-center shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
  style={{ minHeight: "34rem" }}
>
  {/* Wishlist icon */}
  <span
    className="absolute top-3 right-4 text-3xl cursor-pointer z-10 transition-transform duration-300 hover:scale-110"
    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    onClick={(e) => {
      e.stopPropagation();
      onToggleWishlist(item._id);
    }}
  >
    {isWishlisted ? (
      <FaHeart className="text-red-600" />
    ) : (
      <CiHeart className="text-gray-700" />
    )}
  </span>

  {/* Product image */}
  <div className="w-full h-80 flex items-center justify-center bg-white rounded-lg overflow-hidden">
    <img
      src={item.image}
      alt={item.name}
      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Product name */}
  <div
    className="mt-4 mb-2 font-semibold text-xl text-left text-gray-800 break-words whitespace-normal leading-snug line-clamp-2"
    title={item.name}
  >
    {item.name}
  </div>

  {/* ✅ Horizontal Price Section */}
  <div className="flex items-center justify-start gap-4 mt-3">
    {/* Original Price */}
    {item.discountPrice && (
      <span className="line-through text-gray-400 text-base">
        ৳{item.price}
      </span>
    )}

    {/* Discount Price */}
    <span className="text-green-600 text-lg font-bold">
      ৳{item.discountPrice || item.price}
    </span>

    {/* Discount Badge */}
    {item.discount && (
      <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 text-sm font-semibold whitespace-nowrap">
       {item.discount} OFF
      </span>
    )}
  </div>
</motion.div>
  );
};

const  Dresses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get("/products/filter", {
         params: {
            category: "WOMEN",
            subCategory: "Clothing",
            type: "Dresses",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching Denim products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  const toggleWishlist = async (productId) => {
    const isInWishlist = wishlist.includes(productId);

    if (isInWishlist) {
      try {
        await axiosSecure.delete(`/api/wishlist/${productId}`);
        const updatedWishlist = wishlist.filter(id => id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        Swal.fire({
          icon: "info",
          title: "Removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      try {
        const response = await axiosSecure.post("/api/wishlist", { productId });
        if (response.status === 201 || response.status === 200) {
          const updatedWishlist = [...wishlist, productId];
          setWishlist(updatedWishlist);
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          Swal.fire({
            icon: "success",
            title: "Added to wishlist",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: "top-end",
          });
        }
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="pt-33 px-4 md:px-0 max-w-screen-2xl mx-auto">

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No Denim products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              isWishlisted={wishlist.includes(item._id)}
              onToggleWishlist={toggleWishlist}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default  Dresses;
