'use client';
import { ChakraProvider } from "@chakra-ui/react"
import { SearchResultsProvider } from './contexts/searchContext';
import SearchBar from './components/SearchGrid';

function App() {
  return (
    <ChakraProvider>
      <SearchResultsProvider>
        <SearchBar />
      </SearchResultsProvider>
    </ChakraProvider>
  );
}

export default App;