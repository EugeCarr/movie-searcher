'use client';
import { 
    Text,
    Flex,
    Grid,
    Card,
    GridItem,
    Select,
    FormLabel
 } from "@chakra-ui/react"; 
import { useSearchContext } from "../contexts/searchContext";
import { MovieResult } from "./movieResult";
import { useState } from "react";
import { BLUE_BACKGROUND_COLOUR_HEX, BORDER_RADIUS, BOX_SHADOW } from "../config";

export const MovieResultGrid = () => {
    const {searchResults} = useSearchContext();

    
    if(!searchResults[0]){
        return(
        <Flex
            height="200vw"
            direction="column"
            width="100vw"
            backgroundColor={BLUE_BACKGROUND_COLOUR_HEX}
            alignItems="center"
            paddingTop="0.5vw"
        >
            <Card
                width="94%"
                boxShadow={BOX_SHADOW}
                borderRadius={BORDER_RADIUS}
                color="white"
                paddingLeft="2vw"
            >
                <Text
                    color="grey"
                >
                    No results. Use Search bar to find movies.
                </Text>
            </Card>
        </Flex>
        )
    }else{
        const movieListitems = searchResults.map((movie)=> <MovieResult film={movie} key={movie.id}/>);
        return(
            <Flex
                direction="column"
                alignItems="center"
            >
                {movieListitems}
            </Flex>              
        )
    }
}; 