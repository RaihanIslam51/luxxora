import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../generic reusable component/Loader/Loader";
import ProductCard from "../../../generic reusable component/ProductCard/ProductCard";

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
  const itemsPerPage = 8; // 2 rows × 4 columns on larger screens
  const [sortFilter, setSortFilter] = useState("newest"); // "newest" | "price-low" | "price-high"

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch products on mount
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
          background: "#fff",
          color: "#000",
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
            background: "#fff",
            color: "#000",
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
              background: "#fff",
              color: "#000",
            });
          }
        }
      } catch (err) {
        console.error("Error updating wishlist:", err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: err.message,
          background: "#fff",
          color: "#000",
        });
      }
    },
    [UserData?.email, wishlist, axiosSecure]
  );

  if (loading)
    return (
      <div className="py-16">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="py-16 text-center">
        <div className="p-6 rounded-2xl shadow-md max-w-md mx-auto">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-700 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  // Apply sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortFilter === "price-low") return a.price - b.price;
    if (sortFilter === "price-high") return b.price - a.price;
    // Default: newest first
    const idA = a._id.$oid || a._id;
    const idB = b._id.$oid || b._id;
    return idB.localeCompare(idA);
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
    setCurrentPage(1); // reset to first page
  };

  const goToPage = (page) => setCurrentPage(page);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our newest arrivals, carefully curated to bring you the latest trends and styles.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIdx + 1}-
            {Math.min(startIdx + itemsPerPage, sortedProducts.length)} of{" "}
            {sortedProducts.length} products
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm font-medium text-gray-700 whitespace-nowrap"
            >
              Sort by:
            </label>
            <select
              id="sort"
              value={sortFilter}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products available
            </h3>
            <p className="text-gray-500">Check back later for new arrivals.</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
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
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-4 flex-wrap">
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`flex items-center justify-center w-10 h-10 rounded-lg border transition ${
                        currentPage === pageNum
                          ? "bg-black text-white border-black"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Ellipsis */}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LatestProduct;
