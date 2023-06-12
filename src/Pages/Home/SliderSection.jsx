import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import slider3 from "../../assets/slider/slider11.png";
import slider1 from "../../assets/slider/slider22.png";
import slider2 from "../../assets/slider/slider33.png";
import { Link } from "react-router-dom";
const SliderSection = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <img className="w-full" src={slider2} alt="" />
          <div className="absolute top-1/2 left-1/2 w-full -translate-y-1/2 -translate-x-1/2 text-center space-y-5">
            <h3 className="text-2xl md:text-6xl font-bold text-white">
              Be an Expert on defferent Languages
            </h3>

            <Link to={"/classesPage"}>
              <button className="projectMainButton uppercase text-white">
                our Courses
              </button>
            </Link>
            <button className="projectMainButton uppercase ml-5 text-white">
              get a quote
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img className="w-full" src={slider3} alt="" />
          <div className="absolute top-0 md:mt-20 ml-24 space-y-4">
            <h3 className="text-lg md:text-2xl font-bold text-orange-600">
              Working on
            </h3>
            <h2 className="text-3xl md:text-8xl font-bold text-white  uppercase">
              24 Languages
            </h2>
            <p className="text-orange-600 text-2xl md:text-4xl italic">
              Learn from the best professionals
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slider1} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderSection;
