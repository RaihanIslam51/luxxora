import React from 'react';
import Braceletsw from './Braceletsw';
import Earringsw from './Earringsw';
import Necklacesw from './Necklacesw';
import Ringsw from './Ringsw';

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">
    {title}
  </h2>
);

const ViewAllJJ = () => {
  return (
    <div  className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        💍 Women's Jewelry Collection
      </h1>

      <SectionTitle title="Bracelets" />
      <Braceletsw />

      <SectionTitle title="Earrings" />
      <Earringsw />

      <SectionTitle title="Necklaces" />
      <Necklacesw />

      <SectionTitle title="Rings" />
      <Ringsw />
    </div>
  );
};

export default ViewAllJJ;
