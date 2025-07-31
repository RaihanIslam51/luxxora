import React from 'react';
import SoftAccessories from './SoftAccessories';
import Beltsw from './Beltsw';
import WalletandCardholders1 from './WalletandCardholders1';

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">
    {title}
  </h2>
);

const ViewAllWAs = () => {
  return (
    <div  className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        👛 Women's Accessories Collection
      </h1>

      <SectionTitle title="Soft Accessories" />
      <SoftAccessories />

      <SectionTitle title="Belts" />
      <Beltsw />

      <SectionTitle title="Wallets & Cardholders" />
      <WalletandCardholders1 />
    </div>
  );
};

export default ViewAllWAs;
