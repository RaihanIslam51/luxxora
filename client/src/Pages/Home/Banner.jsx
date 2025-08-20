// src/components/BannerSlider.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // ✅ Correct import for Swiper v10+
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../../generic reusable component/Loader/Loader";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch all banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const types = ["GIRL'S", "BOY'S", "MEN'S"];
        const allBanners = [];
        for (const type of types) {
          const { data } = await axiosSecure.get(`/banners?type=${encodeURIComponent(type)}`);
          allBanners.push(...data);
        }
        setBanners(allBanners);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
        setLoading(false);
      }
    };
    fetchBanners();
  }, [axiosSecure]);

  if (loading) return <Loader />;
  if (!banners.length) return <p className="text-center py-10">No banners available</p>;

  // Parallax effect on mouse move
  const handleMouseMove = (e, bannerRef) => {
    if (!bannerRef) return;
    const rect = bannerRef.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width - 0.5) * 10; // +/-5px shift
    const yPercent = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    bannerRef.style.backgroundPosition = `calc(50% + ${xPercent}px) calc(30% + ${yPercent}px)`;
  };

  const handleMouseLeave = (bannerRef) => {
    if (!bannerRef) return;
    bannerRef.style.backgroundPosition = "center 30%";
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="relative"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative bg-red-600 h-[60vh] sm:h-[70vh] md:h-[80vh] rounded-xl overflow-hidden transition-all duration-1000 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
            }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Banner Content */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:bottom-16 md:left-12 md:translate-x-0 w-[90vw] max-w-xs sm:max-w-sm md:w-[360px] text-white z-20">
              <h2 className="text-xl sm:text-3xl font-bold mb-3 drop-shadow-lg">
                {banner.title || "Exclusive Collection"}
              </h2>
              <p className="text-sm sm:text-base mb-4 drop-shadow-md">
                {banner.subtitle || "Get your favorite products now!"}
              </p>
              <Link
                to="/men/all"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
