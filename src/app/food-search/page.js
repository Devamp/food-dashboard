const SearchBar = () => {
  return (
    <div className="flex flex-col bg-orange-500 items-center p-14 mt-50 h-fit w-3/4 ml-auto mr-auto">
      <label for="searchBar" className="block text-2xl font-bold text-black">
        Search your favorite food!
      </label>
      <div className="flex mt-5 bg-white w-96 justify-center">
        <input
          type="text"
          id="searchBar"
          className="p-2 rounded-lg focus:outline bg-gray-200"
          placeholder="Try searching for a food item..."
          required
        />
        <button
          type="submit"
          className="text-white bg-slate-800 ml-3 p-2 rounded-lg hover:bg-slate-700"
        >
          {" "}
          Search
        </button>
      </div>
    </div>
  );
};

export default function FoodSearch() {
  return <SearchBar />;
}
