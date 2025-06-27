import { ChevronRight } from "lucide-react";

const Boy = () => {
  return (
    <div
      className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden shadow-2xl my-6 md:my-10"
      style={{
        backgroundImage: 'url("https://i.ibb.co/xtSFHyLv/Nuovo-progetto-78.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Optional subtle dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Area */}
      <div className="text-white absolute bottom-4 left-4 md:bottom-10 md:left-12 bg-black/40 px-5 md:px-15 py-2 md:py-3 flex justify-between items-center w-[90vw] max-w-xs md:max-w-[350px]">
        <button className="text-sm md:text-base font-semibold">
          BOYS SHOP
        </button>
        <div>
          <ChevronRight size={20} className="md:size-6" />
        </div>
      </div>

    </div>
  );
};

export default Boy;