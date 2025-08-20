import { motion } from "framer-motion";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ item, isWishlisted, onToggleWishlist, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col rounded-xl p-3 sm:p-4 bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100
                 w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] xl:w-[280px]"
      onClick={() => onClick(item._id)}
    >
      {/* Wishlist icon */}
      <button
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 transition-transform duration-300 hover:scale-110 p-1 sm:p-1.5 rounded-full bg-white/80 backdrop-blur-sm"
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(item._id);
        }}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? (
          <FaHeart className="text-red-600 text-lg sm:text-xl" />
        ) : (
          <CiHeart className="text-gray-600 text-lg sm:text-xl" />
        )}
      </button>

      {/* Product image */}
      <div className="w-full h-36 sm:h-44 md:h-52 lg:h-56 xl:h-64 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product info */}
      <div className="mt-2 sm:mt-3 flex flex-col flex-1 justify-between">
        {/* Product name */}
        <h3
          className="font-semibold text-sm sm:text-base md:text-lg text-gray-900 break-words leading-tight line-clamp-2 mb-2 sm:mb-3"
          title={item.name}
        >
          {item.name}
        </h3>

        {/* Price section */}
        <div className="flex flex-wrap items-center justify-start gap-1 sm:gap-2 md:gap-3 mt-auto">
          {item.discountPrice && (
            <span className="line-through text-gray-400 text-xs sm:text-sm md:text-base lg:text-base">
              ৳{Math.floor(item.price)}
            </span>
          )}
          <span className="text-green-600 font-bold text-sm sm:text-base md:text-lg lg:text-xl">
            ৳{Math.floor(item.discountPrice || item.price)}
          </span>
          {item.discountPrice && (
            <span className="bg-red-100 text-red-600 rounded px-2 py-0.5 text-xs sm:text-sm md:text-base lg:text-base font-semibold whitespace-nowrap">
              {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
