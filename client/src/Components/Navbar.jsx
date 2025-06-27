import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "SALES", path: "/sales" },
    { name: "NEW IN", path: "/new-in" },
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "KIDS", path: "/kids" },
    { name: "EYEWEAR", path: "/eyewear" },
    { name: "ICONS", path: "/icons" },
    { name: "SPECIAL COLLECTION", path: "/special-collection" },
    { name: "BRAND", path: "/brand" },
  ];

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 sm:px-10 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-lg font-poppins tracking-wide z-20 fixed top-0 left-0">
      {/* Left: Logo */}
      <Link
        to="/"
        className="font-extrabold text-2xl sm:text-3xl text-gray-900 tracking-widest font-montserrat select-none drop-shadow-lg"
      >
        Luxxora
      </Link>

      {/* Center: Search Field */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full pl-12 pr-4 py-2.5 rounded-2xl border border-gray-200 bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-gray-400 transition text-base font-medium placeholder-gray-400"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-5 sm:space-x-7 text-gray-700 text-2xl relative">
        <button
          title="Wishlist"
          className="hover:scale-110 hover:text-pink-500 transition-transform duration-200 ease-in-out"
        >
          <Heart className="w-6 h-6" />
        </button>
        <button
          title="Login"
          className="hover:scale-110 hover:text-blue-500 transition-transform duration-200 ease-in-out"
        >
          <User2 className="w-6 h-6" />
        </button>
        <button
          title="Cart"
          className="hover:scale-110 hover:text-green-500 transition-transform duration-200 ease-in-out"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>

        {/* Menu Button */}
        <button
          title="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="hover:scale-110 hover:text-gray-900 transition-transform duration-200 ease-in-out"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Dropdown Menu with Links */}
        {menuOpen && (
          <div className="absolute right-0 top-16 mt-2 bg-white shadow-xl border border-gray-200 rounded-lg py-2 w-56 z-50">
            {menuItems.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition"
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
