import {BsStarHalf, BsStarFill, BsStar} from "react-icons/bs";
import { Text, HStack } from "@chakra-ui/react";
import { ACCENT_COLOUR_HEX } from "../config";

export const StarRatingDisplay = (props) => {
     const rating = props.rating;
    const ratingInFive = Number(rating)/ 2;
    const stars = [];
    for(let i =0; i < 5; i ++){
        if(Math.floor(ratingInFive) >= (i + 1)){
            stars.push(<BsStarFill size="2.5vw" color={ACCENT_COLOUR_HEX} key={i}/>)
        }else if(Math.ceil(ratingInFive) >= (i + 1)){
            stars.push(<BsStarHalf size="2.5vw" color={ACCENT_COLOUR_HEX} key={i}/>)
        }else{
            stars.push(<BsStar size="2.5vw" color={ACCENT_COLOUR_HEX} key={i}/>)
        }        
    }
        return (
            <HStack >
                <Text size="2.5vw" color={ACCENT_COLOUR_HEX}>{Math.round(ratingInFive*10)/10}</Text>
                {stars}                
            </HStack>
        )

};