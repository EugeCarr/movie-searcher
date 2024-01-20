'use client';
import { 
    Card,
    Heading,
    Image,
    VStack,
    Text,
    Box,
    Flex,
    Spacer,
    Button
 } from "@chakra-ui/react"; 
import React, { 
    useState
} from "react";
import {BsStarHalf, BsStarFill, BsStar} from "react-icons/bs";
import { DATE_FORMAT, IMAGE_URL_POSTER_STUB_GRID_SIZE, ACCENT_COLOUR_HEX, POSTER_PHOTO_ASPECT_RATIO} from "../config";
import { getFilmData } from "../api/films/routes";
import { StarRatingDisplay } from "./StarRatingDisplay";
import Link from "next/link";

export const formatReleaseDate = (dateString) => {
    const dateParts = dateString.split("-");
    const myDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return myDate.toLocaleDateString('en-GB', DATE_FORMAT)
};

const cardWidth = 80;
const posterPhotoWidth = 12;

export const MovieResult = (props) => {
    const {title, overview, release_date, vote_average, vote_count, poster_path, id} = props.film;
    return(           
        <Card 
            flexDirection="row" 
            justifyContent="start" 
            colorScheme="blackAlpha" 
            variant="elevated"
            width="80vw"
            borderRadius="2px"
            padding="2vw"
            marginX="auto"
        >
            <Flex
                flexDirection="row"
                justifyContent="start"

            >
                <Image 
                alt='movie poster'
                src={poster_path? IMAGE_URL_POSTER_STUB_GRID_SIZE + poster_path: ''}
                objectFit={true}  
                width={`${posterPhotoWidth}vw`}
                height={`${POSTER_PHOTO_ASPECT_RATIO * posterPhotoWidth}vw`}        
                />
                <VStack
                    width={`${cardWidth - posterPhotoWidth - 2}vw`}
                    padding="1vw"
                >
                    <Flex
                        width="100%"
                    >
                        <Box
                            flex='2'
                        >
                            <Heading color="black" size='md'>{title} </Heading>
                        </Box>                    
                        <Spacer />
                        <Box
                            justifyContent="right"
                            flexDirection="row"
                            flex='1'                        
                        >
                            <StarRatingDisplay rating={vote_average}/>
                        </Box>
                    </Flex>
                    <Text  width="100%" color={"black"}>{`Date released: ${formatReleaseDate(release_date)}`}</Text>                
                    <Text  width="100%" color={"grey"}>{overview.slice(0, 400) + '...'}</Text>
                    {/* <Button 
                        variant='solid'
                        loadingText='Searching'
                        spinnerPlacement="end"
                        onClick={ async (e)=> {
                            const data = await getFilmData(
                                {
                                    film_id: id
                                }
                            );
                            console.log(data);
                            return                            
                        }}
                    >
                        Get film
                    </Button> */}
                    <Link href={`viewFilm/${id}`}>See Film</Link>
                </VStack>
            </Flex>
        </Card>
        
    );
};