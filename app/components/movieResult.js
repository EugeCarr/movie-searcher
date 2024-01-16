'use client';
import { 
    Card,
    Heading,
    Image,
    HStack,
    VStack,
    Text,
    Box,
    Flex,
    Spacer
 } from "@chakra-ui/react"; 
import React, { 
    useState
} from "react";
import {BsStarHalf, BsStarFill} from "react-icons/bs";
import { DATE_FORMAT, IMAGE_URL_POSTER_STUB_GRID_SIZE, ACCENT_COLOUR_HEX, POSTER_PHOTO_ASPECT_RATIO} from "../config";

export const formatReleaseDate = (dateString) => {
    const dateParts = dateString.split("-");
    const myDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return myDate.toLocaleDateString('en-GB', DATE_FORMAT)
};

const getStarRating = (rating) => {
    const ratingInFive = Number(rating)/ 2;
    const stars = [];
    for(let i =0; i < Math.ceil(ratingInFive); i ++){
        if(ratingInFive >= (i + 1)){
            stars.push(<BsStarFill size="2.5vw" color={ACCENT_COLOUR_HEX} key={i}/>)
        }else{
            stars.push(<BsStarHalf size="2.5vw" color={ACCENT_COLOUR_HEX} key={i}/>)
        }        
    }
    return stars;
};


const cardWidth = 80;
const posterPhotoWidth = 12;

export const MovieResult = (props) => {
    const {title, overview, release_date, vote_average, vote_count, poster_path} = props.film;
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
                            <HStack justifyContent="right">
                                {getStarRating(vote_average)}
                                <Text size="2.5vw" color={ACCENT_COLOUR_HEX}>{vote_average/2}</Text>
                            </HStack>
                        </Box>
                    </Flex>
                    <Text  width="100%" color={"black"}>{`Date released: ${formatReleaseDate(release_date)}`}</Text>                
                    <Text  width="100%" color={"grey"}>{overview.slice(0, 400) + '...'}</Text>
                </VStack>
            </Flex>
        </Card>
        
    );
};