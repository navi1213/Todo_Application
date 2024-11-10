import React, { useState } from "react";

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRating(star)}
          className="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-8 h-8 ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default StarRating;

