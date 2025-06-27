import { ChevronRight } from "lucide-react";

const Girls = () => {
  return (
       <div
      className="relative w-full min-h-[80vh] overflow-hidden shadow-2xl my-10"
      style={{
        backgroundImage: 'url("https://i.ibb.co/x82Mqw82/Nuovo-progetto-77.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional subtle dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Area */}
      <div className="text-white absolute bottom-6 left-4 sm:bottom-10 sm:left-12 bg-black/40 px-4 py-2 sm:px-15 sm:py-3 flex justify-between items-center w-[90vw] max-w-xs sm:max-w-[350px] rounded-md">
        <button className="text-xs sm:text-base px-3 py-1 sm:px-5 sm:py-2 bg-white/20 hover:bg-white/30 rounded transition">
          GIRLS SHOP
        </button>
        <div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>

    </div>
  );
};

export default Girls;