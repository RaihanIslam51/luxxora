import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User2,
  X,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authantation/Context/AuthContext";
import ProductCard from "../generic reusable component/ProductCard/ProductCard";
import useAxiosSecure from "../Hook/useAxiosSecure";

const menuItems = [
  {
    name: "SALES",
    path: "/sales",
    submenu: [
      { name: "Men Sales", path: "/sales/men" },
      { name: "Women Sales", path: "/sales/women" },
      { name: "Kid Sale", path: "/sales/kids" },
      { name: "View All", path: "/sales/all" },
    ],
  },
  {
    name: "MEN",
    path: "/men",
    submenu: [
      {
        name: "Clothing",
        path: "/men/clothing",
        subsubmenu: [
          { name: "T-shirt", path: "/men/clothing/tshirt" },
          { name: "Shirt", path: "/men/clothing/shirt" },
          { name: "Pant", path: "/men/clothing/pant" },
          { name: "Sweatshirt", path: "/men/clothing/sweatshirt" },
          { name: "Leather", path: "/men/clothing/leather" },
          { name: "Coats & Jackets", path: "/men/clothing/coats-jackets" },
          { name: "Knitwear", path: "/men/clothing/knitwear" },
          { name: "Denim", path: "/men/clothing/denim" },
          { name: "Shorts", path: "/men/clothing/shorts" },
          { name: "Swimwear", path: "/men/clothing/swimwear" },
          { name: "Underwear & Socks", path: "/men/clothing/underwear-socks" },
          { name: "View All", path: "/men/alls" },
        ],
      },
      {
        name: "Shoes",
        path: "/men/shoes",
        subsubmenu: [
          { name: "Sneaker", path: "/men/shoes/Sneaker" },
          { name: "Out of Office", path: "/men/shoes/OutofOffice" },
          { name: "Be Right Back", path: "/men/shoes/BeRightBack" },
          { name: "Vulcanized", path: "/men/shoes/Vulcanized" },
          { name: "Boots", path: "/men/shoes/Boots" },
          { name: "Formal Shoes", path: "/men/shoes/FormalShoes" },
          { name: "Slides", path: "/men/shoes/Slides" },
          { name: "View All", path: "/men/shoes/ViewAll" },
        ],
      },
      {
        name: "Bags",
        path: "/men/bags",
        subsubmenu: [
          { name: "BackPacks", path: "/men/bags/BackPacks" },
          { name: "Crossbody bags", path: "/men/bags/Crossbodybags" },
          { name: "Tote bags", path: "/men/bags/Totebags" },
          { name: "Waist Bags and Clutches", path: "/men/bags/WaistBags" },
          { name: "View All", path: "/men/bags/ViewAll" },
        ],
      },
      {
        name: "Accessories",
        path: "/men/accessories",
        subsubmenu: [
          { name: "Hats and Scarves", path: "/men/accessories/Hatsand" },
          {
            name: "Wallet and Cardholders",
            path: "/men/accessories/Walletand",
          },
          {
            name: "Others Accessories",
            path: "/men/accessories/OthersAccessories",
          },
          { name: "View All", path: "/men/accessories/ViewAll" },
        ],
      },
      {
        name: "Jewelry",
        path: "/men/jewelry",
        subsubmenu: [
          { name: "Bracelets", path: "/men/jewelry/Bracelets" },
          { name: "Necklaces", path: "/men/jewelry/Necklaces" },
          { name: "Rings", path: "/men/jewelry/Rings" },
          { name: "Earrings", path: "/men/jewelry/Earrings" },
          { name: "View All", path: "/men/jewelry/ViewAll" },
        ],
      },
      { name: "View All", path: "/men/all" },
    ],
  },
  {
    name: "WOMEN",
    path: "/women",
    submenu: [
      {
        name: "Activewear",
        path: "/women/activewear",
        subsubmenu: [
          { name: "Tops & Bras", path: "/women/activewear/Tops&Bras" },
          { name: "Leggings", path: "/women/activewear/Leggings" },
          { name: "View All", path: "/women/activewear/ViewAll" },
        ],
      },
      {
        name: "Clothing",
        path: "/women/clothing",
        subsubmenu: [
          { name: "T-Shirts & Tops", path: "/women/clothing/Tops" },
          { name: "Knitwear", path: "/women/clothing/Knitwear" },
          { name: "Sweatshirts", path: "/women/clothing/Sweatshirts" },
          { name: "Dresses", path: "/women/clothing/Dresses" },
          { name: "Coat & Jackets", path: "/women/clothing/Cots&Jackets" },
          { name: "Leather", path: "/women/clothing/Leather" },
          { name: "Denim", path: "/women/clothing/Denim" },
          { name: "Pants", path: "/women/clothing/Pants" },
          { name: "Skirts", path: "/women/clothing/Skirts" },
          { name: "Shirts", path: "/women/clothing/Shirts" },
          { name: "Swimwear", path: "/women/clothing/Swimwear" },
          { name: "Underwear & Socks", path: "/women/clothing/Underwear" },
          { name: "View All", path: "/women/clothing/Viewall" },
        ],
      },
      {
        name: "Shoes",
        path: "/women/shoes",
        subsubmenu: [
          { name: "Sneakers", path: "/women/shoes/Sneakers" },
          { name: "Out of Office", path: "/women/shoes/OutofOffice" },
          { name: "Be Right Back", path: "/women/shoes/RightBack" },
          { name: "Vulcanized", path: "/women/shoes/Vulcanized" },
          { name: "Boots and Ankle Boots", path: "/women/shoes/Bootsand" },
          { name: "Mules and Pumps", path: "/women/shoes/Mules" },
          { name: "Sandals", path: "/women/shoes/Sandals" },
          { name: "Loafers and Flat Shoes ", path: "/women/shoes/Loafers" },
          { name: "Slides and Espadrillas", path: "/women/shoes/Slides" },
          { name: "View All", path: "/women/shoes/Viewall" },
        ],
      },
      {
        name: "Bags",
        path: "/women/bags",
        subsubmenu: [
          { name: "Shoulder Bags", path: "/women/bags/ShoulderBags" },
          { name: "Top handle Bags", path: "/women/bags/handleBags" },
          { name: "Tote Bags", path: "/women/bags/ToteBags" },
          { name: "Clutches and Pouches", path: "/women/bags/Pouches" },
          { name: "View All", path: "/women/bags/Viewall" },
        ],
      },
      {
        name: "Accessories",
        path: "/women/accessories",
        subsubmenu: [
          {
            name: "Wallet and Cardholders",
            path: "/women/accessories/Walletand",
          },
          {
            name: "Soft Accessories",
            path: "/women/accessories/SoftAccessories",
          },
          { name: "Belts", path: "/women/accessories/Belts" },
          { name: "View All", path: "/women/accessories/Viewall" },
        ],
      },
      {
        name: "Jewelry",
        path: "/women/jewelry",
        subsubmenu: [
          { name: "Bracelets", path: "/women/jewelry/Bracelets" },
          { name: "Necklaces", path: "/women/jewelry/Necklaces" },
          { name: "Rings", path: "/women/jewelry/Rings" },
          { name: "Earrings", path: "/women/jewelry/Earrings" },
          { name: "View All", path: "/women/jewelry/ViewAll" },
        ],
      },
      { name: "View All", path: "/women/all" },
    ],
  },
  {
    name: "KIDS",
    path: "/kids",
    submenu: [
      {
        name: "Boys",
        path: "/kids/boys",
        subsubmenu: [
          { name: "Boy,s Clothing", path: "/kids/boys/Clothing" },
          { name: "Boy,s Shoes", path: "/kids/boys/Shoes" },
          { name: "Boy,s Accessories ", path: "/kids/boys/Accessories" },
          { name: "View All", path: "/kids/boys/ViewAll" },
        ],
      },
      {
        name: "Girls",
        path: "/kids/girls",
        subsubmenu: [
          { name: "Girl,s Clothing", path: "/kids/girls/Clothing" },
          { name: "Girl,s Shoes", path: "/kids/girls/Shoes" },
          { name: "Girl,s Accessories ", path: "/kids/girls/Accessories" },
          { name: "View All", path: "/kids/girls/ViewAll" },
        ],
      },
      { name: "Baby", path: "/kids/baby" },
      { name: "View All", path: "/kids/all" },
    ],
  },
  {
    name: "EYEWEAR",
    path: "/eyewear",
    submenu: [
      { name: "Sunglasses", path: "/eyewear/sunglasses" },
      { name: "Eyeglass", path: "/eyewear/eyeglass" },
      { name: "View All", path: "/eyewear/all" },
    ],
  },
  {
    name: "ICONS",
    path: "/icons",
    submenu: [
      { name: "Men's Icon", path: "/icons/men" },
      { name: "Women's Icon", path: "/icons/women" },
    ],
  },
  {
    name: "SPECIAL COLLECTION",
    path: "/special-collection",
    submenu: [
      { name: "Fall", path: "/special-collection/fall" },
      { name: "Winter", path: "/special-collection/winter" },
      { name: "Fresco", path: "/special-collection/fresco" },
    ],
  },
  { name: "BRAND", path: "/brand" },
  { name: "Login", path: "/login" },
  { name: "Wishlist", path: "/wishlist" },
];

const Navbar = () => {
  const { UserData, SignOutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hideSearch, setHideSearch] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Create menu based on user role
  const getMenuItems = () => {
    const baseMenu = [...menuItems];
    if (UserData?.email === "connect@luxxoraverse.com") {
      baseMenu.push({
        name: "ADMIN",
        path: "/admin",
        submenu: [
          { name: "Banner", path: "/admin/banner" },
          { name: "Product", path: "/admin/product" },
        ],
      });
    }
    return baseMenu;
  };

  // Fetch wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHideSearch(true);
      } else {
        setHideSearch(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search functionality
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        axiosSecure
          .get("/products/search", { params: { name: searchTerm } })
          .then((res) => setSearchResults(res.data))
          .catch((err) => console.error(err));
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, axiosSecure]);

  const handleCardClick = useCallback(
    (id) => {
      // Navigate to details page
      navigate(`/product/${id}`);

      // Clear search term and search results to prevent dropdown from reappearing
      setSearchTerm("");
      setSearchResults([]);
    },
    [navigate]
  );

  const handleLogout = async () => {
    try {
      await SignOutUser();
      setShowLogout(false);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMenuIndex(null);
    setActiveSubmenuIndex(null);
  };

  const backToMainMenu = () => {
    setActiveMenuIndex(null);
    setActiveSubmenuIndex(null);
  };

  const backToSubmenu = () => {
    setActiveSubmenuIndex(null);
  };

  const slideBase =
    "absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-xl overflow-y-auto p-6 transition-all";

  return (
    <>
      {/* Navbar Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-md font-sans tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between px-6 sm:px-10">
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/Luxxora.png"
                alt="Luxxora Logo"
                className="h-10 sm:h-12 object-contain select-none drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Search Bar */}
            <div
              className={`hidden md:flex fixed left-1/2 -translate-x-1/2 top-2 justify-start w-[30vw] px-6 pb-3 transition-all duration-500 z-50 
  }`}
            >
              <div className="relative w-full max-w-7xl">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search fashion, brands & more"
                  className="w-full pl-14 pr-4 py-3  rounded-lg
        border border-transparent focus:border-black
        focus:ring-1 focus:ring-black
        text-base font-medium placeholder-gray-700
        transition-all duration-300 "
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                  <Search className="w-7 h-7 opacity-70" />
                </span>

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 w-full max-w-7xl mx-auto bg-white shadow-lg z-50 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[80vh] overflow-y-auto rounded-b-xl">
                    {searchResults.map((item) => (
                      <ProductCard
                        key={item._id}
                        item={item}
                        isWishlisted={wishlist.includes(
                          item._id?.$oid || item._id
                        )}
                        onToggleWishlist={() => console.log("Wishlist toggle")}
                        onClick={() =>
                          handleCardClick(item._id?.$oid || item._id)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Icons - Keeping the original icon sizes */}
            <div className="flex items-center space-x-6 text-gray-800 text-2xl relative">
              <Link to="/wishlist" title="Wishlist" className="relative group">
                <Heart className="w-7 h-7 group-hover:text-red-500 transition duration-300" />
              </Link>

              {UserData ? (
                <div
                  className="relative group"
                  onMouseEnter={() => setShowLogout(true)}
                  onMouseLeave={() => setShowLogout(false)}
                >
                  <img
                    src={
                      UserData.photoURL ||
                      "https://i.ibb.co/2FxFsjK/default-avatar.png"
                    }
                    alt="User Profile"
                    className="w-10 h-10 rounded-full border cursor-pointer hover:scale-105 transition duration-300"
                  />
                  {showLogout && (
                    <button
                      onClick={handleLogout}
                      className="absolute -top-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow-md hover:bg-red-600 transition-all"
                    >
                      Logout
                    </button>
                  )}
                </div>
              ) : (
                <Link to="/auth/login" title="Login" className="relative group">
                  <User2 className="w-7 h-7 group-hover:text-blue-500 transition duration-300" />
                </Link>
              )}

              <Link to="/cart" title="Cart" className="relative group">
                <ShoppingCart className="w-7 h-7 group-hover:text-green-500 transition duration-300" />
              </Link>
              <button
                title="Menu"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
              >
                {menuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-xl shadow-xl z-30 overflow-hidden border-t border-gray-200 animate-fadeIn">
          {/* Top-level Menu */}
          {!activeMenuIndex && (
            <div className={`${slideBase} animate-slideInFromRight`}>
              {getMenuItems().map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (item.submenu) {
                      setActiveMenuIndex(index);
                      setActiveSubmenuIndex(null);
                    } else {
                      closeMenu();
                    }
                  }}
                  className="w-full flex justify-between items-center px-6 py-5 text-black font-medium text-xl hover:bg-gray-100 hover:pl-8 transition-all duration-300 border-b border-gray-200"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="w-5 h-5 opacity-70" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Submenu */}
          {activeMenuIndex !== null && activeSubmenuIndex === null && (
            <div className={`${slideBase} animate-slideInFromRight`}>
              <button
                onClick={backToMainMenu}
                className="flex items-center space-x-2 mb-5 text-gray-700 font-medium hover:text-black transition"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Back</span>
              </button>
              {getMenuItems()[activeMenuIndex].submenu.map((sub, subIdx) => (
                <div key={subIdx}>
                  {sub.subsubmenu ? (
                    <button
                      onClick={() => setActiveSubmenuIndex(subIdx)}
                      className="w-full flex justify-between text-xl items-center px-6 py-5 text-black font-normal hover:bg-gray-100 hover:pl-8 transition-all duration-300 border-b border-gray-200"
                    >
                      {sub.name}
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </button>
                  ) : (
                    <Link
                      to={sub.path}
                      onClick={closeMenu}
                      className="block px-6 py-5 text-black font-medium hover:bg-gray-100 hover:pl-8 transition-all duration-300 border-b border-gray-200"
                    >
                      {sub.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Sub-submenu */}
          {activeMenuIndex !== null && activeSubmenuIndex !== null && (
            <div className={`${slideBase} animate-slideInFromRight`}>
              <button
                onClick={backToSubmenu}
                className="flex items-center space-x-2 mb-5 text-gray-700 font-medium hover:text-black transition"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Back</span>
              </button>
              {getMenuItems()[activeMenuIndex].submenu[
                activeSubmenuIndex
              ].subsubmenu.map((subsub, subsubIdx) => (
                <Link
                  key={subsubIdx}
                  to={subsub.path}
                  onClick={closeMenu}
                  className="block px-6 py-5 text-black font-normal text-xl hover:bg-gray-100 hover:pl-8 transition-all duration-300 border-b border-gray-200"
                >
                  {subsub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideInFromRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slideInFromRight {
          animation: slideInFromRight 0.35s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;
