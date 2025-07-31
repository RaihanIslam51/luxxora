import React from 'react';
import CotsJackets1 from '../Clothing/CotsJackets1';
import Denimw from '../Clothing/Denimw';
import Dresses from '../Clothing/Dresses';
import Knitwear1 from '../Clothing/Knitwear1';
import Leatherw from '../Clothing/Leatherw';
import Pants from '../Clothing/Pants';
import Shirts from '../Clothing/Shirts';
import Skirts from '../Clothing/Skirts';
import Sweatshirts from '../Clothing/Sweatshirts';
import Swimwear2 from '../Clothing/Swimwear2';
import TShirtsTops from '../Clothing/TShirtsTops';
import Underwearw from '../Clothing/Underwearw';
import Beltsw from '../Accessories/Beltsw';
import SoftAccessories from '../Accessories/SoftAccessories';
import WalletandCardholders1 from '../Accessories/WalletandCardholders1';
import Leggings from '../Activewear.jsx/Leggings';
import TopsBras from '../Activewear.jsx/TopsBras';
import ClutchesPouches from '../Bags/ClutchesPouches';
import ShoulderBags from '../Bags/ShoulderBags';
import TophandleBags from '../Bags/TophandleBags';
import ToteBagsw from '../Bags/ToteBagsw';
import Braceletsw from '../Jewelry/Braceletsw';
import Earringsw from '../Jewelry/Earringsw';
import Necklacesw from '../Jewelry/Necklacesw';
import Ringsw from '../Jewelry/Ringsw';
import BeRightBackw from '../Shoes/BeRightBackw';
import Loafersw from '../Shoes/Loafersw';
import MulesandPumps from '../Shoes/MulesandPumps';
import OutofOfficew from '../Shoes/OutofOfficew';
import Sandalss from '../Shoes/Sandalss';
import Slidesandw from '../Shoes/Slidesandw';
import Sneakersw from '../Shoes/Sneakersw';
import Vulcanizedw from '../Shoes/Vulcanizedw';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-pink-600">
    {title}
  </h2>
);

const ViewAllW = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        👗 Women's All Products
      </h1>

      {/* Clothing Section */}
      <SectionTitle title="👕 All Clothing" />
      <CotsJackets1 />
      <Denimw />
      <Dresses />
      <Knitwear1 />
      <Leatherw />
      <Pants />
      <Shirts />
      <Skirts />
      <Sweatshirts />
      <Swimwear2 />
      <TShirtsTops />
      <Underwearw />

      {/* Accessories Section */}
      <SectionTitle title="👜 Accessories" />
      <Beltsw />
      <SoftAccessories />
      <WalletandCardholders1 />

      {/* Activewear Section */}
      <SectionTitle title="🏃‍♀️ Activewear" />
      <Leggings />
      <TopsBras />

      {/* Bags Section */}
      <SectionTitle title="🎒 Bags" />
      <ClutchesPouches />
      <ShoulderBags />
      <TophandleBags />
      <ToteBagsw />

      {/* Jewelry Section */}
      <SectionTitle title="💍 Jewelry" />
      <Braceletsw />
      <Earringsw />
      <Necklacesw />
      <Ringsw />

      {/* Shoes Section */}
      <SectionTitle title="👠 Shoes" />
      <BeRightBackw />
      <Loafersw />
      <MulesandPumps />
      <OutofOfficew />
      <Sandalss />
      <Slidesandw />
      <Sneakersw />
      <Vulcanizedw />
    </div>
  );
};

export default ViewAllW;
