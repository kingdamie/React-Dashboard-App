import React from "react";
import { FiSearch } from "react-icons/fi"; // Search Icon from react-icons

const SearchBar: React.FC = () => {
	return (
		<div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1 w-full max-w-xs">
			{/* Search Input */}
			<input
				type="text"
				placeholder="Search Anything Here..."
				className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-1 w-full outline-none"
			/>
			{/* Search Button with Icon */}
			<button className=" rounded-lg p-2 ml-2">
				<FiSearch size={20} />
			</button>
		</div>
	);
};

export default SearchBar;
