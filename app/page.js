import { ChakraProvider } from "@chakra-ui/react";
import { SearchResultsProvider } from './contexts/searchContext';
import SearchBar from './components/SearchGrid';
import { MovieResultGrid } from "./components/movieResultArray";
import { Flex } from "@chakra-ui/react";
import { BLUE_BACKGROUND_COLOUR_HEX } from "./config";

function Page() {
  return (
    <ChakraProvider>
      <SearchResultsProvider>
        <Flex
          direction="column"
          width="100%"
          backgroundColor={BLUE_BACKGROUND_COLOUR_HEX}
          alignItems="center"
          height="100%"
        >
          <SearchBar />
          <MovieResultGrid/> 
        </Flex>
      </SearchResultsProvider>
    </ChakraProvider>
  );
}

export default Page;