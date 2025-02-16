import { useEffect, useRef } from "react";
import "./home.css";
import { FaSearch } from "react-icons/fa";


function Hero() {


  //// To play video from 5 second //////
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.onloadedmetadata = () => {
        video.currentTime = 5; // Start from 5 seconds
      };
    }
  }, []);
  /////////////////////////


  return (
    <>
      {/* Hero Section with Video Background */}

      <div className="relative h-screen flex flex-col items-center justify-center text-center text-white">
        {/* Background video*/}
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            className="min-w-full min-h-full absolute object-cover "
            src="src/assets/hero.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
          />
          
        </div>


        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold ">
            Escape to the <span className="">Horizon Villas</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Take your pick of the world’s finest villas – we’ll handle the rest.
          </p>

          {/* Search bar */}
          <div className=" rounded-full p-2 flex mt-8 shadow-lg w-200 border-1 border-white ">
            <input
              type="text"
              placeholder="Search ...."
              className="flex-1 px-4 py-2  outline-none text-white rounded-l-full"

            />
            <button className="bg-[#A59D84] text-white px-6 py-2 rounded-full flex items-center">
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>



        </div>
      </div>
    </>
  )
}

export default Hero
