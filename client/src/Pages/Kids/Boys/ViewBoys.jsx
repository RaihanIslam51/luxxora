import React from 'react';
import BoyAccessories from './BoyAccessories';
import BoyClothing from './BoyClothing';
import BoyShoes from './BoyShoes';

const ViewBoys = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        👦 Boys Collection
      </h1>

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
        Accessories
      </h2>
      <BoyAccessories />

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
        Clothing
      </h2>
      <BoyClothing />

      <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
        Shoes
      </h2>
      <BoyShoes />
    </div>
  );
};

export default ViewBoys;
