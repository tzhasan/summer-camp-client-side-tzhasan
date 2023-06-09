import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import slider3 from "../../../src/assets/slider/image1 (1).png";
import slider1 from "../../../src/assets/slider/image2 (1).png";
import slider2 from "../../../src/assets/slider/image3 (1).png";
import { Link } from "react-router-dom";
const SliderSection = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={true}
        className="mySwiper"
      >
        <SwiperSlide className="relative">
          <img className="w-full" src={slider3} alt="" />
          <div className="absolute top-1/2 left-1/2 w-full -translate-y-1/2 -translate-x-1/2 text-center space-y-5">
            <h3 className="text-2xl md:text-6xl font-bold text-sky-600">
              Be an Expert on defferent Languages
            </h3>

            <Link className="">
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
          <img className="w-full" src={slider2} alt="" />
          <div className="absolute top-0 md:mt-20 ml-24 space-y-4">
            <h3 className="text-lg md:text-2xl font-bold text-sky-600">
              Working on
            </h3>
            <h2 className="text-3xl md:text-8xl font-bold text-white  uppercase">
              24 Languages
            </h2>
            <p className="text-sky-600 text-2xl md:text-4xl italic">
              Learn from the best professionals
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slider1} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SliderSection;
