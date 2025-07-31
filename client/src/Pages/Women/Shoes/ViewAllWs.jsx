import React from 'react';
import BeRightBackw from './BeRightBackw';
import BootsAnkleBootsw from './BootsAnkleBootsw';
import Loafersw from './Loafersw';
import MulesandPumps from './MulesandPumps';
import OutofOfficew from './OutofOfficew';
import Sandalss from './Sandalss';
import Slidesandw from './Slidesandw';
import Sneakersw from './Sneakersw';
import Vulcanizedw from './Vulcanizedw';

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-8 border-b border-gray-300 pb-1">
    {title}
  </h2>
);

const ViewAllWs = () => {
  return (
    <div className="px-6 py-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        👠 Women's Shoes Collection
      </h1>

      <SectionTitle title="Be Right Back" />
      <BeRightBackw />

      <SectionTitle title="Boots & Ankle Boots" />
      <BootsAnkleBootsw />

      <SectionTitle title="Loafers" />
      <Loafersw />

      <SectionTitle title="Mules and Pumps" />
      <MulesandPumps />

      <SectionTitle title="Out of Office" />
      <OutofOfficew />

      <SectionTitle title="Sandals" />
      <Sandalss />

      <SectionTitle title="Slides" />
      <Slidesandw />

      <SectionTitle title="Sneakers" />
      <Sneakersw />

      <SectionTitle title="Vulcanized" />
      <Vulcanizedw />
    </div>
  );
};

export default ViewAllWs;
