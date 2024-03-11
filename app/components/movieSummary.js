'use client'
import { 
    Card,
    Heading,
    HStack,
    VStack,
    Tag,
    Image,
    Flex,
    Spacer,
    Text,
    Box,
    Link
 } from "@chakra-ui/react"; 
import {FaUsers} from "react-icons/fa";

import { 
    IMAGE_URL_POSTER_STUB_LARGE,
    POSTER_PHOTO_ASPECT_RATIO,
    GREY_COLOUR_HEX,
    VIOLET_COLOUR_HEX,
    IMDB_MOVIE_SUMMARY_URL,
    BORDER_RADIUS,
    BOX_SHADOW,
    BLUE_BACKGROUND_COLOUR_HEX,
} from "../config"; 
import { StarRatingDisplay } from "./StarRatingDisplay";
import CastCrewcard from "./castCrewcard";
import "../styles.css";

export const MovieSummary = (props) => {
    // console.log(props);
    const {credits, title, tagline, poster_path, genres, vote_average, vote_count, imdb_id, budget, overview, production_companies} = props.film;

    const centreColumnWidth = 80;
    const moviePhotoWidth = 20;
    const {cast, crew} = credits;
    const executive_members = crew.filter((member)=> {
        const isDirector = "Directing"===(member["department"]) && "Director"===member["job"];
        const isExecProducer = "Production"===(member["department"]) && "Executive Producer"===member["job"];
        const isScreenPlay = "Writing"===(member["department"]) && "Screenplay"===member["job"];
        
       return isDirector || isExecProducer || isScreenPlay;
    });

    const majorCast = cast.slice(0,5);
    
    const genreTags = genres.map((genre)=>{
        return (<Tag size="lg" color="purple" key={genre.id}>{genre.name}</Tag>)
    });
    // console.log(production_companies);
    // console.log(executive_members);
    const ProdutcionComps = production_companies.slice(0,4).map((comp)=>{
        return (
            <Flex
                borderRadius="0px"
                borderWidth="0px"                
                alignItems="center"
                direction="column"
                marginRight="0.5vw"
                marginLeft="0.5vw"
                key={`flex-${comp.id}`}                
            >
                <Image
                    key={comp.id} 
                    marginLeft="1vw"
                    marginRight="1vw"
                    src={comp.logo_path? IMAGE_URL_POSTER_STUB_LARGE + comp.logo_path: '/No-Image-Placeholder.svg'}
                    width="10vw"
                    // height="10vw"
                />
                <Text key={`name-${comp.id}`}>{comp.name}</Text>           
            </Flex>
        )
    });

    const castComps = [
        {
            type: "Crew",
            members: executive_members.slice(0,5)
        },
        {
            type: "Main Cast",
            members: majorCast
        } ].map((crewset)=> {
        return (
            <Card
                // backgroundColor="#111D4A"
                justifyContent="start"
                width="100%"
                marginTop="1vw"
                marginBottom="1vw"
                boxShadow={BOX_SHADOW}
                
            >
                <Heading>{crewset.type}</Heading>
                <Flex
                    direction="row"
                >
                    {
                        crewset.members.map( (crewMember) => {
                            return (
                                <CastCrewcard member={crewMember} key={crewMember.id}/>
                            )
                            } 
                        )
                    }
                </Flex>
            </Card>
        )
    });

    return (
        <Flex
            direction="column"
            // borderWidth="1px"
            backgroundColor={BLUE_BACKGROUND_COLOUR_HEX}
            align="center"
            paddingLeft={`${(100 - centreColumnWidth)/2}vw`}
            paddingRight={`${(100 - centreColumnWidth)/2}vw`}            
            paddingTop="2vw"
        >
            <Card
                borderRadius={BORDER_RADIUS}
                boxShadow={BOX_SHADOW}
                width="100%"
            >
                <Flex
                    flexDirection="row"
                    // borderWidth="1px"
                    width="100%"                    
                >
                    <Image
                        alt='movie poster'
                        src={poster_path? IMAGE_URL_POSTER_STUB_LARGE + poster_path: '../images/No-Image-Placeholder.svg'}
                        objectFit={true}  
                        width={`${moviePhotoWidth}vw`}
                        height={`${POSTER_PHOTO_ASPECT_RATIO * moviePhotoWidth}vw`}
                        padding="2vw"  
                    />
                    <Flex
                        flexDirection="column"
                        alignItems="start"
                        padding="2vw"
                        width={`${centreColumnWidth - moviePhotoWidth}vw`}
                    >
                        <a
                            href={`${IMDB_MOVIE_SUMMARY_URL + imdb_id}/`}
                            target="_blank"                            
                        >
                            <Heading 
                            size="lg" 
                            marginBottom="2px"
                            className="headingLink"
                            >{title}</Heading>
                        </a>
                        <Flex
                            width="100%"
                            marginTop="1px"
                        >
                            <Box>
                                <Text size="2vw" color={VIOLET_COLOUR_HEX}>{tagline}</Text>
                                <StarRatingDisplay rating={vote_average}/>
                                <HStack>
                                    {/* <FaUsers color={ACCENT_COLOUR_HEX}/> */}
                                    <Text size="2vw" color={GREY_COLOUR_HEX}>{`${vote_count} votes`}</Text>                                    

                                </HStack>
                                <Text size="2vw" color={GREY_COLOUR_HEX}>{`Budget: $${Number(budget).toLocaleString("en-UK")}`}</Text>
                            </Box>
                            <Spacer />
                            <Box>
                                <Flex
                                    justifyContent="end"
                                    direction="column"
                                >
                                    {genreTags}
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex
                            direction="column"
                            justifyContent="row"
                        >
                            <Heading size="sm">Production Companies</Heading>
                            <Flex
                                direction="row"
                                justifyContent="start"
                                alignItems="end"
                                width={`${centreColumnWidth - moviePhotoWidth}vw`}
                            >
                                {ProdutcionComps}
                            </Flex>
                        </Flex>                    
                    </Flex>
                    
                </Flex>
            </Card>
            <Card
                borderRadius={BORDER_RADIUS}
                padding="2vw"
                boxShadow={BOX_SHADOW}
                marginTop="1vw"
                marginBottom="1vw"
                width="100%"
            >
                <Heading size="lg">Summary</Heading>
                <Text>{overview}</Text>
            </Card>
            {
                castComps
            }
        </Flex>
    )

}
