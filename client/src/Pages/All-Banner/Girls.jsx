import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Girls = () => {
  const [banner, setBanner] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axiosSecure.get("/banners?type=GIRL'S");
        if (data.length > 0) {
          setBanner(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch Girls banner:", error);
      }
    };

    fetchBanner();
  }, [axiosSecure]);

  // Default position
  const defaultPosition = "center 30%";

  const handleMouseMove = (e) => {
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // যদি মাউস নিচের দিকে যায় (৫০% এর বেশি), তাহলে ইমেজের উপরের অংশ দেখাবে
    if (yPercent > 50) {
      div.style.backgroundPosition = "center 0%";
    } else {
      div.style.backgroundPosition = defaultPosition;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundPosition = defaultPosition;
  };

  return (
    <div
      className="relative w-full min-h-[80vh] overflow-hidden shadow-2xl rounded-xl my-10 bg-cover transition-all duration-[1500ms] ease-in-out cursor-pointer"
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
      <div className="text-white absolute bottom-6 left-4 sm:bottom-10 sm:left-12 bg-black/40 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 flex justify-between items-center w-[90vw] max-w-xs sm:max-w-[350px] rounded-md shadow-md hover:shadow-xl transition-all duration-300">
        <button className="text-xs sm:text-base px-3 py-1 sm:px-5 sm:py-2 hover:bg-white/30 rounded-md transition-colors duration-300">
          GIRLS SHOP
        </button>
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default Girls;
