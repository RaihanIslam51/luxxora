import React from 'react';
import HatsandScarves from './HatsandScarves';
import OthersAccessories from './OthersAccessories';
import WalletandCardholders from './WalletandCardholders';

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-10 mb-5 relative pl-4 border-l-4 border-green-600">
    {title}
  </h2>
);

const ViewAllMA = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        🧢 Men's Accessories Collection
      </h1>

      {/* Accessories Sections */}
      <SectionTitle title="🎩 Other Accessories" />
      <OthersAccessories />

      <SectionTitle title="💳 Wallet & Cardholders" />
      <WalletandCardholders />

      <SectionTitle title="🧣 Hats & Scarves" />
      <HatsandScarves />
    </div>
  );
};

export default ViewAllMA;
