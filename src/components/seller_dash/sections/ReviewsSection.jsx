import React, { useState, useMemo } from "react";
import { FaStar, FaRegCommentDots, FaRegBuilding } from "react-icons/fa";

export default function ReviewsSection({ reviews = [], properties = [] }) {
  const [propertyFilter, setPropertyFilter] = useState("");

  const getPropertyName = (propertyId) => {
    const prop = properties.find((p) => p.id.toString() === propertyId.toString());
    return prop ? prop.title : "Unknown Property";
  };

  const filteredReviews = useMemo(() => {
    if (!propertyFilter) return reviews;
    return reviews.filter((review) => review.productId.toString() === propertyFilter.toString());
  }, [reviews, propertyFilter]);

  const averageRating = useMemo(() => {
    if (filteredReviews.length === 0) return 0;
    const totalRating = filteredReviews.reduce((acc, review) => acc + (Number(review.rate) || 0), 0);
    return totalRating / filteredReviews.length;
  }, [filteredReviews]);

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ECEBDE] to-[#D7D3BF] px-6 py-5 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <FaRegCommentDots className="text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Property Reviews</h2>
            <p className="text-sm text-gray-600">Customer feedback and ratings</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Filter and Rating */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="w-full sm:max-w-xs">
            <div className="relative">
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Properties</option>
                {properties.map((prop) => (
                  <option key={prop.id} value={prop.id}>
                    {prop.title}
                  </option>
                ))}
              </select>
              <FaRegBuilding className="absolute right-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Average Rating */}
          <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
            <div className="text-center pr-4 border-r border-gray-200">
              <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500 ml-1">/5</span>
            </div>
            <div className="flex items-center pl-4">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(averageRating) ? "text-amber-400" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-100 hover:shadow-sm transition-all"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-[#543A14]">
                    {getPropertyName(review.productId)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${i < Math.round(Number(review.rate) || 0) ? "text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="mb-2">
                  <p className="text-sm text-gray-600 font-medium">
                    {review.reviewerName}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <FaRegCommentDots className="mx-auto text-3xl text-gray-300 mb-3" />
            <p className="text-gray-500">No reviews found for selected property</p>
          </div>
        )}
      </div>
    </section>
  );
}