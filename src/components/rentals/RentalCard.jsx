import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Wishlist from "./WishListButton";
import PropTypes from "prop-types";

const RentalCard = ({ rental }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
        e.stopPropagation();
        if (rental.photos?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === rental.photos.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (rental.photos?.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? rental.photos.length - 1 : prev - 1
            );
        }
    };

    const handleClick = () => {
        navigate(`/PropertyDetails/${rental.id}`, { state: { rental } }); // Pass rental data
    };

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden relative cursor-pointer">
            {/* Favorite Button */}
            <Wishlist property_id={rental.id} />
            {/* Image Carousel */}
            <div onClick={handleClick}>
                <div className="relative w-full h-56 overflow-hidden">
                    {rental.photos?.length > 0 ? (
                        <>
                            <img
                                src={rental.photos[currentImageIndex]}
                                alt={`${rental.location} - Image ${currentImageIndex + 1}`}
                                className="w-full h-56 object-cover transition-opacity duration-300"
                            />

                            {/* Navigation Arrows */}
                            {rental.photos.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                        aria-label="Previous Image"
                                    >
                                        <FaChevronLeft className="text-black-700" size={16} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                        aria-label="Next Image"
                                    >
                                        <FaChevronRight className="text-black-700" size={16} />
                                    </button>

                                    {/* Image Indicators */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        {rental.photos.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === index ? "bg-white scale-125" : "bg-white/50"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-600">No Image Available</p>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 relative pb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{rental.location}</h3>
                    <p className="text-gray-500">{rental.date || "Date not available"}</p>

                    {/* Price */}
                    <p className="text-lg font-bold text-gray-900 mt-2">
                        {rental.price ? `JD${rental.price}` : "Price not available"}
                        <span className="text-gray-500 text-sm"> / night</span>
                    </p>

                    {/* Rating moved to bottom right */}
                    <div className="absolute bottom-3 right-4 flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="text-gray-700 font-medium">
                            {rental.rating || "New arrival"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ✅ PropTypes
RentalCard.propTypes = {
    rental: PropTypes.shape({
        id: PropTypes.string.isRequired, // Ensure ID is required for navigation
        location: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number,
        photos: PropTypes.arrayOf(PropTypes.string).isRequired,
        date: PropTypes.string,
    }).isRequired,
};

export default RentalCard;
