import { motion } from "framer-motion";
import { DollarSign, Hash, Image, Layers, Package, Tag } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSesure from "../../../Hook/useAxiosSecure";

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
    Types: ["Sunglasses", "Eyeglass", ]
  },
  ICONS: {
    Types: ["Women's Icons", "Men's Icons"]
  },
  "Special Collection": {
    Seasons: ["Fall", "Winter", "Fresco"]
  }
};

const Product = () => {
  const axiosSecure = useAxiosSesure();
  const { register, handleSubmit, reset } = useForm();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
    setSelectedType("");
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setSelectedType("");
  };

  // ✅ Submit Handler with SweetAlert
  const onSubmit = async (data) => {
    if (!selectedCategory || !selectedSubCategory || !selectedType) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Selection",
        text: "Please select category, sub-category, and type before submitting.",
      });
      return;
    }

    const productData = {
      ...data,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      type: selectedType,
      discountPrice: 2000,
      discount: '50%',
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
      }
    } catch (error) {
      console.error("❌ Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add!",
        text: "Something went wrong while adding the product.",
        confirmButtonColor: "#e11d48",
      });
    }
  };

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-300 flex items-center justify-center p-6">
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
          {/* Always Show Full Form */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField icon={<Image className="w-5 h-5 text-blue-500" />} label="Image URL" name="image" placeholder="Enter image URL" register={register} />
            <InputField icon={<Package className="w-5 h-5 text-green-500" />} label="Product Name" name="name" placeholder="Enter product name" register={register} />
            <InputField icon={<DollarSign className="w-5 h-5 text-yellow-500" />} label="Price ($)" name="price" type="number" placeholder="Enter price" register={register} />
            <InputField icon={<Hash className="w-5 h-5 text-red-500" />} label="Quantity" name="quantity" type="number" placeholder="Enter quantity" register={register} />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-orange-400 transition"
          >
            ➕ Add Product
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

/** Input Component */
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

/** Select Component */
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
          <option key={opt} value={opt} className="text-gray-700 font-semibold">
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Product;
