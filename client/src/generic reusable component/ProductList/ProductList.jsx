// src/components/ProductList.jsx
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSesure from "../../Hook/useAxiosSecure";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { useState } from "react";

const ProductList = ({ category, subCategory, type }) => {
  const axiosSecure = useAxiosSesure();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Fetch products with TanStack Query
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", category, subCategory, type],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/filter", {
        params: { category, subCategory, type },
      });
      return res.data;
    },
  });

  const toggleWishlist = async (productId) => {
    const isInWishlist = wishlist.includes(productId);

    if (isInWishlist) {
      try {
        await axiosSecure.delete(`/api/wishlist/${productId}`);
        const updatedWishlist = wishlist.filter((id) => id !== productId);
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

  // ✅ Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // ✅ Handle error state
  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error loading products: {error.message}
      </p>
    );
  }

  return (
    <div className="pt-33 px-4 md:px-0 max-w-screen-2xl mx-auto">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
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

export default ProductList;
