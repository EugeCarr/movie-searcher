import { ChakraProvider } from "@chakra-ui/react";
import { SearchResultsProvider } from './contexts/searchContext';
import SearchBar from './components/SearchGrid';
import { MovieResultGrid } from "./components/movieResultArray";

function App() {
  return (
    <ChakraProvider>
      <SearchResultsProvider>
        <SearchBar />
        <MovieResultGrid/> 
      </SearchResultsProvider>
    </ChakraProvider>
  );
}

export default App;