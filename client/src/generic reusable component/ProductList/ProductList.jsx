// src/components/ProductList.jsx
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import useAuth from "../../Hook/useAuth";

const ProductList = ({ category, subCategory, type }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { UserData } = useAuth();

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [loadingDetail, setLoadingDetail] = useState(false); // Loader for card click

  // Persist wishlist in localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch products
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products", category, subCategory, type],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/filter", {
        params: { category, subCategory, type },
      });
      return res.data;
    },
  });

  // Wishlist toggle
  const toggleWishlist = async (productId) => {
    if (!UserData?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Please login to manage wishlist",
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: "top-end",
      });
    }

    try {
      const isInWishlist = wishlist.includes(productId);

      if (isInWishlist) {
        await axiosSecure.delete(`/api/wishlist/${productId}`, {
          data: { email: UserData.email },
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        Swal.fire({
          icon: "info",
          title: "Removed from wishlist",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: "top-end",
        });
      } else {
        const response = await axiosSecure.post("/api/wishlist", {
          productId,
          email: UserData.email,
        });

        if (response.status === 201 || response.status === 200) {
          setWishlist([...wishlist, productId]);
          Swal.fire({
            icon: "success",
            title: "Added to wishlist",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: "top-end",
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message,
        showConfirmButton: true,
      });
    }
  };

  // Card click handler with loader
  const handleCardClick = (id) => {
    setLoadingDetail(true); // show loader immediately
    setTimeout(() => {
      navigate(`/product/${id}`);
    }, 250); // small delay for smooth UX
  };

  // Show loader if fetching products or navigating
  if (isLoading || loadingDetail) return <Loader />;

  if (isError)
    return (
      <p className="text-center text-red-500">
        Error loading products: {error.message}
      </p>
    );

  return (
    <div className="pt-8 px-4 md:px-0 max-w-screen-2xl mx-auto">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              isWishlisted={wishlist.includes(item._id)}
              onToggleWishlist={() => toggleWishlist(item._id)}
              onClick={() => handleCardClick(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
