import React from 'react'
import { Link } from 'react-router-dom';


function Categories() {

    /////////// For Categories section//////////////////
  const categories = [
    {
      title: 'Amazing pools',
      description: 'Discover properties with stunning pools.',
      image: 'https://a0.muscache.com/im/pictures/4cd03a3a-ad0a-4039-822e-a00017f01c87.jpg?im_w=1200&im_format=avif'
    },
    {
      title: 'Castles',
      description: 'Experience luxury stays in historic castles.',
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=1200&im_format=avif'
    },
    {
      title: 'Earth Homes',
      description: 'friendly homes for connection with nature.',
      image: 'https://a0.muscache.com/im/pictures/miso/Hosting-823789884284098040/original/22f2a67f-b0f3-47cf-9a34-44c2424b8776.jpeg?im_w=1200&im_format=avif'
    },
    {
      title: 'Historical Homes',
      description: 'Explore accommodations in world-class cities.',
      image: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-52291644/original/ffeeb710-2e97-423f-a0b7-56e36a40fc70.jpeg?im_w=1200&im_format=avif'
    }
  ];
  /////////////////////////////////////////////////////////


  return (
    <>
      {/* Catigories Section */}
      <div className="text-center mt-12">
        <h1 className="text-4xl font-bold text-center text-black p-4 rounded-lg">
          Discover Our Featured Categories
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Explore a variety of unique properties that cater to all your travel dreams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">

        {categories.map((category) => (
          <div
            key={category.title}
            className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h2 className="text-xl font-bold">{category.title}</h2>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>

            {/* Button */}
            <Link to="/rentals" className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
              View collection
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Categories
