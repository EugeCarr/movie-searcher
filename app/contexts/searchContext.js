import { createContext, useContext, useState } from "react";

const SearchContext = createContext([]);

export const SearchResultsProvider = ({children}) => {
    const [searchResults, setSearchResults] = useState([]);
    return (
        <SearchContext.Provider
            value={
                {
                    ...searchResults,
                    setResults: (data) => setSearchResults(data)
                }
            }
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);