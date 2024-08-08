import React, { FC } from 'react';
import HeartFilled from '/heart-filled.svg';
import HeartOutline from '/heart-outline.svg';
import { twMerge } from 'tailwind-merge';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>;

export const FavoriteButton: FC<FavoriteButtonProps> = ({ isFavorite, onClick, ...props }) => {
  return (
    <div {...props}>
      <button
        onClick={onClick}
        className={twMerge(
          'w-9 h-9 flex items-center justify-center rounded-full shadow-lg bg-white border border-gray-300 transition-colors duration-200',
          isFavorite ? 'bg-red-500 border-transparent' : '',
        )}
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
