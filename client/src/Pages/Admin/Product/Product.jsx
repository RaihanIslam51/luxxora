import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Hash, Image, Layers, Package, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSesure from "../../../Hook/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";

// Keep your existing CATEGORY_OPTIONS array here
// ✅ Category Options
const CATEGORY_OPTIONS = {
  MEN: {
    Clothing: ["T-shirt", "Sweatshirt", "Leather", "Coats & Jackets", "Knitwear", "Denim", "Short", "Swimwear", "Underwear & Socks"],
    Shoes: ["Sneakers", "Out of Office", "Be Right Back", "Vulcanized", "Boots", "Formal Shoes", "Loafers", "Slides"],
    Bags: ["Backpack", "Crossbody Bag", "Tote Bag", "Waist Bags and Clutches"],
    Accessories: ["Wallet and Cardholders", "Hats and Scarves", "Other Accessories"],
    Jewelry: ["Bracelets", "Necklaces", "Rings", "Earrings"]
  },
  WOMEN: {
    Activewear: ["Tops & Bras", "Leggings"],
    Clothing: ["T-Shirts & Tops", "Knitwear", "Sweatshirt", "Dresses", "Coats & Jackets", "Leather", "Denim", "Pants", "Shirts","Swimwear", "Underwear & Socks", "Skirts", "Sweaters"],
    Shoes: ["Sneakers", "Out of Office", "Be Right Back", "Vulcanized", "Boots and Ankle Boots", "Heels", "Flats", "Mules and Pumps", "Sandals", "Loafer and Flat Shoes", "Sliders and Espadrillas"],
    Bags: ["Clutches and Pouches", "Tote Bags", "Top Hand Bags", "Shoulder Bag"],
    Accessories: ["Wallet and Cardholders", "Soft Accessories", "Belts"],
    Jewelry: ["Earrings", "Bracelets", "Necklaces", "Rings"]
  },
  KID: {
    Boys: ["Boy's Clothing", "Boy's Shoes", "Boy's Accessories"],
    Girls: ["Girl's Clothing", "Girl's Shoes", "Girl's Accessories"],
    Baby: ["Baby Clothing"]
  },
  EYEWEAR: {
    Types: ["Sunglasses", "Eyeglass"]
  },
  ICONS: {
    Types: ["Women's Icons", "Men's Icons"]
  },
  "Special Collection": {
    Seasons: ["Fall", "Winter", "Fresco"]
  }
};

const IMG_API_KEY = "36f47c5ee620bb292f8a6a4a24adb091";
const PRODUCTS_PER_PAGE = 10;

const Product = () => {
  const axiosSecure = useAxiosSesure();
  const { register, handleSubmit, reset } = useForm();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProductsTable, setShowProductsTable] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("All");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
    setSelectedType("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setSelectedType("");
  };

  const onSubmit = async (data) => {
    if (!selectedCategory || !selectedSubCategory || !selectedType) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Selection",
        text: "Please select category, sub-category, and type before submitting.",
      });
    }

    setLoadingSubmit(true);

    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    let imageUrl = "";
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await res.json();

      if (!imgData.success) {
        throw new Error("Image upload failed");
      }
      imageUrl = imgData.data.display_url;
    } catch (error) {
      setLoadingSubmit(false);
      return Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text: "Image could not be uploaded.",
      });
    }

    const price = parseFloat(data.price);
    const discount = parseFloat(data.discount) || 0;
    const discountPrice = price - (price * discount) / 100;

    const productData = {
      name: data.name,
      price,
      quantity: parseInt(data.quantity),
      image: imageUrl,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      type: selectedType,
      discount,
      discountPrice,
      description: data.description || "",
      details: data.details || "",
    };

    try {
      const response = await axiosSecure.post("/products", productData);
      if (response.data.insertedId || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been successfully added to the database.",
          confirmButtonColor: "#6d28d9",
        });
        reset();
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedType("");
        setShowProductsTable(false);
        setFilterCategory("All");
        setCurrentPage(1);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add!",
        text: "Something went wrong while adding the product.",
        confirmButtonColor: "#e11d48",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleSeeAllProducts = async () => {
    try {
      const res = await axiosSecure.get("/products");
      setAllProducts(res.data);
      setShowProductsTable(true);
      setFilterCategory("All");
      setCurrentPage(1);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch products!", "error");
    }
  };

  const handleDeleteProduct = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/products/${id}`);
          setAllProducts((prev) => prev.filter((product) => product._id !== id));
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          if (
            filteredProducts.length - 1 <=
              (currentPage - 1) * PRODUCTS_PER_PAGE &&
            currentPage > 1
          ) {
            setCurrentPage(currentPage - 1);
          }
        } catch {
          Swal.fire("Error", "Failed to delete product!", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (filterCategory === "All") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter((p) => p.category === filterCategory));
    }
    setCurrentPage(1);
  }, [filterCategory, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  return (
    <div className="min-h-screen pt-25 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-300 flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-white flex items-center gap-3">
          <Package className="text-yellow-200 w-8 h-8" /> Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <BeautifulSelect
            label="Category"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
            options={Object.keys(CATEGORY_OPTIONS)}
            value={selectedCategory}
            onChange={handleCategoryChange}
            register={register("category")}
          />

          <BeautifulSelect
            label="Sub Category"
            icon={<Tag className="w-5 h-5 text-pink-600" />}
            options={selectedCategory ? Object.keys(CATEGORY_OPTIONS[selectedCategory]) : []}
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            register={register("subCategory")}
          />

          <BeautifulSelect
            label="Type"
            icon={<Layers className="w-5 h-5 text-orange-600" />}
            options={selectedSubCategory ? CATEGORY_OPTIONS[selectedCategory][selectedSubCategory] : []}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            register={register("type")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <InputField
              icon={<Image className="w-5 h-5 text-blue-500" />}
              label="Upload Image"
              name="image"
              type="file"
              placeholder="Choose image"
              register={register}
            />
            <InputField
              icon={<Package className="w-5 h-5 text-green-500" />}
              label="Product Name"
              name="name"
              placeholder="Enter product name"
              register={register}
            />
            <InputField
              icon={<DollarSign className="w-5 h-5 text-yellow-500" />}
              label="Price ($)"
              name="price"
              type="number"
              placeholder="Enter price"
              register={register}
            />
            <InputField
              icon={<Hash className="w-5 h-5 text-red-500" />}
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              register={register}
            />
            <InputField
              icon={<Tag className="w-5 h-5 text-red-500" />}
              label="Discount (%)"
              name="discount"
              type="number"
              placeholder="Enter discount percentage"
              register={register}
            />
          </div>

          <InputField
            icon={<Package className="w-5 h-5 text-indigo-500" />}
            label="Description"
            name="description"
            type="text"
            placeholder="Enter short description"
            register={register}
          />

          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2">Details</label>
            <textarea
              {...register("details")}
              placeholder="Enter detailed information"
              className="w-full p-3 rounded-lg focus:outline-none resize-y min-h-[100px]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loadingSubmit}
            className={`w-full py-3 text-lg font-semibold rounded-xl text-white shadow-md transition ${
              loadingSubmit
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-orange-400"
            }`}
          >
            {loadingSubmit ? "Adding Product..." : "➕ Add Product"}
          </motion.button>
        </form>
      </motion.div>

      <button
        onClick={handleSeeAllProducts}
        className="mt-8 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        📋 See All Products
      </button>

      {showProductsTable && (
        <div className="mt-6 overflow-x-auto max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-center mb-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 rounded border border-gray-300 shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="KID">KID</option>
            </select>

            <div className="flex items-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded bg-purple-600 text-white disabled:bg-gray-400"
              >
                Prev
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded bg-purple-600 text-white disabled:bg-gray-400"
              >
                Next
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 mt-4">No products found.</p>
          ) : (
            <table className="w-full border border-gray-300 rounded-lg shadow-sm text-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 uppercase">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Sub-Category</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Price ($)</th>
                  <th className="p-3">Discount (%)</th>
                  <th className="p-3">Discount Price ($)</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Details</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50 align-top">
                    <td className="p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">{product.subCategory}</td>
                    <td className="p-3">{product.type}</td>
                    <td className="p-3">{product.price?.toFixed(2) ?? "N/A"}</td>
                    <td className="p-3">{product.discount?.toFixed(2) ?? "0.00"}</td>
                    <td className="p-3">{product.discountPrice?.toFixed(2) ?? "N/A"}</td>
                    <td className="p-3">{product.quantity}</td>
                    <td className="p-3 max-w-xs break-words">{product.description ?? "-"}</td>
                    <td className="p-3 max-w-xs break-words whitespace-pre-wrap">{product.details ?? "-"}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        title="Delete Product"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, register, type = "text", placeholder, icon }) => (
  <div className="relative">
    <label className="block text-white text-sm font-medium mb-2">{label}</label>
    <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-purple-400 transition-all">
      <span className="pl-3">{icon}</span>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full p-3 pl-2 rounded-lg focus:outline-none"
      />
    </div>
  </div>
);

const BeautifulSelect = ({ label, icon, options, value, onChange, register }) => (
  <div className="relative">
    <label className="block text-white text-sm font-medium mb-2">{label}</label>
    <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-pink-400 transition-all">
      <span className="pl-3">{icon}</span>
      <select
        {...register}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-2 rounded-lg focus:outline-none bg-white font-semibold text-gray-700 hover:bg-purple-50 transition"
      >
        <option value="">-- Select {label} --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Product;
