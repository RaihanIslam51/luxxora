import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../generic reusable component/Loader/Loader";
import ProductCard from "../../../generic reusable component/ProductCard/ProductCard";

const ViewAllK = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [sortFilter, setSortFilter] = useState("newest");

  const { UserData } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch KID products
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axiosSecure.get("/api/kid-products");
        if (!isMounted) return;

        if (!res.data || res.data.length === 0) {
          setProducts([]);
          return;
        }

        // Sort by newest first
        const sorted = res.data.sort((a, b) => {
          const idA = a._id?.$oid || a._id;
          const idB = b._id?.$oid || b._id;
          return idB.localeCompare(idA);
        });

        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch KID products:", err);
        if (isMounted) setError("Failed to load products. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCardClick = useCallback(
    (id) => navigate(`/product/${id}`),
    [navigate]
  );

  // Handle wishlist toggle
  const handleToggleWishlist = async (productId) => {
    if (!UserData?.email) {
      // Show login prompt (could add a toast notification here)
      return;
    }

    const isInWishlist = wishlist.includes(productId);
    
    try {
      if (isInWishlist) {
        await axiosSecure.delete(`/api/wishlist/${productId}`, {
          data: { email: UserData.email },
        });
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        await axiosSecure.post("/api/wishlist", {
          productId,
          email: UserData.email,
        });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
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
    const idA = a._id?.$oid || a._id;
    const idB = b._id?.$oid || b._id;
    return idB.localeCompare(idA);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleSortChange = (e) => {
    setSortFilter(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="min-h-screen pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kids Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover adorable and comfortable clothing for your little ones, designed for play and special occasions.
          </p>
        </div>

        {/* Filters and Results Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} products
          </div>
          
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
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

        {/* Products Grid */}
        {currentProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🧒</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products available</h3>
            <p className="text-gray-500">Check back later for new arrivals in our kids' collection.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {currentProducts.map((item) => {
                const productId = item._id?.$oid || item._id;
                return (
                  <div key={productId} className="w-full">
                    <ProductCard
                      item={item}
                      isWishlisted={wishlist.includes(productId)}
                      onToggleWishlist={() => handleToggleWishlist(productId)}
                      onClick={() => handleCardClick(productId)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage <= 2) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 1) {
                        pageNum = totalPages - 2 + i;
                      } else {
                        pageNum = currentPage - 1 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border transition ${
                            currentPage === pageNum
                              ? "bg-black text-white border-black"
                              : "border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Ellipsis for many pages */}
                    {totalPages > 3 && currentPage < totalPages - 1 && (
                      <span className="px-1 text-gray-500">...</span>
                    )}

                    {/* Show last page if not in current view */}
                    {totalPages > 3 && currentPage < totalPages - 1 && (
                      <button
                        onClick={() => goToPage(totalPages)}
                        className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg border transition ${
                          currentPage === totalPages
                            ? "bg-black text-white border-black"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>

                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Page info for mobile */}
                <div className="text-sm text-gray-600 sm:hidden">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ViewAllK;