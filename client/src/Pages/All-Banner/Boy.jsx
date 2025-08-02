import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Boy = () => {
  const [banner, setBanner] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axiosSecure.get("/banners?type=BOY'S");
        if (data.length > 0) {
          setBanner(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch Boy banner:", error);
      }
    };

    fetchBanner();
  }, [axiosSecure]);

  // Default background position
  const defaultPosition = "center 30%";

  const handleMouseMove = (e) => {
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Cursor নিচের দিকে গেলে ইমেজ একটু উপরে উঠবে
    if (yPercent > 60) {
      div.style.backgroundPosition = "center 10%";
    } else {
      div.style.backgroundPosition = defaultPosition;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundPosition = defaultPosition;
  };

  return (
    <div
      className="relative w-full min-h-[60vh] md:min-h-[80vh] overflow-hidden shadow-2xl rounded-xl my-6 md:my-10 bg-cover bg-center cursor-pointer transition-all duration-[1200ms] ease-in-out"
      style={{
        backgroundImage: `url(${banner?.imageUrl || "https://via.placeholder.com/1200x600"})`,
        backgroundPosition: defaultPosition,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Content Area */}
      <div className="text-white absolute bottom-4 left-4 md:bottom-10 md:left-12 bg-black/40 backdrop-blur-md px-5 md:px-6 py-2 md:py-3 flex justify-between items-center w-[90vw] max-w-xs md:max-w-[350px] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <button className="text-sm md:text-base font-semibold hover:text-yellow-300 transition-colors duration-300">
          BOYS SHOP
        </button>
        <ChevronRight
          size={22}
          className="md:size-6 group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default Boy;
