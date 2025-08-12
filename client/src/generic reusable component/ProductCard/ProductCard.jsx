// src/components/ProductCard.jsx
import { motion } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

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
        {isWishlisted ? <FaHeart className="text-red-600" /> : <CiHeart className="text-gray-700" />}
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

      {/* Price section */}
      <div className="flex items-center justify-start gap-4 mt-3">
        {item.discountPrice && (
          <span className="line-through text-gray-400 text-base">৳{item.price}</span>
        )}
        <span className="text-green-600 text-lg font-bold">৳{item.discountPrice || item.price}</span>
        {item.discount && (
          <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 text-sm font-semibold whitespace-nowrap">
            {item.discount} OFF
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
