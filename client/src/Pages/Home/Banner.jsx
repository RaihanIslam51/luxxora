import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../../generic reusable component/Loader/Loader"; // adjust path
import { Link } from "react-router-dom";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axiosSecure.get("/banners?type=MEN'S");
        if (data.length > 0) {
          const img = new Image();
          img.src = data[0].imageUrl;
          img.onload = () => {
            setBanner(data[0]);
            setLoading(false); // image is loaded
          };
        } else {
          setLoading(false); // no banner available
        }
      } catch (error) {
        console.error("Failed to fetch banner:", error);
        setLoading(false);
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

    if (yPercent > 60) {
      div.style.backgroundPosition = "center 10%";
    } else {
      div.style.backgroundPosition = defaultPosition;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundPosition = defaultPosition;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="py-5">hello</h1>

      <div
        className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden shadow-xl my-10 rounded-xl bg-cover bg-center cursor-pointer transition-all duration-[1200ms] ease-in-out"
        style={{
          backgroundImage: `url(${banner?.imageUrl})`,
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
        <Link to='/men/all' className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 md:left-12 md:translate-x-0 bg-black/40 backdrop-blur-md px-5 py-3 sm:px-8 sm:py-4 flex justify-between items-center w-[90vw] max-w-xs sm:max-w-sm md:w-[360px] rounded-lg text-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <Link to='/men/all' className="text-xs sm:text-base font-semibold tracking-wide hover:text-yellow-300 transition-colors duration-300">
            SHOP NOW
          </Link>
          <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
