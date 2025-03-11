import { useState, useEffect } from "react";
import { MapPin, DollarSign, BedDouble, Bath } from 'lucide-react';
import axios from "axios";

const firebaseUrl =
  "https://testrent-b52c9-default-rtdb.firebaseio.com/products.json";

export default function NewRentals() {
  const [rentals, setRentals] = useState([]);

  const fetchRentals = async () => {
    try {
      const response = await axios.get(firebaseUrl);

      if (response.data) {
        const rentalsArray = Object.keys(response.data)
          .map((key) => ({
            id: key,
            ...response.data[key],
          }))
          .slice(0, 4); // Get first 4 items

        setRentals(rentalsArray);
      } else {
        setRentals([]);
      }
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 ">
      <div className="text-center mt-12 mb-7">
        <h1 className="text-4xl font-bold text-center text-black p-4 rounded-lg">
          New Rental Villas
        </h1>

      </div>


      {rentals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
            >
              <div className="relative">
                <img
                  src={rental.photos}
                  alt={rental.title}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[#A59D84]">
                    New
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-sm text-gray-500">{rental.location}</p>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#A59D84] transition-colors">
                  {rental.title}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-black">
                      {rental.price} JD
                    </span>

                    <span className="text-gray-500">/night</span>
                  </div>

                  <div className="flex gap-3 text-gray-500">
                    <div className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      <span className="text-sm">{rental.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">{rental.baths}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Properties Available
            </h3>
            <p className="text-gray-500">
              Check back soon for new listings in your area
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
