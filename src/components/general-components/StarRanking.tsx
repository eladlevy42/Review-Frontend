import { useState } from "react";
import { Star } from "lucide-react";
interface StarRatingProps {
  stars: number;
  onChange?: (stars: number) => void; // Optional for editable stars
  readOnly?: boolean;
}

function StarRating({ stars, onChange, readOnly = false }: StarRatingProps) {
  const [hoveredStars, setHoveredStars] = useState<number | null>(null);

  const displayStars = hoveredStars !== null ? hoveredStars : stars;
  const fullStars = Math.floor(displayStars);
  const halfStar = displayStars % 1 !== 0 && displayStars % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const handleStarClick = (index: number) => {
    if (onChange && !readOnly) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoveredStars(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredStars(null);
    }
  };
  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star
          height={20}
          key={index}
          className={`text-yellow-500 ${!readOnly ? "cursor-pointer" : ""}`}
          fill="currentColor"
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      {halfStar > 0 && (
        <Star
          className={`text-yellow-500 ${!readOnly ? "cursor-pointer" : ""}`}
          fill="currentColor"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          onClick={() => handleStarClick(fullStars)}
          onMouseEnter={() => handleMouseEnter(fullStars)}
          onMouseLeave={handleMouseLeave}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star
          key={fullStars + index}
          className={`text-gray-300 ${!readOnly ? "cursor-pointer" : ""}`}
          fill="none"
          onClick={() => handleStarClick(fullStars + index)}
          onMouseEnter={() => handleMouseEnter(fullStars + index)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      {hoveredStars !== null && !readOnly && (
        <span className="ml-2">{hoveredStars.toFixed(1)} Stars</span>
      )}
    </div>
  );
}

export default StarRating;
