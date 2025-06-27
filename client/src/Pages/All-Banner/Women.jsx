import { ChevronRight } from "lucide-react";

const Women = () => {
  return (
    <div>
      <div
        className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden shadow-2xl my-6 md:my-10"
        style={{
          backgroundImage: 'url("https://i.ibb.co/Zz1bb2Ck/Nuovo-progetto-82.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Optional subtle dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Area */}
        <div className="text-white absolute bottom-4 left-4 md:bottom-10 md:left-12 bg-black/40 px-4 py-2 md:px-15 md:py-3 flex justify-between items-center w-[90vw] max-w-xs md:max-w-[350px]">
          <button className="text-xs md:text-base font-semibold">
            DISCOVERY MORE
          </button>
          <div>
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;