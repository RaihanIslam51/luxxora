// Sample product data array
import { CiHeart } from "react-icons/ci";

const products = [
  {
    id: 1,
    image: 'https://i.ibb.co/B5Q5bXmX/OMBB085-S25-FLE00-I-6110-1.jpg',
    name: 'Classic Shirt',
    price: 2000,
    discountPrice: 1000,
    discount: '50%',
  },
  {
    id: 2,
    image: 'https://i.ibb.co/HTTsWWVv/OMGG014-S25-FAB001-0110-1-3.jpg',
    name: 'Denim Jacket',
    price: 3000,
    discountPrice: 1500,
    discount: '50%',
  },
  {
    id: 3,
    image: 'https://i.ibb.co/9Hw8DXqn/OMES017-S25-FAB001-6157-1-3-1.jpg',
    name: 'Slim Jeans',
    price: 2500,
    discountPrice: 1250,
    discount: '50%',
  },
  {
    id: 4,
    image: 'https://i.ibb.co/QjpJyxqb/OMAA120-S25-JER00-G-1042-1-2.jpg',
    name: 'White Sneakers',
    price: 4000,
    discountPrice: 2000,
    discount: '50%',
  },
  // ...add more products as needed
];

const ProductCard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-left mb-8">SS25 MENSWEAR SALE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative border border-gray-200 rounded-xl p-4 bg-white text-center shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Wishlist icon */}
            <span
              className="absolute top-3 right-4 text-2xl text-red-500 cursor-pointer select-none"
              title="Add to wishlist"
            >
              <CiHeart />
            </span>

            {/* Product image with bigger size */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-md transition-transform duration-300 hover:scale-105"
            />

            {/* Product name */}
            <div
              className="mt-4 mb-2 font-semibold text-lg text-left truncate"
              title={product.name}
            >
              {product.name}
            </div>

            {/* Price section */}
            <div className="flex items-center justify-start space-x-2">
              <span className="line-through text-gray-400">৳{product.price}</span>
              <span className="text-green-600 font-bold">৳{product.discountPrice}</span>
              <span className="bg-red-100 text-red-600 rounded px-3 py-1 text-sm font-bold ml-2">
                {product.discount} OFF
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
