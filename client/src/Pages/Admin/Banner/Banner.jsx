import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerType, setBannerType] = useState("");
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=36f47c5ee620bb292f8a6a4a24adb091`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.success) {
        setBannerImage(data.data.url);
        Swal.fire({
          icon: "success",
          title: "Image uploaded! Please preview.",
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
        Swal.fire("Error", "Failed to upload image!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  // Save banner handler
  const handleSaveBanner = async () => {
    if (!bannerImage) {
      return Swal.fire("Warning", "Please upload an image first!", "warning");
    }
    if (!bannerType) {
      return Swal.fire("Warning", "Please select a banner type!", "warning");
    }

    try {
      const res = await axiosSecure.post("/banners", {
        imageUrl: bannerImage,
        type: bannerType,
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Banner added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setBannerImage(null);
        setBannerType("");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to save banner!", "error");
    }
  };

  // Fetch all banners handler
  const handleGetBanners = async () => {
    try {
      const res = await axiosSecure.get("/banners");
      setBanners(res.data);
      setShowTable(true);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch banners!", "error");
    }
  };

  // Delete banner handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This banner will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/banners/${id}`);
          setBanners((prev) => prev.filter((banner) => banner._id !== id));
          Swal.fire("Deleted!", "Banner has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete banner!", "error");
        }
      }
    });
  };

  return (
    <div className="max-w-4xl pt-20 mx-auto mt-14 p-8 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gradient bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent select-none">
        🏷️ Upload & Manage Banners
      </h2>

      {/* Preview */}
      <AnimatePresence>
        {bannerImage && (
          <motion.img
            key="bannerPreview"
            src={bannerImage}
            alt="Banner Preview"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-52 object-cover rounded-xl border-4 border-purple-500 mb-6 shadow-lg mx-auto"
          />
        )}
      </AnimatePresence>

      {/* File Input */}
      <label className="block mb-6 cursor-pointer">
        <span className="text-gray-700 font-semibold mb-2 block">
          Upload Banner Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading}
          className="w-full cursor-pointer rounded-lg border border-gray-300 p-3 transition duration-300 focus:ring-4 focus:ring-purple-300 outline-none"
        />
      </label>

      {/* Banner Type Select */}
      <label className="block mb-8">
        <span className="text-gray-700 font-semibold mb-2 block">
          Select Banner Type
        </span>
        <select
          value={bannerType}
          onChange={(e) => setBannerType(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 focus:ring-4 focus:ring-purple-300 outline-none transition"
        >
          <option value="">-- Choose Banner Type --</option>
          <option value="MEN'S">MEN'S</option>
          <option value="WOMEN'S">WOMEN'S</option>
          <option value="BOY'S">BOY'S</option>
          <option value="GIRL'S">GIRL'S</option>
        </select>
      </label>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button
          onClick={handleSaveBanner}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300 font-semibold focus:outline-none focus:ring-4 focus:ring-pink-400"
        >
          {loading ? "Uploading..." : "Add Banner"}
        </button>

        <button
          onClick={handleGetBanners}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300 font-semibold focus:outline-none focus:ring-4 focus:ring-green-400"
        >
          📜 View All Banners
        </button>
      </div>

      {/* Banners Table */}
      {showTable && (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300">
          {banners.length === 0 ? (
            <p className="text-center p-6 text-gray-500 text-lg font-medium select-none">
              No banners found.
            </p>
          ) : (
            <table className="min-w-full bg-white rounded-xl">
              <thead className="bg-purple-100 text-purple-800 font-semibold">
                <tr>
                  <th className="p-4 text-left rounded-tl-xl">Image</th>
                  <th className="p-4 text-left">Type</th>
                  <th className="p-4 text-center rounded-tr-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <motion.tr
                    key={banner._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-t border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-purple-50 cursor-pointer`}
                  >
                    <td className="p-4">
                      <img
                        src={banner.imageUrl}
                        alt="banner"
                        className="w-36 h-20 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-700 select-text">
                      {banner.type}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="inline-flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-md transition"
                        title="Delete Banner"
                      >
                        <FaTrashAlt size={18} />
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Banner;
