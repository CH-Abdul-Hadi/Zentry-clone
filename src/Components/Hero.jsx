import React, { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

function Hero() {
  // kon si video chal rahi hai
  const [currentIndex, setCurrentIndex] = useState(1);
  // center video pa gab tek click nahi ho ga tab tek false rha ga
  const [HasClicked, setHasClicked] = useState(false);
  // bata hai ka video load ho rahi hai ya nahi(abi tek use nahi kia )
  const [isLoading, setIsLoading] = useState(true);
  // kitni video load ho gi hai
  const [loadedVideos, setLoadedVideos] = useState(0);
  //  number of videos hai
  const totalVideos = 3;
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

  return (
    <div className=" relative h-dvh w-screen overflow-x-hidden ">
      <div
        className=" relative z-10 h-dvh w-screen 
      overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* video ka div hai */}
          <div
            id="video-frame"
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
          {/* no idea */}
          {/*Renders the current video, but it’s invisible (no idea ) */}
          <video
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center "
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoad}
          />
          {/* no idea */}

          {/* background video hai */}
          <video
            src={getVideoSrc(
              (currentIndex === totalVideos) - 1 ? 1 : currentIndex
            )}
            loop
            muted
            // autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        {/* upper wali heading hai  */}
        <div className=" absolute left-0 top-0 z-40 size-full">
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
