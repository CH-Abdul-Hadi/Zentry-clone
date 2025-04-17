import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  // kon si video chal rahi hai
  const [currentIndex, setCurrentIndex] = useState(1);
  // center video pa gab tek click nahi ho ga tab tek false rha ga
  const [HasClicked, setHasClicked] = useState(false);
  // bata hai ka video load ho rahi hai ya nahi(abi tek use nahi kia )
  const [isLoading, setIsLoading] = useState(true);
  // kitni video load ho gi hai
  const [loadedVideos, setLoadedVideos] = useState(0);
  // number of videos hai
  const totalVideos = 4;
  // no idea
  const nextVideoRef = useRef(null);
  // calculate which video index will play
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // handles which video will load
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };
  // the clip video in center if clicked it will call setCurrentIndex and change the video
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // make the video src
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // for loaded videos
  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // use of Gsap
  useGSAP(
    () => {
      if (HasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className=" relative h-dvh w-screen overflow-x-hidden ">
      {isLoading && (
        <div className="flex-center absolute-center z-[100] overflow-hidden w-screen h-dvh">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        className=" relative z-10 h-dvh w-screen 
      overflow-hidden rounded-lg bg-blue-75"
        id="video-frame"
      >
        <div>
          {/* video ka div hai */}
          <div
            className="mask-clip-path absolute-center z-50 absolute 
            size-64 cursor-pointer overflow-hidden rounded-lg"
          >
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all 
              duration-500 ease-in hover:scale-100 hover:opacity-100 "
            >
              {/* video center clip hai */}
              <video
                loop
                muted
                src={getVideoSrc(upcomingVideoIndex)}
                ref={nextVideoRef}
                className=" size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/*Renders the current video, added gasp effect */}
          <video
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center "
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoad}
          />

          {/* background video hai */}
          <video
            src={getVideoSrc(
              (currentIndex === totalVideos) - 1 ? 1 : currentIndex
            )}
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center "
            onLoadedData={handleVideoLoad}
          />
        </div>
        {/* upper wali heading hai  */}
        <div className=" absolute left-0 top-0 z-40 size-full ">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metaname layer <br />
              Unleash the play Economy
            </p>
            <Button
              id="watch-trailer"
              title="watch Trailer"
              leftIcons={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
        {/*  bottom wali heading hai */}
        <h1
          className="special-font hero-heading absolute 
        bottom-5 right-5 z-40 text-blue-75"
        >
          G<b>a</b>ming
        </h1>
      </div>
      {/* heading ka necha wali animation ka lia hai */}
      <h1
        className="special-font hero-heading 
      absolute bottom-5 right-5  text-black"
      >
        G<b>a</b>ming
      </h1>
    </div>
  );
}

export default Hero;
