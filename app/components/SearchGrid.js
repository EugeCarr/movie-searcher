'use client';
import { 
    Card,
    FormControl,
    Heading,
    Input,
    Select,
    NumberInput,
    HStack,
    GridItem,
    VStack,
    FormLabel,
    Switch,
    Text,
    FormErrorMessage,
    Button,
    NumberInputField,
    Flex,
    Grid,
    IconButton,
    

 } from "@chakra-ui/react"; 
import { SearchIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
 } from "@chakra-ui/icons";
import React, { 
    useState
} from "react";
import { searchFilms } from "../api/routes";
import { useSearchContext } from "../contexts/searchContext";
import { BLUE_BACKGROUND_COLOUR_HEX, BORDER_RADIUS, BOX_SHADOW, SEARCHBAR_GREY_COLOUR_HEX } from "../config";

const regions = [
    {
        name:"United Kingdom",
        code: "GB"
    },
    {
        name:"France",
        code: "FR"
    },
    {
        name:"United States",
        code: "US"
    },
    {
        name:"Germany",
        code: "DE"
    },
    {
        name:"China",
        code: "CN"
    },
];
// import env from 'dotenv/config';

const regionOptions = regions.map((region)=> <option key={region.code} value={region.code}>{region.name}</option>);
const currentYear = new Date();
const searchMovieURL = 'https://api.themoviedb.org/3/search/movie';

const searchFilmQuerystring = (params) => {
    const query = !params.query ? '' : '?query=' + params.query;
    const reg = !params.region ? '' : '&region=' + params.region;
    const year = !params.year ? ''  : '&primary_release_year=' + params.year;
    const isAdult = params.adult== null ? '': !params.adult ? '&include_adult=false' : '&include_adult=true';
    const fetchURL = '/api/searchFilms' + query + reg + year + isAdult;
    return fetchURL;
}



const SearchBar = () => {
    // component to allow the user to input seach parameters 
    const {searchResults, setSearchResults} = useSearchContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [region, setRegion] = useState("");
    const [year, setYear] = useState("");
    const [isAdult, setIsAdult] = useState(false);
    const [page, setPage] = useState(1);
    // console.log(searchResults);
    return (
        <Card
            backgroundColor="white"
            width="95%"
            borderRadius={BORDER_RADIUS}
            boxShadow={BOX_SHADOW}
            paddingTop="1vw"
        >
            <Flex
                flexDirection="row"
                justifyContent="start"
                width="90%"
                marginLeft="5%"
                marginRight="5%"
            >
                <Heading size="lg">Search for Movies</Heading>
            </Flex>
            <Flex                
                direction="column"
                alignItems="center"
                marginBottom="1vw"
                paddingBottom="1vw"
            >
                
                <Grid
                    width="90%"
                    templateAreas={
                        `"searchbar searchbar searchbar radio"
                        "dropdown dropdown2 space space2"`
                    }
                    gridTemplateRows={"5vw 5vw"}
                    gridTemplateColumns={"18vw 18vw 18vw 18vw"}
                    gap="1vw"
                >
                    <GridItem area="searchbar">
                        <FormControl>
                            <FormLabel htmlFor="searchString">Search movie titles</FormLabel>
                            <Input 
                                placeholder="Title"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                                name="searchString"
                                id="searchString"
                                value={searchTerm}
                                isRequired={true}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem area="radio">
                        <FormControl>
                            <FormLabel htmlFor="adultSetting">Show adult titles:</FormLabel>
                            <Switch id="adultSetting" onChange={(e)=>setIsAdult(e.target.checked)} value={isAdult}></Switch>

                        </FormControl>
                    </GridItem>
                    <GridItem area="dropdown">
                        <FormControl>
                            <FormLabel htmlFor="region">Region:</FormLabel>
                            <Select id="region" onChange={(e)=> setRegion(e.target.value)} value={region}>
                                {regionOptions}
                            </Select>                            
                        </FormControl>
                    </GridItem>
                    <GridItem area="dropdown2">
                        <FormControl>
                            <FormLabel htmlFor="year">Year Released:</FormLabel>
                            <NumberInput 
                                id="year" 
                                value={year}
                                onChange={setYear}
                                max={currentYear.getFullYear()}
                                min={1888}
                            >
                                <NumberInputField></NumberInputField>
                            </NumberInput>
                            <FormErrorMessage>Invalid year input</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem area="space">
                        <Button
                            isDisabled={!searchTerm} 
                            variant='solid'
                            marginTop="2vw"
                            rightIcon={<SearchIcon/>}
                            loadingText='Searching'
                            spinnerPlacement="end"
                            id="searchButton"
                            backgroundColor={BLUE_BACKGROUND_COLOUR_HEX}
                            size="lg"
                            onClick={ async (e)=> {
                                const data = await searchFilms(
                                    {
                                        query: searchTerm,
                                        region: region,
                                        year: year,
                                        adult: isAdult
                                    }
                                );
                                // console.log(data);
                                setSearchResults(data);
                                setPage(1);
                                
                                
                            }}
                        >
                            Search Films
                        </Button>
                        
                    </GridItem>
                    <GridItem area="space2">
                        {
                            !!searchTerm &&
                            <HStack
                                marginTop="2.5vw"                    
                            >
                                <IconButton
                                icon={<ArrowLeftIcon/>}
                                aria-label="view previous page"
                                isRound={true}
                                isDisabled={page===1}
                                onClick={ async (e)=> {                            
                                    const data = await searchFilms(
                                        {
                                            query: searchTerm,
                                            region: region,
                                            year: year,
                                            adult: isAdult,
                                            page: page -1
                                        }
                                    );
                                    
                                    // console.log(data);
                                    setSearchResults(data);  
                                    setPage(page - 1);                          
                                    
                                }}
                                />
                                <Text>{`Page ${page}`}</Text>
                                <IconButton
                                    icon={<ArrowRightIcon/>}
                                    aria-label="view next page"
                                    isRound={true}
                                    onClick={ async (e)=> {
                                        
                                        const data = await searchFilms(
                                            {
                                                query: searchTerm,
                                                region: region,
                                                year: year,
                                                adult: isAdult,
                                                page: page + 1
                                            }
                                        );

                                        // console.log(data);
                                        setSearchResults(data);  
                                        setPage(page + 1);                          
                                        
                                    }}
                                />
                            </HStack>
                        }
                    </GridItem>
                </Grid>
                
            </Flex>
        </Card>
        
    )

};

export default SearchBar;

