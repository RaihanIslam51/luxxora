import React from 'react';
import BackPacks from './BackPacks';
import Crossbodybags from './Crossbodybags';
import Totebags from './Totebags';
import WaistBags from './WaistBags';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-rose-600">
    {title}
  </h2>
);

const ViewAllMB = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        🎒 Men's Bag Collection
      </h1>

      {/* Bag Sections */}
      <SectionTitle title="🎒 Backpacks" />
      <BackPacks />

      <SectionTitle title="👜 Crossbody Bags" />
      <Crossbodybags />

      <SectionTitle title="🛍️ Tote Bags" />
      <Totebags />

      <SectionTitle title="🎽 Waist Bags & Clutches" />
      <WaistBags />
    </div>
  );
};

export default ViewAllMB;
