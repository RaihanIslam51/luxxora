import React from "react";

const Cart = () => {
  // Dummy cart data (API থেকে আনতে পারবেন)
  const cartData = [
    {
      id: 1,
      userName: "Raihan Islam",
      productName: "Off-White T-Shirt",
      price: 2500,
      discountPrice: 2000,
    },
    {
      id: 2,
      userName: "Raihan Islam",
      productName: "Nike Sneakers",
      price: 5000,
      discountPrice: 4500,
    },
  ];

  // ✅ Calculation
  const totalPrice = cartData.reduce((sum, item) => sum + item.price, 0);
  const totalDiscount = cartData.reduce(
    (sum, item) => sum + (item.price - item.discountPrice),
    0
  );
  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className="pt-28 px-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        💳 Payment Page
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cartData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.productName}
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold">User:</span> {item.userName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Price:</span> ৳{item.price}
            </p>
            <p className="text-red-500 font-semibold">
              Discount: ৳{item.price - item.discountPrice}
            </p>
            <p className="text-green-700 font-bold">
              Payable: ৳{item.discountPrice}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Total Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🧾 Order Summary</h3>
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Total Price:</span> ৳{totalPrice}
        </p>
        <p className="text-red-500 text-lg font-semibold">
          Total Discount: ৳{totalDiscount}
        </p>
        <p className="text-green-700 text-lg font-bold">
          Final Price: ৳{finalPrice}
        </p>

        <button className="mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-pink-500 hover:to-orange-400 transition text-lg font-semibold">
          ✅ Payment Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
