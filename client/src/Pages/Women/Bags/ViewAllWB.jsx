import React from 'react';
import ClutchesPouches from './ClutchesPouches';
import ShoulderBags from './ShoulderBags';
import TophandleBags from './TophandleBags';
import ToteBagsw from './ToteBagsw';

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">
    {title}
  </h2>
);

const ViewAllWB = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        👜 Women's Bags Collection
      </h1>

      <SectionTitle title="Clutches & Pouches" />
      <ClutchesPouches />

      <SectionTitle title="Shoulder Bags" />
      <ShoulderBags />

      <SectionTitle title="Top Handle Bags" />
      <TophandleBags />

      <SectionTitle title="Tote Bags" />
      <ToteBagsw />
    </div>
  );
};

export default ViewAllWB;
