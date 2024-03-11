'use client';
import { 
    Card,
    Heading,
    VStack,
    Text,
    Box,
    Flex,
    Image,
    Spacer,
    Button
 } from "@chakra-ui/react"; 
import React, { 
    useState
} from "react";

import { 
    DATE_FORMAT, 
    IMAGE_URL_POSTER_STUB_GRID_SIZE,
    ACCENT_COLOUR_HEX,
    POSTER_PHOTO_ASPECT_RATIO,
    BORDER_RADIUS
} from "../config";
import { getFilmData } from "../api/films/routes";
import { StarRatingDisplay } from "./StarRatingDisplay";
import Link from "next/link";
import "../styles.css";
import { convertVwToPx } from "../commonFunctions";


export const formatReleaseDate = (dateString) => {
    const dateParts = dateString.split("-");
    const myDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return myDate.toLocaleDateString('en-GB', DATE_FORMAT)
};

const cardWidth = 80;
const posterPhotoWidth = 8;

export const MovieResult = (props) => {
    const {title, overview, release_date, vote_average, poster_path, id} = props.film;
    return( 
        <Link href={`viewFilm/${id}`}>
            <Flex
                width="80vw"
                borderRadius={BORDER_RADIUS}
                justifyContent="center"
                marginTop="1vw"
                marginBottom="1vw"
                className="movieResult"
                borderWidth="2px"
                borderStyle="solid"
                padding="1vw"
                marginLeft={`${(100 - cardWidth)/2}vw`}
                marginRight={`${(100 - cardWidth)/2}vw`}
                backgroundColor="white"

            >
                <Flex 
                    flexDirection="row" 
                    justifyContent="start"  
                    width="100%"
                    
                >
                    <Flex
                        flexDirection="row"
                        justifyContent="start"
                    >
                        <Image 
                        alt='movie poster'
                        src={poster_path? IMAGE_URL_POSTER_STUB_GRID_SIZE + poster_path: ''}
                        objectFit={true}  
                        width={`${ posterPhotoWidth}vw`}
                        height={`${POSTER_PHOTO_ASPECT_RATIO * posterPhotoWidth}vw`}        
                        />
                        <VStack
                            width={`${cardWidth - posterPhotoWidth - 2}vw`}
                            padding="1vw"
                        >
                            <Flex
                                width="100%"
                                direction="row"
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
                            
                        </VStack>
                    </Flex>
                </Flex>

            </Flex>
        </Link>          
        
        
    );
};