'use client'
import { 
    Card,
    Heading,
    HStack,
    VStack,
    Flex,
    Image,
    Text,
    Box
 } from "@chakra-ui/react"; 
import {FaUsers} from "react-icons/fa";
import { IMAGE_URL_POSTER_STUB_LARGE,POSTER_PHOTO_ASPECT_RATIO, GREY_COLOUR_HEX, VIOLET_COLOUR_HEX, ACCENT_COLOUR_HEX } from "../config"; 
import Head from "next/head";


 const testMember = {
    adult: false,
    gender: 1,
    id: 73456,
    known_for_department: "Acting",
    name: "Lorna Scott",
    original_name: "Lorna Scott",
    popularity: 14.878,
    profile_path: "/cBlU9Pa9LWWPf2JRELGsY0PJ5Il.jpg",
    cast_id: 48,
    character: "Butcher Woman",
    credit_id: "56bc8372c3a36860d000342e",
    order: 17
};

const photowidth= 15;
const CastCrewcard = ({member, key}) => {    
    const person = member;

    return (
        <Card
            borderRadius="3px"
            border
            margin="1rem"
            width="15rem"
            key={key}
        >
            <VStack
            width="100%">            
            <Image
                src={`${IMAGE_URL_POSTER_STUB_LARGE}${person.profile_path}`}
                height={`${photowidth * POSTER_PHOTO_ASPECT_RATIO}rem`}
                width={`${photowidth}rem`}
                paddingRight={`${1}rem`}
                paddingLeft={`${1}rem`}
                marginTop={`${0.5}rem`}
                borderRadius="3px"
                key={`${key}-image`}
            />            
            <Text>{person.name}</Text>
            <Text color={GREY_COLOUR_HEX} size="3rem">{person?.character? person.character: person.job}</Text>
            </VStack>
        </Card>
    )

}

export default CastCrewcard;