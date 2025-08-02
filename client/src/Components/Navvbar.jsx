import {
  ChevronDown,
  ChevronUp,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          { name: "Wallet and Cardholders", path: "/men/accessories/Walletand" },
          { name: "Others Accessories", path: "/men/accessories/OthersAccessories" },
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
          { name: "Cots & Jackets", path: "/women/clothing/Cots&Jackets" },
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
          { name: "Wallet and Cardholders", path: "/women/accessories/Walletand" },
          { name: "Soft Accessories", path: "/women/accessories/SoftAccessories" },
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
  {
    name: "ADMIN",
    path: "/admin",
    submenu: [
      { name: "Banner", path: "/admin/banner" },
      { name: "Product", path: "/admin/product" },
    ],
  },
  { name: "BRAND", path: "/brand" },
  { name: "Login", path: "/login" },
  { name: "Wishlist", path: "/wishlist" },
];


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState(null);
  //search product
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // console.log("search",searchTerm);
  


  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        axiosSecure
          .get("/products/search", { params: { name: searchTerm } })
          .then((res) => setSearchResults(res.data))
          .catch((err) => console.error(err));
      } else {
        setSearchResults([]); // Clear results if input empty
      }
    }, 400); // debounce for 400ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, axiosSecure]);





  const toggleSubmenu = (index) => {
    // If clicking the currently open submenu, close it
    // Otherwise, open the new submenu and close any active sub-submenus
    if (openSubmenu === index) {
      setOpenSubmenu(null);
      setOpenSubSubmenu(null);
    } else {
      setOpenSubmenu(index);
      setOpenSubSubmenu(null);
    }
  };

  const toggleSubSubmenu = (index) => {
    setOpenSubSubmenu(openSubSubmenu === index ? null : index);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
    setOpenSubSubmenu(null);
  };

  return (
    <>
      {/* Navbar Header */}
 <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md font-sans tracking-wide z-20 fixed top-0 left-0">
  {/* Top Row (Logo & Icons) */}
  <div className="h-16 flex items-center justify-between px-6 sm:px-10">
    {/* Logo */}
    <Link
      to="/"
      className="text-3xl sm:text-3xl text-black tracking-widest font-semibold select-none drop-shadow-sm"
    >
      Luxxora
    </Link>

    {/* Action Icons */}
    <div className="flex items-center space-x-5 sm:space-x-7 text-black text-2xl relative">
      <Link to="/wishlist" title="Wishlist">
        <Heart className="w-8 h-8 hover:scale-110 hover:text-red-600 transition-transform duration-200" />
      </Link>
      <Link to="/auth/login" title="Login">
        <User2 className="w-8 h-8 hover:scale-110 hover:text-blue-600 transition-transform duration-200" />
      </Link>
      <Link to="/cart" title="Cart">
        <ShoppingCart className="w-8 h-8 hover:scale-110 hover:text-green-600 transition-transform duration-200" />
      </Link>
      <button
        title="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
        className="hover:scale-110 hover:text-gray-900 transition-transform duration-200"
      >
        {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>
    </div>
  </div>



  {/* Search Bar Row */}
  <div className="hidden md:flex justify-start px-6 pb-3">
    <div className="relative w-full max-w-8xl">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search..."
         className="w-full pl-14 pr-4 py-2.5 bg-gray-100
             border-b border-gray-400
             focus:outline-none focus:ring-0 focus:border-black
             text-base font-medium placeholder-gray-500"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
        <Search className="w-8 h-8" />  {/* bigger icon */}
      </span>
    </div>



    {searchResults.length > 0 && (
      <div className="absolute mt-12 w-full max-w-lg bg-white shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto">
        {searchResults.map((item) => (
          <div
            key={item._id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
          >
            {item.name}
          </div>
        ))}
      </div>
    )}
  </div>
</nav>








      {/* Full-width Dropdown Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white shadow-xl z-30 overflow-y-auto border-t border-gray-200 animate-slideDown">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  if (item.submenu) {
                    toggleSubmenu(index);
                  } else {
                    closeMenu(); // Close the entire menu if there's no submenu
                  }
                }}
                className="w-full flex justify-between items-center px-6 py-6 text-black font-normal text-lg hover:bg-gray-50 transition border-b border-black"
              >
                {item.name}
                {item.submenu && (
                  <span>
                    {openSubmenu === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {item.submenu && openSubmenu === index && (
                <div className="bg-gray-50">
                  {item.submenu.map((sub, subIdx) => (
                    <div key={subIdx}>
                      {sub.subsubmenu ? (
                        <>
                          <button
                            onClick={() => toggleSubSubmenu(subIdx)}
                            className="w-full flex justify-between items-center pl-10 pr-6 py-5  text-black hover:bg-gray-100 transition border-b border-black"
                          >
                            {sub.name}
                            <span>
                              {openSubSubmenu === subIdx ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </span>
                          </button>
                          {openSubSubmenu === subIdx && (
                            <div className="bg-gray-100">
                              {sub.subsubmenu.map((subsub, subsubIdx) => (
                                <Link
                                  key={subsubIdx}
                                  to={subsub.path}
                                  onClick={closeMenu} // Close entire menu
                                  className="block pl-14 pr-6 py-2 text-lg text-gray-700 hover:bg-gray-200 transition border-b border-gray-300 last:border-b-0"
                                >
                                  {subsub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={sub.path}
                          onClick={closeMenu} // Close entire menu
                          className="block pl-10 pr-6 py-2 text-black hover:bg-gray-100 transition border-b border-gray-200"
                        >
                          {sub.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}





    </>
  );
};

export default Navbar;