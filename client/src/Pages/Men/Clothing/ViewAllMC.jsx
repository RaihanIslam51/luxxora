import React from 'react';
import CoatsJackets from './CoatsJackets';
import Denim from './Denim';
import Knitwear from './Knitwear';
import Leather from './Leather';
import Shorts from './Shorts';
import Sweatshirt from './Sweatshirt';
import Swimwear from './Swimwear';
import Tshirt from './Tshirt';
import Underwear from './Underwear';



const ViewAllMC = () => {
  return (
    <div className="pt-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        👔 Men's Clothing Collection
      </h1>

      {/* Clothing Sections */}
      
      <CoatsJackets />

      
      <Denim />

   
      <Knitwear />

      <Leather />

     
      <Shorts />

      
      <Sweatshirt />

      
      <Swimwear />

      
      <Tshirt />

     
      <Underwear />
    </div>
  );
};

export default ViewAllMC;
