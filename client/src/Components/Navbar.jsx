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
import { useState } from "react";
import { Link } from "react-router-dom";

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
      { name: "Icon View All", path: "/eyewear/all" },
    ],
  },
  {
    name: "ICONS",
    path: "/icons",
    submenu: [
      { name: "Men's Icon", path: "/icons/men" },
      { name: "Women's Icon", path: "/icons/women" },
      { name: "View All", path: "/icons/all" },
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
      <nav className="w-full h-16 flex items-center justify-between px-6 sm:px-10 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md font-sans tracking-wide z-20 fixed top-0 left-0">
        <Link
          to="/"
          className="font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-widest font-serif select-none drop-shadow-sm"
        >
          Luxxora
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-300 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base font-medium placeholder-gray-500"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 sm:space-x-7 text-gray-700 text-2xl relative">
          <Link to="/wishlist" title="Wishlist">
            <Heart className="w-6 h-6 hover:scale-110 hover:text-red-600 transition-transform duration-200" />
          </Link>
          <Link to="/login" title="Login">
            <User2 className="w-6 h-6 hover:scale-110 hover:text-blue-600 transition-transform duration-200" />
          </Link>
          <Link to="/cart" title="Cart">
            <ShoppingCart className="w-6 h-6 hover:scale-110 hover:text-green-600 transition-transform duration-200" />
          </Link>
          <button
            title="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="hover:scale-110 hover:text-gray-900 transition-transform duration-200"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
                className="w-full flex justify-between items-center px-6 py-3 text-black font-semibold text-lg hover:bg-gray-50 transition border-b border-gray-200"
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
                            className="w-full flex justify-between items-center pl-10 pr-6 py-2 text-black hover:bg-gray-100 transition border-b border-gray-200"
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
                                  className="block pl-14 pr-6 py-2 text-sm text-gray-700 hover:bg-gray-200 transition border-b border-gray-300 last:border-b-0"
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