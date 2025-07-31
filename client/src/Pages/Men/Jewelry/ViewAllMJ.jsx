import React from 'react';
import Bracelets from './Bracelets';
import Earrings from './Earrings';
import Necklaces from './Necklaces';
import Rings from './Rings';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-yellow-600">
    {title}
  </h2>
);

const ViewAllMJ = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        💎 Men's Jewelry Collection
      </h1>

      {/* Jewelry Sections */}
      <SectionTitle title="🔗 Bracelets" />
      <Bracelets />

      <SectionTitle title="✨ Earrings" />
      <Earrings />

      <SectionTitle title="📿 Necklaces" />
      <Necklaces />

      <SectionTitle title="💍 Rings" />
      <Rings />
    </div>
  );
};

export default ViewAllMJ;
