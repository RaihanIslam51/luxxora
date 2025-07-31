import React from 'react';
import BoyClothing from '../Boys/BoyClothing';
import BoyAccessories from '../Boys/BoyAccessories';
import BoyShoes from '../Boys/BoyShoes';
import GirlAccessories from '../Girls/GirlAccessories';
import GirlClothing from '../Girls/GirlClothing';
import GirlShoes from '../Girls/GirlShoes';
import Baby from '../Bady/Baby';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-blue-600">
    {title}
  </h2>
);

const ViewAllK = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        🧸 Kids' All Products
      </h1>

      {/* Boys Section */}
      <SectionTitle title="👦 Boy's Collection" />
      <BoyClothing />
      <BoyAccessories />
      <BoyShoes />

      {/* Girls Section */}
      <SectionTitle title="👧 Girl's Collection" />
      <GirlAccessories />
      <GirlClothing />
      <GirlShoes />

      {/* Baby Section */}
      <SectionTitle title="🍼 Baby Collection" />
      <Baby />
    </div>
  );
};

export default ViewAllK;
