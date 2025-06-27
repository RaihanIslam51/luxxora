import { ChevronRight } from "lucide-react";

const Banner = () => {
  return (
    <div
      className="
        relative w-full 
        min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] 
        overflow-hidden shadow-2xl my-10
      "
      style={{
        backgroundImage: 'url("https://i.ibb.co/FkvqMMJJ/Nuovo-progetto-84.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional subtle dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Area */}
      <div
        className="
          text-white absolute 
          bottom-4 left-1/2 -translate-x-1/2 
          md:bottom-10 md:left-12 md:translate-x-0
          bg-black/40 
          px-4 py-2 sm:px-8 sm:py-3 md:px-15 md:py-3 
          flex justify-between items-center 
          w-[90vw] max-w-xs sm:max-w-sm md:w-[350px]
          rounded
        "
      >
        <button className="text-xs sm:text-base font-semibold tracking-wide">
          SHOP NOW
        </button>
        <div>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
