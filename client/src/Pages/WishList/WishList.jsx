import React, { useEffect, useState, useMemo, useCallback } from "react";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { UserData } = useAuth();
  const axiosSecure = useMemo(() => useAxiosSecure(), []);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch wishlist with product details
  const fetchWishlist = useCallback(async () => {
    if (!UserData?.email) {
      setError("Please log in to see your wishlist.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosSecure.get("/api/wishlist", {
        params: { email: UserData.email },
      });
      setWishlistItems(response.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  }, [UserData?.email, axiosSecure]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Remove item from wishlist using same API style as ProductList
  const handleRemove = async (productId) => {
    if (!UserData?.email) return;

    try {
      await axiosSecure.delete(`/api/wishlist/${productId}`, {
        data: { email: UserData.email },
      });

      // Remove item locally
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));

      Swal.fire({
        icon: "info",
        title: "Removed from wishlist",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top-end",
      });
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to remove item",
        text: err.message,
      });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading wishlist...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error}
      </div>
    );

  if (!wishlistItems.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Your wishlist is empty 😔
      </div>
    );

  return (
    <div className="min-h-screen pt-30 px-6 py-10 bg-gray-50">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-800">
        💖 Your Wishlist
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map(({ _id, productName, price, image }) => (
          <div
            key={_id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col items-center"
          >
            <img
              src={image}
              alt={productName}
              className="w-full h-48 object-cover rounded-lg mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              {productName}
            </h3>
            <p className="text-green-600 font-bold text-lg mb-4">৳{price}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleCardClick(_id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                See Details
              </button>
              <button
                onClick={() => handleRemove(_id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
