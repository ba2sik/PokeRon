import React, { FC } from 'react';
import HeartFilled from '/heart-filled.svg';
import HeartOutline from '/heart-outline.svg';
import { twMerge } from 'tailwind-merge';

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: () => void;
} & Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>;

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'w-9 h-9 flex items-center justify-center rounded-full shadow-all-sides bg-white transition-colors duration-200',
        className,
      )}
      {...props}
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
          className="w-5 h-5 fill-red-600"
        />
      )}
    </button>
  );
};
