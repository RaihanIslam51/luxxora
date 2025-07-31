import React from 'react';
import GirlAccessories from './GirlAccessories';
import GirlClothing from './GirlClothing';
import GirlShoes from './GirlShoes';

const ViewGG = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        👧 Girls Collection
      </h1>

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
        Accessories
      </h2>
      <GirlAccessories />

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
        Clothing
      </h2>
      <GirlClothing />

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
        Shoes
      </h2>
      <GirlShoes />
    </div>
  );
};

export default ViewGG;
