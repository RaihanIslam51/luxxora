import React from 'react';
import Eyeglass from '../Eyeglass/Eyeglass';
import Sunglasse from '../Sunglasses/Sunglasse';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-purple-600">
    {title}
  </h2>
);

const ViewAllE = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        👓 Eyewear Collection
      </h1>

      {/* Eyeglass Section */}
      <SectionTitle title="👓 Eyeglasses" />
      <Eyeglass />

      {/* Sunglasses Section */}
      <SectionTitle title="🕶️ Sunglasses" />
      <Sunglasse />
    </div>
  );
};

export default ViewAllE;
