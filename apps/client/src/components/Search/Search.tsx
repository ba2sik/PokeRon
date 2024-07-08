import SearchIcon from './SearchIcon';

const Search = () => {
  return (
    <label className="input input-bordered m-4 flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Search"
      />
      <SearchIcon />
    </label>
  );
};

export default Search;
