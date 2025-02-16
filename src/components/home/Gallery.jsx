import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 


function Gallery() {

// Code for view Gallery section////////////////////////////////////////////////////////////////////
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { id: 1, url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NjUxMTE1MjM3ODI5MzAwODI2/original/e4f9a3d4-5891-473f-8a65-e9ea485ad63a.jpeg?im_w=720&im_format=avif' },
    { id: 2, url: 'https://a0.muscache.com/im/pictures/390e6fee-694c-40eb-896d-f3762e72a184.jpg?im_w=1200&im_format=avif' },
    { id: 3, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50474130/original/5594235f-9a59-4b5b-8a4e-b88bbb8fb2f0.jpeg?im_w=1200&im_format=avif' },
    { id: 4, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-17137173/original/35d33a88-e88b-4506-8a34-81545cc4a2e1.jpeg?im_w=1200&im_format=avif' },
    { id: 5, url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTM4MDU5MDkwMTU1NTEwOTky/original/dd74f5e7-1c7b-4f1e-bd51-b99eadbc856d.jpeg?im_w=1200&im_format=avif' },
    { id: 6, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-881513318527514472/original/fe839fa0-ccb2-46ea-9c28-31f79235b56a.jpeg?im_w=1200&im_format=avif' },
    { id: 7, url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-751955867209277685/original/8cf3bb71-1172-45f3-a42b-0e2b59e52d33.jpeg?im_w=1200&im_format=avif' },
    { id: 8, url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMyNDYwNjg3ODU4MTk2NzAyMQ%3D%3D/original/bb897ec5-c2a3-4761-a502-b69d33bab379.jpeg?im_w=1200&im_format=avif' },
    { id: 9, url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-937324205439662940/original/6f0aaeb3-3c61-47c1-9096-63a2e73b783c.jpeg?im_w=1200&im_format=avif' },
    { id: 10, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-740443026570850650/original/8263d1eb-a895-4453-89b3-8497aa6b3b48.jpeg?im_w=1200&im_format=avif' },
    { id: 11, url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-947584705728520142/original/5c1b4ac3-dc3b-45c1-acb2-da167078c840.jpeg?im_w=1200&im_format=avif' },
    { id: 12, url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-779745708573674730/original/7de9476a-a505-4b74-b7f2-067737a2ca04.jpg?im_w=1200&im_format=avif' },

  ];


  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= images.length ? 0 : prevIndex + 4
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 < 0 ? Math.max(images.length - 4, 0) : prevIndex - 4
    );
  };

  // Get visible images based on current index
  const visibleImages = images.slice(currentIndex, currentIndex + 4);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
    {/* Gallery section */}
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mt-12 ">
          <h1 className="text-4xl font-bold text-center text-black p-4 rounded-lg ">
            Step Inside And Be Swept Away
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Experience the perfect blend of luxury and comfort as you explore our exquisite villas.
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className=""
            aria-label="Previous"
          ></button>

          <button
            onClick={next}
            className=""
            aria-label="Next"
          ></button>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
            {visibleImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-[4/3] overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(images.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 4)}
                className={`w-2 h-2 rounded-full transition-colors ${Math.floor(currentIndex / 4) === index ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  )
}

export default Gallery
