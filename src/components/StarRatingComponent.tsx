import React from 'react';

interface StarsRatingProps {
    rating: number;
}

const StarsRating: React.FC<StarsRatingProps> = ({ rating }) => {
    const stars = Math.round(rating/2);

    return (
        <div>
            <label>Рейтинг:</label>
            <div>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index}>
            {index < stars ? '★' : '☆'}
          </span>
                ))}
            </div>
            <p>{rating.toFixed(1)}</p>
        </div>
    );
};

export default StarsRating;
