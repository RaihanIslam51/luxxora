// src/components/ViewAllW.jsx
import React, { useEffect, useState } from "react";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../../generic reusable component/Loader/Loader";
import ProductCard from "../../../generic reusable component/ProductCard/ProductCard";

const ViewAllK= () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 2 rows × 4 columns
  const [priceFilter, setPriceFilter] = useState(""); // "" | "low" | "high"

  const { UserData } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch WOMEN products (fixed: only called once)
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

        // Sort by newest first (descending _id)
        const sorted = res.data.sort((a, b) => {
          const idA = a._id?.$oid || a._id;
          const idB = b._id?.$oid || b._id;
          return idB.localeCompare(idA);
        });

        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch WOMEN products:", err);
        if (isMounted) setError("Failed to load products. Please try again later.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
    // ✅ Removed axiosSecure from dependency array to avoid repeated calls
  }, []);

  // Handle wishlist toggle
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className=" px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center justify-center">
        <p className="text-center text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Apply price filter without breaking newest-first order
  const filteredProducts = [...products].sort((a, b) => {
    if (priceFilter === "low") return a.price - b.price;
    if (priceFilter === "high") return b.price - a.price;
    return 0; // keep newest first
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleFilterChange = (e) => {
    setPriceFilter(e.target.value);
    setCurrentPage(1); // reset page on filter change
  };

  return (
    <div className="pt-30 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-800">
        KID's All Products
      </h1>

      {/* Price Filter */}
      <div className="flex justify-end mb-6">
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

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {currentProducts.map((item) => {
            const productId = item._id?.$oid || item._id;
            return (
              <ProductCard
                key={productId}
                item={item}
                isWishlisted={wishlist.includes(productId)}
                onToggleWishlist={() => handleToggleWishlist(productId)}
                onClick={() => console.log("Clicked product ID:", productId)}
              />
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default ViewAllK;
