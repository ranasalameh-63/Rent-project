import React from 'react'

function Features() {

    const features = [
        {
          title: "Luxury Amenities",
          description: "Each villa comes fully equipped with premium facilities including private pools, modern kitchens, and high-end entertainment systems."
        },
        {
          title: "Prime Locations",
          description: "Our villas are situated in the most sought-after locations, offering stunning views and easy access to local attractions."
        },
        {
          title: "Peace Of Mind",
          description: " Our Destination Specialists are on hand to help you select the perfect vacation home."
        }
      ];

  return (
    <>
     {/* Features Section */}
     <div className="bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-black p-4 rounded-lg mb-5">
            Our Features
          </h1>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="mb-4">
                  <div className="h-12 w-12 bg-[#C1BAA1] rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Features
