import React from 'react';
import CoatsJackets from './CoatsJackets';
import Denim from './Denim';
import Knitwear from './Knitwear';
import Leather from './Leather';
import Shorts from './Shorts';
import Sweatshirt from './Sweatshirt';
import Swimwear from './Swimwear';
import Tshirt from './Tshirt';
import Underwear from './Underwear';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-green-600">
    {title}
  </h2>
);

const ViewAllMC = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        👔 Men's Clothing Collection
      </h1>

      {/* Clothing Sections */}
      <SectionTitle title="🧥 Coats & Jackets" />
      <CoatsJackets />

      <SectionTitle title="👖 Denim" />
      <Denim />

      <SectionTitle title="🧶 Knitwear" />
      <Knitwear />

      <SectionTitle title="🥼 Leather" />
      <Leather />

      <SectionTitle title="🩳 Shorts" />
      <Shorts />

      <SectionTitle title="👕 Sweatshirt" />
      <Sweatshirt />

      <SectionTitle title="🏊 Swimwear" />
      <Swimwear />

      <SectionTitle title="👕 T-Shirts" />
      <Tshirt />

      <SectionTitle title="🩲 Underwear & Socks" />
      <Underwear />
    </div>
  );
};

export default ViewAllMC;
