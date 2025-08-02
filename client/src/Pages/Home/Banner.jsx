import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axiosSecure.get("/banners?type=MEN'S");
        if (data.length > 0) {
          setBanner(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch banner:", error);
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

    // যদি মাউস নিচে যায় (৬০% এর বেশি), ইমেজ কিছুটা উপরে উঠবে
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
    <div>
      <h1 className="py-5">hello</h1>

      <div
        className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden shadow-xl my-10 rounded-xl bg-cover bg-center cursor-pointer transition-all duration-[1200ms] ease-in-out"
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

        {/* Content */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 md:left-12 md:translate-x-0 bg-black/40 backdrop-blur-md px-5 py-3 sm:px-8 sm:py-4 flex justify-between items-center w-[90vw] max-w-xs sm:max-w-sm md:w-[360px] rounded-lg text-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <button className="text-xs sm:text-base font-semibold tracking-wide hover:text-yellow-300 transition-colors duration-300">
            SHOP NOW
          </button>
          <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
