import React, { FC } from 'react';
import HeartFilled from '/heart-filled.svg';
import HeartOutline from '/heart-outline.svg';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: (isChecked: boolean) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

export const FavoriteButton: FC<FavoriteButtonProps> = ({ isFavorite, onClick, ...props }) => {
  const handleClick = () => onClick(!isFavorite);

  return (
    <div {...props}>
      <button
        onClick={handleClick}
        className={`w-9 h-9 flex items-center justify-center rounded-full shadow-lg bg-white border border-gray-300 transition-colors duration-200 ${
          isFavorite ? 'bg-red-500 border-transparent' : ''
        }`}
      >
        {isFavorite ? (
          <img
            src={HeartFilled}
            alt="Filled Heart"
            className="w-5 h-5"
          />
        ) : (
          <img
            src={HeartOutline}
            alt="Outline Heart"
            className="w-5 h-5"
          />
        )}
      </button>
    </div>
  );
};
