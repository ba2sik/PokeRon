import SearchIcon from './SearchIcon';
import React, { useCallback } from 'react';

export type SearchProps = Required<
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
>;

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  const handleInputChange = useCallback(onChange, [onChange]);

  return (
    <label className="input input-bordered m-4 w-[40vw] flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="grow"
        placeholder="Search a Pokémon..."
      />
      <SearchIcon />
    </label>
  );
};

export default Search;
