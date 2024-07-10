import SearchIcon from './SearchIcon';
import React, { useCallback } from 'react';

export type SearchProps = {
  text: string;
  onChange: (searchTerm: string) => void;
};

const Search: React.FC<SearchProps> = ({ text, onChange }) => {
  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  return (
    <label className="input input-bordered m-4 w-3/4 flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        className="grow"
        placeholder="Search"
      />
      <SearchIcon />
    </label>
  );
};

export default Search;
