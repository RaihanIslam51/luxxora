import React from 'react';
import BeRightBack from './BeRightBack';
import Boots from './Boots';
import FormalShoes from './FormalShoes';
import OutofOffice from './OutofOffice';
import Slides from './Slides';
import Sneaker from './Sneaker';
import Vulcanized from './Vulcanized';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-blue-600">
    {title}
  </h2>
);

const ViewAllMS = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        👞 Men's Shoes Collection
      </h1>

      {/* Shoes Sections */}
      <SectionTitle title="🆕 Be Right Back" />
      <BeRightBack />

      <SectionTitle title="🥾 Boots" />
      <Boots />

      <SectionTitle title="👞 Formal Shoes" />
      <FormalShoes />

      <SectionTitle title="🏢 Out of Office" />
      <OutofOffice />

      <SectionTitle title="🩴 Slides" />
      <Slides />

      <SectionTitle title="👟 Sneakers" />
      <Sneaker />

      <SectionTitle title="🌀 Vulcanized" />
      <Vulcanized />
    </div>
  );
};

export default ViewAllMS;
