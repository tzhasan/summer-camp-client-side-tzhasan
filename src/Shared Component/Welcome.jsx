import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

const Welcome = () => {
  useEffect(() => {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml11 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          document.querySelector(".ml11 .letters").getBoundingClientRect()
            .width + 10,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
      })
      .add({
        targets: ".ml11",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  }, []);
  return (
    <div>
      <h1 className="ml11 text-center  ml12 text-3xl  md:text-6xl italic font-bold text-sky-600">
        <span className="text-wrapper">
          <span className="line line1"></span>
          <span className="letters ">WELLCOME TO PHONETICS</span>
        </span>
      </h1>
    </div>
  );
};

export default Welcome;
