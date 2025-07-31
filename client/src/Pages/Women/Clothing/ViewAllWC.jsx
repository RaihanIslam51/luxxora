import React from 'react';
import CotsJackets1 from './CotsJackets1';
import Denimw from './Denimw';
import Dresses from './Dresses';
import Knitwear1 from './Knitwear1';
import Leatherw from './Leatherw';
import Pants from './Pants';
import Shirts from './Shirts';
import Skirts from './Skirts';
import Sweatshirts from './Sweatshirts';
import Swimwear2 from './Swimwear2';
import TShirtsTops from './TShirtsTops';
import Underwearw from './Underwearw';

const SectionTitle = ({ title }) => (
  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-200 pb-2">
    {title}
  </h2>
);

const ViewAllWC = () => {
  return (
    <div className="pt-10 px-5 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
        👗 Women's Clothing Collection
      </h1>

      <SectionTitle title="Coats & Jackets" />
      <CotsJackets1 />

      <SectionTitle title="Denim" />
      <Denimw />

      <SectionTitle title="Dresses" />
      <Dresses />

      <SectionTitle title="Knitwear" />
      <Knitwear1 />

      <SectionTitle title="Leather" />
      <Leatherw />

      <SectionTitle title="Pants" />
      <Pants />

      <SectionTitle title="Shirts" />
      <Shirts />

      <SectionTitle title="Skirts" />
      <Skirts />

      <SectionTitle title="Sweatshirts" />
      <Sweatshirts />

      <SectionTitle title="Swimwear" />
      <Swimwear2 />

      <SectionTitle title="T-Shirts & Tops" />
      <TShirtsTops />

      <SectionTitle title="Underwear" />
      <Underwearw />
    </div>
  );
};

export default ViewAllWC;
