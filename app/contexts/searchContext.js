'use client';
import { createContext, useContext, useState } from "react";

const SearchContext = createContext([]);

export const SearchResultsProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([]);
    return (
        <SearchContext.Provider
            value={
                {
                    searchResults,
                    setSearchResults: (data) => setSearchResults(data)
                }
            }
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);