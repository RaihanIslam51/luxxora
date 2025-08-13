import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import ProductCard from "../../../generic reusable component/ProductCard/ProductCard";
import Loader from "../../../generic reusable component/Loader/Loader";

const LatestProduct = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { UserData } = useAuth();

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows × 4 columns
  const [priceFilter, setPriceFilter] = useState(""); // "" | "low" | "high"

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch products only once on mount
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get("/products");
        if (!isMounted) return;

        // Sort by _id descending (newest first)
        const sorted = res.data.sort((a, b) => {
          const idA = a._id.$oid || a._id;
          const idB = b._id.$oid || b._id;
          return idB.localeCompare(idA);
        });

        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (isMounted) setError("Failed to load latest products.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [axiosSecure]);

  const handleCardClick = useCallback(
    (id) => navigate(`/product/${id}`),
    [navigate]
  );

  const toggleWishlist = useCallback(
    async (productId) => {
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

      const isInWishlist = wishlist.includes(productId);
      try {
        if (isInWishlist) {
          await axiosSecure.delete(`/api/wishlist/${productId}`, {
            data: { email: UserData.email },
          });
          setWishlist((prev) => prev.filter((id) => id !== productId));
          Swal.fire({
            icon: "info",
            title: "Removed from wishlist",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: "top-end",
          });
        } else {
          const res = await axiosSecure.post("/api/wishlist", {
            productId,
            email: UserData.email,
          });
          if (res.status === 201 || res.status === 200) {
            setWishlist((prev) => [...prev, productId]);
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
        console.error("Error updating wishlist:", err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: err.message,
        });
      }
    },
    [UserData?.email, wishlist, axiosSecure]
  );

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500 text-xl mt-10">{error}</p>;

  // Apply price filter without affecting newest first order
  const filteredProducts = [...products].sort((a, b) => {
    if (priceFilter === "low") return a.price - b.price;
    if (priceFilter === "high") return b.price - a.price;
    return 0; // default: keep original newest order
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleFilterChange = (e) => {
    setPriceFilter(e.target.value);
    setCurrentPage(1); // reset to first page when filter changes
  };

  return (
    <div className="pt-8 px-4 md:px-0 max-w-screen-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">
        🆕 Latest Products
      </h2>

      {/* Price Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={priceFilter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {currentProducts.map((item) => (
              <ProductCard
                key={item._id.$oid || item._id}
                item={item}
                isWishlisted={wishlist.includes(item._id.$oid || item._id)}
                onToggleWishlist={() =>
                  toggleWishlist(item._id.$oid || item._id)
                }
                onClick={() => handleCardClick(item._id.$oid || item._id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mb-24">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LatestProduct;
