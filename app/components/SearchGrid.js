'use client';
import { 
    Card,
    FormControl,
    Heading,
    Input,
    Select,
    NumberInput,
    HStack,
    VStack,
    FormLabel,
    Switch,
    FormErrorMessage,
    Button,
    NumberInputField,
 } from "@chakra-ui/react"; 
import { SearchIcon } from "@chakra-ui/icons";
import React, { 
    useState
} from "react";
import { searchFilms } from "../api/routes";
import { useSearchContext } from "../contexts/searchContext";

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
    console.log({searchResults});

    return (

        <VStack
            backgroundColor='#2A4365'
            alignItems='center'
            justifyContent='center'
        >
            <Card>
                <Heading>Search for Movies</Heading>
                <VStack>
                    <HStack
                        justify="start"
                    >
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
                    </HStack>
                    <HStack
                        justify="space-around"                        
                    >
                        <FormControl>
                            <FormLabel htmlFor="adultSetting">Show adult titles:</FormLabel>
                            <Switch id="adultSetting" onChange={(e)=>setIsAdult(e.target.checked)} value={isAdult}></Switch>

                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="region">Region:</FormLabel>
                            <Select id="region" onChange={(e)=> setRegion(e.target.value)} value={region}>
                                {regionOptions}
                            </Select>                            
                        </FormControl>
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
                    </HStack>
                    <Button
                            isDisabled={!searchTerm} 
                            variant='solid'
                            // colorScheme="Cyan"
                            rightIcon={<SearchIcon/>}
                            loadingText='Searching'
                            spinnerPlacement="end"
                            onClick={ async (e)=> {
                                const data = await searchFilms(
                                    {
                                        query: searchTerm,
                                        region: region,
                                        year: year,
                                        adult: isAdult
                                    }
                                );
                                console.log(data);
                                setSearchResults(data);
                                
                                
                            }}
                        >
                            Search Films
                        </Button>
                </VStack>
            </Card>
        </VStack>
        
    )

};

export default SearchBar;