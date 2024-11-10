import React, { useState } from "react";

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div>
      {[1, 2, 3].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          style={{ color: star <= rating ? "gold" : "gray" }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;


