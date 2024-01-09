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
// import { useSearchContext } from "../contexts/searchContext";

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

const searchFilms = (params) =>{
    // const authStr = '?api_key=' + env.process.API_KEY;
    const authStr = '?api_key=' + 'test_value';
    // This part doesn't work currently harcoding in this value. But the page is working and you can successfully select query parameters to correctly call the api.
    const query = !params.strTerm ? '' : '&query=' + params.strTerm;
    const reg = !params.reg ? '' : '&region=' + params.reg;
    const year = !params.yr ? ''  : '&primary_release_year=' + params.yr;
    const isAdult = params.adult== null ? '': !params.adult ? '&include_adult=false' : '&include_adult=true';

    const fetchURL = searchMovieURL + authStr + query + reg + year + isAdult;

    return fetchURL
};


const SearchBar = () => {
    // component to allow the user to input seach parameters 
    // const {searchResults, setResults} = useSearchContext();

    const [searchTerm, setSearchTerm] = useState("");
    const [region, setRegion] = useState("");
    const [year, setYear] = useState("");
    const [isAdult, setIsAdult] = useState(false);

    // const handleLog =(e) => {
    //     console.log(e)
    // };

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
                    <HStack                    
                        justify="start"
                    >
                        <Button
                            isDisabled={!searchTerm} 
                            variant='solid'
                            colorScheme="Cyan"
                            rightIcon={<SearchIcon/>}
                            loadingText='Searching'
                            isLoading
                            spinnerPlacement="end"
                            onClick={searchFilms({
                                strTerm: searchTerm,
                                reg: region,
                                yr: year,
                                adult: isAdult
                            })}
                        >
                            Search Films
                        </Button>
                    </HStack>
                </VStack>
            </Card>
        </VStack>
        
    )

};

export default SearchBar;