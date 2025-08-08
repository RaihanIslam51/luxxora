import React, { useEffect, useState } from "react";
import useAuth from "../../Hook/useAuth";

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { UserData } = useAuth();

  useEffect(() => {
    const email = UserData?.email;
    if (!email) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }
    console.log("wishlist", email);
    

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/wishlist?email=${encodeURIComponent(email)}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setWishlistItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [UserData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading wishlist...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Your wishlist is empty 😔
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-800">
        💖 Your Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlistItems.map(({ _id, productName, price, image }) => (
          <div
            key={_id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col items-center"
          >
            <img
              src={image}
              alt={productName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              {productName}
            </h3>
            <p className="text-green-600 font-bold text-lg">৳{price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
