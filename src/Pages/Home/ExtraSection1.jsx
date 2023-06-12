import React, { useEffect } from "react";
import anime from "animejs";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/67523-teamwork-lottie-animation.json";
import AOS from "aos";
import "aos/dist/aos.css"; 

const ExtraSection1 = () => {
  useEffect(() => {
    var textWrapper = document.querySelector(".ml12");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml12 .letter",
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      })
      .add({
        targets: ".ml12 .letter",
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
  return (
    <div className="md:mt-16">
      <h1
        data-aos="fade-up"
        className="ml12 text-3xl text-center md:text-8xl text-sky-600 "
      >
        BUILD UP YOUR SUPER SKILLS
      </h1>
      <div data-aos="fade-up" className="w-[60%] mx-auto">
        <Lottie animationData={groovyWalkAnimation} loop={true} />
      </div>
    </div>
  );
};

export default ExtraSection1;