import React from 'react';
import CoatsJackets from '../Clothing/CoatsJackets';
import Denim from '../Clothing/Denim';
import Knitwear from '../Clothing/Knitwear';
import Leather from '../Clothing/Leather';
import Shorts from '../Clothing/Shorts';
import Sweatshirt from '../Clothing/Sweatshirt';
import Swimwear from '../Clothing/Swimwear';
import Tshirt from '../Clothing/Tshirt';
import Underwear from '../Clothing/Underwear';
import HatsandScarves from '../Accessories/HatsandScarves';
import OthersAccessories from '../Accessories/OthersAccessories';
import WalletandCardholders from '../Accessories/WalletandCardholders';
import BackPacks from '../Bags/BackPacks';
import Crossbodybags from '../Bags/Crossbodybags';
import Totebags from '../Bags/Totebags';
import WaistBags from '../Bags/WaistBags';
import Bracelets from '../Jewelry/Bracelets';
import Earrings from '../Jewelry/Earrings';
import Necklaces from '../Jewelry/Necklaces';
import Rings from '../Jewelry/Rings';
import BeRightBack from '../Shoes/BeRightBack';
import Boots from '../Shoes/Boots';
import FormalShoes from '../Shoes/FormalShoes';
import OutofOffice from '../Shoes/OutofOffice';
import Slides from '../Shoes/Slides';
import Sneaker from '../Shoes/Sneaker';
import Vulcanized from '../Shoes/Vulcanized';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-purple-600">
    {title}
  </h2>
);

const ViewAllM = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        🧥 Men's All Products
      </h1>

      {/* Clothing Section */}
      <SectionTitle title="👕 All Clothing" />
      <CoatsJackets />
      <Denim />
      <Knitwear />
      <Leather />
      <Shorts />
      <Sweatshirt />
      <Swimwear />
      <Tshirt />
      <Underwear />

      {/* Accessories Section */}
      <SectionTitle title="🧢 Accessories" />
      <HatsandScarves />
      <OthersAccessories />
      <WalletandCardholders />

      {/* Bag Section */}
      <SectionTitle title="🎒 Bag Section" />
      <BackPacks />
      <Crossbodybags />
      <Totebags />
      <WaistBags />

      {/* Jewelry Section */}
      <SectionTitle title="💍 Jewelry" />
      <Bracelets />
      <Earrings />
      <Necklaces />
      <Rings />

      {/* Shoes Section */}
      <SectionTitle title="👟 Shoes Section" />
      <BeRightBack />
      <Boots />
      <FormalShoes />
      <OutofOffice />
      <Slides />
      <Sneaker />
      <Vulcanized />
    </div>
  );
};

export default ViewAllM;
