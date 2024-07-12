import PokeballIcon from '/Poké_Ball_icon.svg';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type LoaderProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
  return (
    <img
      src={PokeballIcon}
      className={twMerge('w-40 m-auto animate-bounce', className)}
      alt="Pokeball Loader"
      {...props}
    />
  );
};
