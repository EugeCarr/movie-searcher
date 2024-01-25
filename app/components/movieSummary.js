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
import SafeImage from "./safeImage";
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
    const ProdutcionComps = production_companies.map((comp)=>{
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
                    height="10vw"
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
                        width="100%"
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

// [
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 49265,
//         "known_for_department": "Acting",
//         "name": "Lindsay Lohan",
//         "original_name": "Lindsay Lohan",
//         "popularity": 12.948,
//         "profile_path": "/iaEcezZZe5CYEVqhhXnwEMz4sYR.jpg",
//         "cast_id": 8,
//         "character": "Anna Coleman",
//         "credit_id": "52fe435a9251416c7500d2d5",
//         "order": 0
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 8944,
//         "known_for_department": "Acting",
//         "name": "Jamie Lee Curtis",
//         "original_name": "Jamie Lee Curtis",
//         "popularity": 89.014,
//         "profile_path": "/9KWvPVeiLOXlOGl0XVyHZtJWQtx.jpg",
//         "cast_id": 7,
//         "character": "Tess Coleman",
//         "credit_id": "52fe435a9251416c7500d2d1",
//         "order": 1
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 14833,
//         "known_for_department": "Acting",
//         "name": "Harold Gould",
//         "original_name": "Harold Gould",
//         "popularity": 20.986,
//         "profile_path": "/34OhfMWScEyQpy0bdnhta9mUvqV.jpg",
//         "cast_id": 10,
//         "character": "Grandpa",
//         "credit_id": "52fe435b9251416c7500d2dd",
//         "order": 2
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 62747,
//         "known_for_department": "Acting",
//         "name": "Chad Michael Murray",
//         "original_name": "Chad Michael Murray",
//         "popularity": 46.084,
//         "profile_path": "/yx3y7MOlIOppvd9GObIHw0gmxPE.jpg",
//         "cast_id": 14,
//         "character": "Jake",
//         "credit_id": "52fe435b9251416c7500d2eb",
//         "order": 3
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 19728,
//         "known_for_department": "Acting",
//         "name": "Mark Harmon",
//         "original_name": "Mark Harmon",
//         "popularity": 33.886,
//         "profile_path": "/lMqKPig7zBoGfou7wWf88sZEGHo.jpg",
//         "cast_id": 9,
//         "character": "Ryan",
//         "credit_id": "52fe435b9251416c7500d2d9",
//         "order": 4
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 537,
//         "known_for_department": "Acting",
//         "name": "Stephen Tobolowsky",
//         "original_name": "Stephen Tobolowsky",
//         "popularity": 38.813,
//         "profile_path": "/uL8yfcm0dCFYFQt052kczVQVvac.jpg",
//         "cast_id": 38,
//         "character": "Mr. Bates",
//         "credit_id": "56bc825ac3a36860e4002c8f",
//         "order": 5
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 61904,
//         "known_for_department": "Acting",
//         "name": "Christina Vidal",
//         "original_name": "Christina Vidal",
//         "popularity": 9.03,
//         "profile_path": "/xzc2Gf8hAK0TKNuDdCsBy90ITjo.jpg",
//         "cast_id": 39,
//         "character": "Maddie",
//         "credit_id": "56bc826d92514144d7002f47",
//         "order": 6
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 137169,
//         "known_for_department": "Acting",
//         "name": "Ryan Malgarini",
//         "original_name": "Ryan Malgarini",
//         "popularity": 12.457,
//         "profile_path": "/9vKGj0b3PZmpMyufyLzBsCOLDn7.jpg",
//         "cast_id": 40,
//         "character": "Harry Coleman",
//         "credit_id": "56bc828ac3a36860e1002a78",
//         "order": 7
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 159985,
//         "known_for_department": "Acting",
//         "name": "Haley Hudson",
//         "original_name": "Haley Hudson",
//         "popularity": 8.073,
//         "profile_path": "/yyB5RFaG83XdwqbqFEBptwi9SuG.jpg",
//         "cast_id": 12,
//         "character": "Peg",
//         "credit_id": "52fe435b9251416c7500d2e1",
//         "order": 8
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 74073,
//         "known_for_department": "Acting",
//         "name": "Rosalind Chao",
//         "original_name": "Rosalind Chao",
//         "popularity": 17.333,
//         "profile_path": "/vTt8RYw8VJXNru7AMP49Q6FcvzM.jpg",
//         "cast_id": 41,
//         "character": "Pei-Pei",
//         "credit_id": "56bc82b3c3a36860d9002e3a",
//         "order": 9
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 112288,
//         "known_for_department": "Acting",
//         "name": "Lucille Soong",
//         "original_name": "Lucille Soong",
//         "popularity": 2.703,
//         "profile_path": "/3PBNmz6zcUWtCEdENMvzhHWtZaz.jpg",
//         "cast_id": 42,
//         "character": "Pei-Pei's Mom",
//         "credit_id": "56bc82c2c3a3683ea6002560",
//         "order": 10
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1542,
//         "known_for_department": "Acting",
//         "name": "Willie Garson",
//         "original_name": "Willie Garson",
//         "popularity": 36.648,
//         "profile_path": "/kTNR7cyq3ymByKdNxP3kwnHLSjJ.jpg",
//         "cast_id": 43,
//         "character": "Evan",
//         "credit_id": "56bc82d1c3a36860ec002c9a",
//         "order": 11
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 56567,
//         "known_for_department": "Acting",
//         "name": "Dina Spybey-Waters",
//         "original_name": "Dina Spybey-Waters",
//         "popularity": 13.418,
//         "profile_path": "/aBW0vvA5nms1X3LQJYGWAGsxc2s.jpg",
//         "cast_id": 15,
//         "character": "Dottie Robertson",
//         "credit_id": "52fe435b9251416c7500d2ef",
//         "order": 12
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 68769,
//         "known_for_department": "Acting",
//         "name": "Julie Gonzalo",
//         "original_name": "Julie Gonzalo",
//         "popularity": 34.031,
//         "profile_path": "/6clO3lFK6dn3lBXe8zZoRNPbERr.jpg",
//         "cast_id": 44,
//         "character": "Stacey Hinkhouse",
//         "credit_id": "56bc82eec3a36860e4002caa",
//         "order": 13
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1575802,
//         "known_for_department": "Acting",
//         "name": "Christina Marie Walter",
//         "original_name": "Christina Marie Walter",
//         "popularity": 0.6,
//         "profile_path": null,
//         "cast_id": 45,
//         "character": "Same Shirt Girl",
//         "credit_id": "56bc830392514144cf002eec",
//         "order": 14
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1433893,
//         "known_for_department": "Acting",
//         "name": "Lu Elrod",
//         "original_name": "Lu Elrod",
//         "popularity": 3.389,
//         "profile_path": "/3mt6ImqOlLnIk9pcietnM1mWOS3.jpg",
//         "cast_id": 46,
//         "character": "Detention Monitor",
//         "credit_id": "56bc83229251411141000072",
//         "order": 15
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 64829,
//         "known_for_department": "Writing",
//         "name": "Heather Hach",
//         "original_name": "Heather Hach",
//         "popularity": 2.744,
//         "profile_path": "/s6uvCrFvkZdD30QEVeA0L9BfZKQ.jpg",
//         "cast_id": 47,
//         "character": "Gym Teacher",
//         "credit_id": "56bc834992514174a5001493",
//         "order": 16
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 73456,
//         "known_for_department": "Acting",
//         "name": "Lorna Scott",
//         "original_name": "Lorna Scott",
//         "popularity": 14.878,
//         "profile_path": "/cBlU9Pa9LWWPf2JRELGsY0PJ5Il.jpg",
//         "cast_id": 48,
//         "character": "Butcher Woman",
//         "credit_id": "56bc8372c3a36860d000342e",
//         "order": 17
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1575803,
//         "known_for_department": "Acting",
//         "name": "Chris Carlberg",
//         "original_name": "Chris Carlberg",
//         "popularity": 1.4,
//         "profile_path": null,
//         "cast_id": 49,
//         "character": "Ethan - Drummer",
//         "credit_id": "56bc838992514144cf002f06",
//         "order": 18
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1526,
//         "known_for_department": "Writing",
//         "name": "Danny Rubin",
//         "original_name": "Danny Rubin",
//         "popularity": 5.631,
//         "profile_path": null,
//         "cast_id": 50,
//         "character": "Scott - Bass Player",
//         "credit_id": "56bc83cbc3a36860ec002cbe",
//         "order": 19
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 156927,
//         "known_for_department": "Acting",
//         "name": "Hayden Tank",
//         "original_name": "Hayden Tank",
//         "popularity": 1.704,
//         "profile_path": null,
//         "cast_id": 51,
//         "character": "Harry's Friend #1",
//         "credit_id": "56bc840192514144cf002f23",
//         "order": 20
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 4741,
//         "known_for_department": "Acting",
//         "name": "Cayden Boyd",
//         "original_name": "Cayden Boyd",
//         "popularity": 15.973,
//         "profile_path": "/5PyOB5F8mSp0n0ZNS6iX6rpXOTv.jpg",
//         "cast_id": 52,
//         "character": "Harry's Friend #2",
//         "credit_id": "56bc841092514174a50014b1",
//         "order": 21
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1067,
//         "known_for_department": "Acting",
//         "name": "Marc McClure",
//         "original_name": "Marc McClure",
//         "popularity": 25.073,
//         "profile_path": "/c8DFehNqNEDLBALTdAWZzUEN2tD.jpg",
//         "cast_id": 53,
//         "character": "Boris",
//         "credit_id": "56bc841ec3a36860d6002e0f",
//         "order": 22
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1213609,
//         "known_for_department": "Acting",
//         "name": "Chris Heuisler",
//         "original_name": "Chris Heuisler",
//         "popularity": 1.61,
//         "profile_path": null,
//         "cast_id": 54,
//         "character": "Mr. Waters",
//         "credit_id": "56bc842dc3a36860ec002cd9",
//         "order": 23
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1340662,
//         "known_for_department": "Acting",
//         "name": "Jeffrey Marcus",
//         "original_name": "Jeffrey Marcus",
//         "popularity": 1.673,
//         "profile_path": "/s4eLYSdP9RhuURZWqMG203NhKtE.jpg",
//         "cast_id": 55,
//         "character": "Depressed Patient",
//         "credit_id": "56bc843fc3a36860d000345f",
//         "order": 24
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1346157,
//         "known_for_department": "Acting",
//         "name": "Jacqueline Heinze",
//         "original_name": "Jacqueline Heinze",
//         "popularity": 1.4,
//         "profile_path": "/bAK7cRusFuWszD7wdYPu49Pp2EG.jpg",
//         "cast_id": 56,
//         "character": "Crying Patient",
//         "credit_id": "56bc844ec3a36860e4002ce4",
//         "order": 25
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 23967,
//         "known_for_department": "Acting",
//         "name": "Mary Ellen Trainor",
//         "original_name": "Mary Ellen Trainor",
//         "popularity": 17.766,
//         "profile_path": "/Y926jxSOXikBiqQIptho1VzU9o.jpg",
//         "cast_id": 57,
//         "character": "Diary Reading Patient",
//         "credit_id": "56bc845d92514144cf002f3d",
//         "order": 26
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 94430,
//         "known_for_department": "Acting",
//         "name": "Erica Gimpel",
//         "original_name": "Erica Gimpel",
//         "popularity": 25.449,
//         "profile_path": "/9rEGsUqlbVJexRZ2TTxc0UIGY5P.jpg",
//         "cast_id": 58,
//         "character": "Harry's Teacher",
//         "credit_id": "56bc846b92514144cf002f42",
//         "order": 27
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1124108,
//         "known_for_department": "Acting",
//         "name": "William Caploe",
//         "original_name": "William Caploe",
//         "popularity": 0.6,
//         "profile_path": null,
//         "cast_id": 59,
//         "character": "Talk Show P.A.",
//         "credit_id": "56bc847b925141173f000f54",
//         "order": 28
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 181876,
//         "known_for_department": "Acting",
//         "name": "Daniel Raymont",
//         "original_name": "Daniel Raymont",
//         "popularity": 2.944,
//         "profile_path": "/qe1J4MwhvJuTmlFghcLne8tEBaL.jpg",
//         "cast_id": 60,
//         "character": "Makeup Artist",
//         "credit_id": "56bc848892514174a50014d1",
//         "order": 29
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1102046,
//         "known_for_department": "Production",
//         "name": "Veronica Brooks",
//         "original_name": "Veronica Brooks",
//         "popularity": 0.6,
//         "profile_path": null,
//         "cast_id": 61,
//         "character": "Champagne Waitress",
//         "credit_id": "56bc8499c3a36860d6002e1f",
//         "order": 30
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1175742,
//         "known_for_department": "Acting",
//         "name": "Lee Burns",
//         "original_name": "Lee Burns",
//         "popularity": 1.801,
//         "profile_path": "/1X2VVyxhISV8rcIltoPVsyT3pnb.jpg",
//         "cast_id": 62,
//         "character": "Bouncer",
//         "credit_id": "56bc84aec3a36860d9002e98",
//         "order": 31
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1575805,
//         "known_for_department": "Sound",
//         "name": "Amir Derakh",
//         "original_name": "Amir Derakh",
//         "popularity": 0.84,
//         "profile_path": null,
//         "cast_id": 63,
//         "character": "House of Blues Emcee",
//         "credit_id": "56bc84bfc3a36860e1002ad1",
//         "order": 32
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1575806,
//         "known_for_department": "Acting",
//         "name": "Zoe Waters",
//         "original_name": "Zoe Waters",
//         "popularity": 0.618,
//         "profile_path": null,
//         "cast_id": 64,
//         "character": "Wedding Baby",
//         "credit_id": "56bc84cd92514111410000af",
//         "order": 33
//     }
// ]

// [
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 599,
//         "known_for_department": "Production",
//         "name": "Marci Liroff",
//         "original_name": "Marci Liroff",
//         "popularity": 2.744,
//         "profile_path": "/54uSsUYIdK9UxomSwrwpBYnYyPN.jpg",
//         "credit_id": "56832be9c3a36828f500ba6d",
//         "department": "Production",
//         "job": "Casting"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 5339,
//         "known_for_department": "Sound",
//         "name": "David Boulton",
//         "original_name": "David Boulton",
//         "popularity": 5.679,
//         "profile_path": null,
//         "credit_id": "60d49eed9824c8002f815e0a",
//         "department": "Sound",
//         "job": "ADR Engineer"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 5633,
//         "known_for_department": "Art",
//         "name": "Barbara Haberecht",
//         "original_name": "Barbara Haberecht",
//         "popularity": 5.379,
//         "profile_path": null,
//         "credit_id": "56832bc592514132db013adf",
//         "department": "Art",
//         "job": "Set Decoration"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 8157,
//         "known_for_department": "Sound",
//         "name": "Doc Kane",
//         "original_name": "Doc Kane",
//         "popularity": 10.71,
//         "profile_path": "/rJ12iE2gNd2TalhNXKbKH6Q3bKB.jpg",
//         "credit_id": "60d49eda9f1be7005d94fc87",
//         "department": "Sound",
//         "job": "ADR Mixer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 9975,
//         "known_for_department": "Crew",
//         "name": "Richard E. Butler",
//         "original_name": "Richard E. Butler",
//         "popularity": 3.842,
//         "profile_path": null,
//         "credit_id": "60d45453c390c5005d8c10c7",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 9556,
//         "known_for_department": "Directing",
//         "name": "David Barrett",
//         "original_name": "David Barrett",
//         "popularity": 9.103,
//         "profile_path": "/aGLJHvn8BPFzbRq0zAIHGvqlmje.jpg",
//         "credit_id": "60d453713e6f2b0073797bc1",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 11409,
//         "known_for_department": "Camera",
//         "name": "Oliver Wood",
//         "original_name": "Oliver Wood",
//         "popularity": 3.371,
//         "profile_path": "/rUXhXZUF818WsqWms7BIIz9YHjN.jpg",
//         "credit_id": "52fe435a9251416c7500d2c7",
//         "department": "Camera",
//         "job": "Director of Photography"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 11708,
//         "known_for_department": "Writing",
//         "name": "Leslie Dixon",
//         "original_name": "Leslie Dixon",
//         "popularity": 12.985,
//         "profile_path": "/aQJvosFeEeycVmUmng7LqokF9q0.jpg",
//         "credit_id": "52fe435a9251416c7500d2b5",
//         "department": "Writing",
//         "job": "Screenplay"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 12970,
//         "known_for_department": "Editing",
//         "name": "Bruce Green",
//         "original_name": "Bruce Green",
//         "popularity": 4.189,
//         "profile_path": null,
//         "credit_id": "52fe435a9251416c7500d2cd",
//         "department": "Editing",
//         "job": "Editor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 42037,
//         "known_for_department": "Art",
//         "name": "Rick Young",
//         "original_name": "Rick Young",
//         "popularity": 3.063,
//         "profile_path": null,
//         "credit_id": "60d4d209ce4ddc0073d06a43",
//         "department": "Art",
//         "job": "Property Master"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 24190,
//         "known_for_department": "Sound",
//         "name": "Rolfe Kent",
//         "original_name": "Rolfe Kent",
//         "popularity": 1.96,
//         "profile_path": null,
//         "credit_id": "52fe435a9251416c7500d2c1",
//         "department": "Sound",
//         "job": "Original Music Composer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 35546,
//         "known_for_department": "Crew",
//         "name": "Chris Palermo",
//         "original_name": "Chris Palermo",
//         "popularity": 0.944,
//         "profile_path": "/ni3d2IaSUk651Yq9HWfoa1Pezya.jpg",
//         "credit_id": "64a070e6c390c500aeb0c1fc",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 35760,
//         "known_for_department": "Art",
//         "name": "Cat Smith",
//         "original_name": "Cat Smith",
//         "popularity": 2.023,
//         "profile_path": null,
//         "credit_id": "60d4677b3c887d006004f60d",
//         "department": "Art",
//         "job": "Set Designer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 38415,
//         "known_for_department": "Production",
//         "name": "Mario Iscovich",
//         "original_name": "Mario Iscovich",
//         "popularity": 1.96,
//         "profile_path": null,
//         "credit_id": "5c444a029251412bf6dd9656",
//         "department": "Production",
//         "job": "Executive Producer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 54050,
//         "known_for_department": "Directing",
//         "name": "Mark Waters",
//         "original_name": "Mark Waters",
//         "popularity": 16.971,
//         "profile_path": "/afouy66zeJ1hn7fcjLp8QkcTeQJ.jpg",
//         "credit_id": "52fe435b9251416c7500d2e7",
//         "department": "Directing",
//         "job": "Director"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 64829,
//         "known_for_department": "Writing",
//         "name": "Heather Hach",
//         "original_name": "Heather Hach",
//         "popularity": 2.744,
//         "profile_path": "/s6uvCrFvkZdD30QEVeA0L9BfZKQ.jpg",
//         "credit_id": "52fe435a9251416c7500d2af",
//         "department": "Writing",
//         "job": "Screenplay"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 64830,
//         "known_for_department": "Production",
//         "name": "Andrew Gunn",
//         "original_name": "Andrew Gunn",
//         "popularity": 2.38,
//         "profile_path": null,
//         "credit_id": "52fe435a9251416c7500d2bb",
//         "department": "Production",
//         "job": "Producer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 92336,
//         "known_for_department": "Crew",
//         "name": "Clinton Wayne",
//         "original_name": "Clinton Wayne",
//         "popularity": 1.799,
//         "profile_path": null,
//         "credit_id": "60d473ba38469a005ddb5af4",
//         "department": "Costume & Make-Up",
//         "job": "Key Makeup Artist"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 92504,
//         "known_for_department": "Crew",
//         "name": "Jill Stokesberry",
//         "original_name": "Jill Stokesberry",
//         "popularity": 1.312,
//         "profile_path": null,
//         "credit_id": "60d4530b0f2fbd0048a7e6a9",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 69510,
//         "known_for_department": "Production",
//         "name": "Ann Marie Sanderlin",
//         "original_name": "Ann Marie Sanderlin",
//         "popularity": 3.842,
//         "profile_path": null,
//         "credit_id": "5c444a190e0a266d5ad2e8ff",
//         "department": "Production",
//         "job": "Co-Producer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 74978,
//         "known_for_department": "Sound",
//         "name": "Terry Porter",
//         "original_name": "Terry Porter",
//         "popularity": 4.288,
//         "profile_path": null,
//         "credit_id": "56832d2192514169d0001adc",
//         "department": "Sound",
//         "job": "Sound Re-Recording Mixer"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 83068,
//         "known_for_department": "Production",
//         "name": "Paul Moen",
//         "original_name": "Paul Moen",
//         "popularity": 1.467,
//         "profile_path": null,
//         "credit_id": "60d451c338469a00453fe808",
//         "department": "Production",
//         "job": "Unit Production Manager"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 83068,
//         "known_for_department": "Production",
//         "name": "Paul Moen",
//         "original_name": "Paul Moen",
//         "popularity": 1.467,
//         "profile_path": null,
//         "credit_id": "60d4f8493a993700801b3d1b",
//         "department": "Directing",
//         "job": "Second Unit Director"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 83083,
//         "known_for_department": "Sound",
//         "name": "G.W. Brown",
//         "original_name": "G.W. Brown",
//         "popularity": 1.22,
//         "profile_path": null,
//         "credit_id": "60d49c289f1be7002be1baa2",
//         "department": "Sound",
//         "job": "Supervising ADR Editor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 83084,
//         "known_for_department": "Sound",
//         "name": "Jeanette Browning",
//         "original_name": "Jeanette Browning",
//         "popularity": 1.96,
//         "profile_path": null,
//         "credit_id": "60d49e4e0f2fbd005f5fd76e",
//         "department": "Sound",
//         "job": "ADR Recordist"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 83087,
//         "known_for_department": "Sound",
//         "name": "John Kwiatkowski",
//         "original_name": "John Kwiatkowski",
//         "popularity": 1.166,
//         "profile_path": null,
//         "credit_id": "56832cde9251417def015ff4",
//         "department": "Sound",
//         "job": "Sound Editor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 83090,
//         "known_for_department": "Sound",
//         "name": "Todd Toon",
//         "original_name": "Todd Toon",
//         "popularity": 1.176,
//         "profile_path": "/4GUXef80FGLGhSyXUlhkVrbue8g.jpg",
//         "credit_id": "56832d0392514131df013294",
//         "department": "Sound",
//         "job": "Supervising Sound Editor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 83091,
//         "known_for_department": "Sound",
//         "name": "Dean A. Zupancic",
//         "original_name": "Dean A. Zupancic",
//         "popularity": 5.379,
//         "profile_path": null,
//         "credit_id": "56832d1692514169d0001ad5",
//         "department": "Sound",
//         "job": "Sound Re-Recording Mixer"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 91782,
//         "known_for_department": "Crew",
//         "name": "Jeannie Epper",
//         "original_name": "Jeannie Epper",
//         "popularity": 21.657,
//         "profile_path": "/ofOKbu0cPt8pEJahbgXCPLBUF6N.jpg",
//         "credit_id": "60d455323c887d006004e7de",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 91093,
//         "known_for_department": "Sound",
//         "name": "Charles W. Ritter",
//         "original_name": "Charles W. Ritter",
//         "popularity": 2.535,
//         "profile_path": null,
//         "credit_id": "56832cedc3a36828f500babd",
//         "department": "Sound",
//         "job": "Sound Editor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 91775,
//         "known_for_department": "Sound",
//         "name": "Stephen Coleman",
//         "original_name": "Stephen Coleman",
//         "popularity": 1.694,
//         "profile_path": null,
//         "credit_id": "60d511eda76ac50073d9d533",
//         "department": "Sound",
//         "job": "Conductor"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 13443,
//         "known_for_department": "Acting",
//         "name": "Laura Albert",
//         "original_name": "Laura Albert",
//         "popularity": 9.398,
//         "profile_path": "/fl1wqLSHYXtj7DR8yVwvhpmdPxf.jpg",
//         "credit_id": "64868adc99259c00accd824d",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 137198,
//         "known_for_department": "Production",
//         "name": "Jamie Sparer Roberts",
//         "original_name": "Jamie Sparer Roberts",
//         "popularity": 3.678,
//         "profile_path": "/qAXxHH7GIXTnySqB0GUi7hLxW89.jpg",
//         "credit_id": "60d4fcf0ef9d720074dbd85c",
//         "department": "Production",
//         "job": "Casting Associate"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 142157,
//         "known_for_department": "Crew",
//         "name": "Doug Coleman",
//         "original_name": "Doug Coleman",
//         "popularity": 5.125,
//         "profile_path": "/temeKPrQ9VosJXwb51O3EWxQ5yO.jpg",
//         "credit_id": "60d45d619f1be7005d947722",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 157969,
//         "known_for_department": "Crew",
//         "name": "Donna Keegan",
//         "original_name": "Donna Keegan",
//         "popularity": 4.43,
//         "profile_path": "/k0QWWFb1s30y0tdqjE87LFz7fcj.jpg",
//         "credit_id": "60d4531e9f1be7005d946ed7",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 161787,
//         "known_for_department": "Crew",
//         "name": "Dick Ziker",
//         "original_name": "Dick Ziker",
//         "popularity": 3.248,
//         "profile_path": "/28dO89lvvZS6ZOw5Rpusygfbwbu.jpg",
//         "credit_id": "60d457b6c390c500469b6da2",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 591769,
//         "known_for_department": "Crew",
//         "name": "Matthew Taylor",
//         "original_name": "Matthew Taylor",
//         "popularity": 1.052,
//         "profile_path": "/bwsWruMwbEoJnjYOYEANAvSVikN.jpg",
//         "credit_id": "60d453e6c390c50074370a4f",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 935719,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Genevieve Tyrrell",
//         "original_name": "Genevieve Tyrrell",
//         "popularity": 0.943,
//         "profile_path": null,
//         "credit_id": "56832b8e92514169d0001a59",
//         "department": "Costume & Make-Up",
//         "job": "Costume Design"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 936194,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Christina Smith",
//         "original_name": "Christina Smith",
//         "popularity": 0.84,
//         "profile_path": null,
//         "credit_id": "60d473803c887d002d32d524",
//         "department": "Costume & Make-Up",
//         "job": "Makeup Supervisor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 999657,
//         "known_for_department": "Crew",
//         "name": "John Hateley",
//         "original_name": "John Hateley",
//         "popularity": 1.4,
//         "profile_path": "/injrYGcxFB5zcgEAnzNWcdlR8cn.jpg",
//         "credit_id": "60d4539fce4ddc002d792cff",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1056127,
//         "known_for_department": "Acting",
//         "name": "Charline St. Charles",
//         "original_name": "Charline St. Charles",
//         "popularity": 1.726,
//         "profile_path": "/f0Dqvg9v1tT1gcCTOwIN99GABka.jpg",
//         "credit_id": "60d4fecf25b9550046a97185",
//         "department": "Production",
//         "job": "Production Secretary"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1124107,
//         "known_for_department": "Art",
//         "name": "Cary White",
//         "original_name": "Cary White",
//         "popularity": 0.72,
//         "profile_path": null,
//         "credit_id": "56832bad9251414ecb0073d5",
//         "department": "Art",
//         "job": "Production Design"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1183391,
//         "known_for_department": "Camera",
//         "name": "Ronald Batzdorff",
//         "original_name": "Ronald Batzdorff",
//         "popularity": 2.503,
//         "profile_path": null,
//         "credit_id": "56832d60c3a368607501486f",
//         "department": "Camera",
//         "job": "Still Photographer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1305278,
//         "known_for_department": "Directing",
//         "name": "Eric A. Pot",
//         "original_name": "Eric A. Pot",
//         "popularity": 1.38,
//         "profile_path": null,
//         "credit_id": "60d4520d38469a00744b425a",
//         "department": "Directing",
//         "job": "Second Assistant Director"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1319135,
//         "known_for_department": "Art",
//         "name": "Maria Baker",
//         "original_name": "Maria Baker",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "56832bd49251414ecb0073de",
//         "department": "Art",
//         "job": "Art Direction"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1324453,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Heidi Higginbotham",
//         "original_name": "Heidi Higginbotham",
//         "popularity": 0.856,
//         "profile_path": null,
//         "credit_id": "56832de7925141133400d224",
//         "department": "Costume & Make-Up",
//         "job": "Costume Supervisor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1331648,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Barbara Lorenz",
//         "original_name": "Barbara Lorenz",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d473aece4ddc0073cf452b",
//         "department": "Costume & Make-Up",
//         "job": "Hair Supervisor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1335156,
//         "known_for_department": "Editing",
//         "name": "Lee Wimer",
//         "original_name": "Lee Wimer",
//         "popularity": 0.766,
//         "profile_path": null,
//         "credit_id": "60d5148d3fe160005dba03e1",
//         "department": "Editing",
//         "job": "Color Timer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1338372,
//         "known_for_department": "Sound",
//         "name": "Dan O'Connell",
//         "original_name": "Dan O'Connell",
//         "popularity": 0.833,
//         "profile_path": "/4AjIlClDijH3iYgXygHEcVZtTzi.jpg",
//         "credit_id": "60d49e0c9824c8002f815abe",
//         "department": "Sound",
//         "job": "Foley Artist"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1344278,
//         "known_for_department": "Directing",
//         "name": "Pamela Alch",
//         "original_name": "Pamela Alch",
//         "popularity": 0.706,
//         "profile_path": null,
//         "credit_id": "56832c1092514132db013af3",
//         "department": "Directing",
//         "job": "Script Supervisor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1364411,
//         "known_for_department": "Sound",
//         "name": "Randall L. Johnson",
//         "original_name": "Randall L. Johnson",
//         "popularity": 1.172,
//         "profile_path": null,
//         "credit_id": "60d4972938469a00744bb4a9",
//         "department": "Sound",
//         "job": "Boom Operator"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1367493,
//         "known_for_department": "Sound",
//         "name": "John T. Cucci",
//         "original_name": "John T. Cucci",
//         "popularity": 7.944,
//         "profile_path": null,
//         "credit_id": "60d49e000f2fbd005f5fd615",
//         "department": "Sound",
//         "job": "Foley Artist"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1367676,
//         "known_for_department": "Sound",
//         "name": "Nick South",
//         "original_name": "Nick South",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "56832c76925141133400d1c1",
//         "department": "Sound",
//         "job": "Music Editor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1370953,
//         "known_for_department": "Crew",
//         "name": "J. Mark Donaldson",
//         "original_name": "J. Mark Donaldson",
//         "popularity": 1.96,
//         "profile_path": null,
//         "credit_id": "60d454b39824c8002f80e134",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1389624,
//         "known_for_department": "Sound",
//         "name": "Jay B. Richardson",
//         "original_name": "Jay B. Richardson",
//         "popularity": 0.766,
//         "profile_path": null,
//         "credit_id": "60d5111e3a9937005fe16fd7",
//         "department": "Sound",
//         "job": "Supervising Music Editor"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1391564,
//         "known_for_department": "Art",
//         "name": "Gary A. Krakoff",
//         "original_name": "Gary A. Krakoff",
//         "popularity": 1.132,
//         "profile_path": null,
//         "credit_id": "60d4fa5025b9550046a9604d",
//         "department": "Art",
//         "job": "Construction Coordinator"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1393858,
//         "known_for_department": "Crew",
//         "name": "Stanton Barrett",
//         "original_name": "Stanton Barrett",
//         "popularity": 0.6,
//         "profile_path": "/n0W8pACaJVUaTZCZuZgTSeeXrxg.jpg",
//         "credit_id": "60d45343c390c5005d8c0fa6",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1398127,
//         "known_for_department": "Camera",
//         "name": "William D. Barber",
//         "original_name": "William D. Barber",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d478e59f1be70046557e84",
//         "department": "Camera",
//         "job": "Camera Operator"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1403413,
//         "known_for_department": "Camera",
//         "name": "Joe Chess",
//         "original_name": "Joe Chess",
//         "popularity": 1.62,
//         "profile_path": null,
//         "credit_id": "60d479919f1be700737bb92e",
//         "department": "Camera",
//         "job": "Steadicam Operator"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1403413,
//         "known_for_department": "Camera",
//         "name": "Joe Chess",
//         "original_name": "Joe Chess",
//         "popularity": 1.62,
//         "profile_path": null,
//         "credit_id": "60d4798ace4ddc0073cf4bb4",
//         "department": "Camera",
//         "job": "\"B\" Camera Operator"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1404697,
//         "known_for_department": "Crew",
//         "name": "Jimmy Romano",
//         "original_name": "Jimmy Romano",
//         "popularity": 0.729,
//         "profile_path": null,
//         "credit_id": "56832dbe925141133400d21a",
//         "department": "Crew",
//         "job": "Stunt Coordinator"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1406318,
//         "known_for_department": "Crew",
//         "name": "Robert Defonte",
//         "original_name": "Robert Defonte",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d50847a76ac5002d18f365",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1406396,
//         "known_for_department": "Visual Effects",
//         "name": "Peter Donen",
//         "original_name": "Peter Donen",
//         "popularity": 1.608,
//         "profile_path": null,
//         "credit_id": "60d4f9af66a7c30046890cc4",
//         "department": "Visual Effects",
//         "job": "Visual Effects Supervisor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1406397,
//         "known_for_department": "Visual Effects",
//         "name": "Darin McCormick-Millett",
//         "original_name": "Darin McCormick-Millett",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "60d5142a33ad8f00299cba13",
//         "department": "Visual Effects",
//         "job": "Visual Effects Producer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1415618,
//         "known_for_department": "Sound",
//         "name": "Donald J. Malouf",
//         "original_name": "Donald J. Malouf",
//         "popularity": 0.755,
//         "profile_path": null,
//         "credit_id": "56832cf7c3a36828f500bac0",
//         "department": "Sound",
//         "job": "Sound Editor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1418010,
//         "known_for_department": "Crew",
//         "name": "Toni Atterbury",
//         "original_name": "Toni Atterbury",
//         "popularity": 0.608,
//         "profile_path": null,
//         "credit_id": "60d4fefaa76ac5005cdec86d",
//         "department": "Crew",
//         "job": "Unit Publicist"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1420145,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Tara Smith",
//         "original_name": "Tara Smith",
//         "popularity": 1.094,
//         "profile_path": null,
//         "credit_id": "60d473dc38469a00744b6172",
//         "department": "Costume & Make-Up",
//         "job": "Key Hair Stylist"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1428230,
//         "known_for_department": "Crew",
//         "name": "Tom Rebber",
//         "original_name": "Tom Rebber",
//         "popularity": 0.714,
//         "profile_path": null,
//         "credit_id": "60d5000aa76ac5005cdecc56",
//         "department": "Crew",
//         "job": "Transportation Coordinator"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1434767,
//         "known_for_department": "Directing",
//         "name": "Benjamin Rosenberg",
//         "original_name": "Benjamin Rosenberg",
//         "popularity": 1.22,
//         "profile_path": null,
//         "credit_id": "60d451dc63a695001dba5954",
//         "department": "Directing",
//         "job": "First Assistant Director"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1436194,
//         "known_for_department": "Lighting",
//         "name": "David H. Neale",
//         "original_name": "David H. Neale",
//         "popularity": 0.84,
//         "profile_path": null,
//         "credit_id": "60d4a3ad63a69500464f5e00",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1440288,
//         "known_for_department": "Production",
//         "name": "Jody Hummer",
//         "original_name": "Jody Hummer",
//         "popularity": 0.802,
//         "profile_path": null,
//         "credit_id": "60d4cf799f1be7002be2758e",
//         "department": "Production",
//         "job": "Location Manager"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1452351,
//         "known_for_department": "Crew",
//         "name": "Vladimir Tevlovski",
//         "original_name": "Vladimir Tevlovski",
//         "popularity": 1.295,
//         "profile_path": null,
//         "credit_id": "60d457429f1be7005d94722b",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1452879,
//         "known_for_department": "Crew",
//         "name": "Arnold Chon",
//         "original_name": "Arnold Chon",
//         "popularity": 4.68,
//         "profile_path": "/yqjpm2ukU8j2EzCwAWWNChB8BlM.jpg",
//         "credit_id": "60d454159824c8002f80e09e",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1463749,
//         "known_for_department": "Lighting",
//         "name": "George Lozano Jr.",
//         "original_name": "George Lozano Jr.",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4a25963a695001dbaf13d",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1464310,
//         "known_for_department": "Crew",
//         "name": "Eliza Coleman",
//         "original_name": "Eliza Coleman",
//         "popularity": 5.925,
//         "profile_path": "/wb7sr5O0WVADFsOUiC8hzekhDmd.jpg",
//         "credit_id": "60d454830f2fbd005f5f2dd8",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1485215,
//         "known_for_department": "Writing",
//         "name": "Mary Rodgers",
//         "original_name": "Mary Rodgers",
//         "popularity": 0.828,
//         "profile_path": "/gwYhUhQ6Y7SeG05XFyG6stuoL1Y.jpg",
//         "credit_id": "60d44c350f2fbd005f5f2630",
//         "department": "Writing",
//         "job": "Book"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1515565,
//         "known_for_department": "Lighting",
//         "name": "David Dunbar",
//         "original_name": "David Dunbar",
//         "popularity": 1.932,
//         "profile_path": null,
//         "credit_id": "60d4a288c390c500469bf614",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1522363,
//         "known_for_department": "Visual Effects",
//         "name": "Al Broussard",
//         "original_name": "Al Broussard",
//         "popularity": 1.116,
//         "profile_path": null,
//         "credit_id": "60d4f96621621d005e5a3b49",
//         "department": "Crew",
//         "job": "Special Effects Coordinator"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1536000,
//         "known_for_department": "Lighting",
//         "name": "Kevin J. Lang",
//         "original_name": "Kevin J. Lang",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "60d4a046ce4ddc005c91e39a",
//         "department": "Lighting",
//         "job": "Rigging Gaffer"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1537203,
//         "known_for_department": "Camera",
//         "name": "Maricella Ramirez",
//         "original_name": "Maricella Ramirez",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d4955938469a0045404d08",
//         "department": "Camera",
//         "job": "First Assistant Camera"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1538079,
//         "known_for_department": "Production",
//         "name": "Ellen Wolff",
//         "original_name": "Ellen Wolff",
//         "popularity": 0.618,
//         "profile_path": null,
//         "credit_id": "60d4986438469a002f77d585",
//         "department": "Production",
//         "job": "Production Coordinator"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1546457,
//         "known_for_department": "Sound",
//         "name": "Andrew Silver",
//         "original_name": "Andrew Silver",
//         "popularity": 1.646,
//         "profile_path": null,
//         "credit_id": "56832c9792514131df013278",
//         "department": "Sound",
//         "job": "Music Editor"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1551698,
//         "known_for_department": "Sound",
//         "name": "Lisa Brown",
//         "original_name": "Lisa Brown",
//         "popularity": 1.176,
//         "profile_path": null,
//         "credit_id": "56832c35c3a3682abc00f636",
//         "department": "Sound",
//         "job": "Music Supervisor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1555487,
//         "known_for_department": "Editing",
//         "name": "Stephanie M. Casey",
//         "original_name": "Stephanie M. Casey",
//         "popularity": 1.094,
//         "profile_path": null,
//         "credit_id": "56832c54925141133400d1b5",
//         "department": "Editing",
//         "job": "First Assistant Editor"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1555488,
//         "known_for_department": "Sound",
//         "name": "Paul Ledford",
//         "original_name": "Paul Ledford",
//         "popularity": 0.84,
//         "profile_path": null,
//         "credit_id": "60d497163c887d0076f02627",
//         "department": "Sound",
//         "job": "Sound Mixer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1564250,
//         "known_for_department": "Sound",
//         "name": "James Ashwill",
//         "original_name": "James Ashwill",
//         "popularity": 1.583,
//         "profile_path": null,
//         "credit_id": "60d49e1938469a0045406784",
//         "department": "Sound",
//         "job": "Foley Mixer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1568647,
//         "known_for_department": "Camera",
//         "name": "Bob Munoz",
//         "original_name": "Bob Munoz",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4a62e9824c80045d39d53",
//         "department": "Camera",
//         "job": "Key Grip"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1582408,
//         "known_for_department": "Camera",
//         "name": "Eli Golub",
//         "original_name": "Eli Golub",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4cabcc390c5002f9fa772",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1586938,
//         "known_for_department": "Lighting",
//         "name": "Jay Galbo",
//         "original_name": "Jay Galbo",
//         "popularity": 0.84,
//         "profile_path": null,
//         "credit_id": "60d4a160ce4ddc00451bb1e1",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1599614,
//         "known_for_department": "Production",
//         "name": "Marie Healy",
//         "original_name": "Marie Healy",
//         "popularity": 0.614,
//         "profile_path": null,
//         "credit_id": "60d4d0c4ce4ddc002d7a5e79",
//         "department": "Production",
//         "job": "Assistant Location Manager"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1634449,
//         "known_for_department": "Camera",
//         "name": "Renee Treyball",
//         "original_name": "Renee Treyball",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d495e0c390c5002f9edfab",
//         "department": "Camera",
//         "job": "Second Assistant Camera"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1695257,
//         "known_for_department": "Crew",
//         "name": "Joseph Auger",
//         "original_name": "Joseph Auger",
//         "popularity": 0.996,
//         "profile_path": null,
//         "credit_id": "60d503cd33ad8f00461e8ad1",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1710265,
//         "known_for_department": "Sound",
//         "name": "Mark A. Tracy",
//         "original_name": "Mark A. Tracy",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "60d49c41ce4ddc00451ba028",
//         "department": "Sound",
//         "job": "First Assistant Sound Editor"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1739962,
//         "known_for_department": "Editing",
//         "name": "Mary Beth Smith",
//         "original_name": "Mary Beth Smith",
//         "popularity": 1.153,
//         "profile_path": null,
//         "credit_id": "60d514669979d2005d548cad",
//         "department": "Editing",
//         "job": "Negative Cutter"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1749920,
//         "known_for_department": "Lighting",
//         "name": "Ronald A. Miller",
//         "original_name": "Ronald A. Miller",
//         "popularity": 0.766,
//         "profile_path": null,
//         "credit_id": "60d4ccce63a69500464fff87",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1755695,
//         "known_for_department": "Camera",
//         "name": "Joe Macaluso",
//         "original_name": "Joe Macaluso",
//         "popularity": 1.052,
//         "profile_path": null,
//         "credit_id": "60d4ca45c390c5002f9fa62f",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1789925,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Robin Borman",
//         "original_name": "Robin Borman",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d46fe8ce4ddc0073cf41d6",
//         "department": "Costume & Make-Up",
//         "job": "Costumer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1828954,
//         "known_for_department": "Art",
//         "name": "Josh Hadley",
//         "original_name": "Josh Hadley",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4695f38469a005ddb4ed1",
//         "department": "Art",
//         "job": "Leadman"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1843395,
//         "known_for_department": "Crew",
//         "name": "Michael Gaines",
//         "original_name": "Michael Gaines",
//         "popularity": 0.621,
//         "profile_path": null,
//         "credit_id": "60d455f9ce4ddc00451b1fc1",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1856566,
//         "known_for_department": "Crew",
//         "name": "J.P. Romano",
//         "original_name": "J.P. Romano",
//         "popularity": 1.176,
//         "profile_path": "/yO4cpRtV2RaeNRd7YmrM3f6cC7r.jpg",
//         "credit_id": "60d456b33c887d0076efba98",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1858339,
//         "known_for_department": "Camera",
//         "name": "Brian Rosso",
//         "original_name": "Brian Rosso",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4c8de38469a005ddc6b18",
//         "department": "Camera",
//         "job": "Dolly Grip"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1865862,
//         "known_for_department": "Sound",
//         "name": "Tony Blondal",
//         "original_name": "Tony Blondal",
//         "popularity": 0.786,
//         "profile_path": null,
//         "credit_id": "60d51176a76ac5005cdf082f",
//         "department": "Sound",
//         "job": "Orchestrator"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1866780,
//         "known_for_department": "Art",
//         "name": "Paul Arthur Hartman",
//         "original_name": "Paul Arthur Hartman",
//         "popularity": 0.84,
//         "profile_path": null,
//         "credit_id": "60d46ac93e6f2b002988f4f0",
//         "department": "Art",
//         "job": "Leadman"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1880388,
//         "known_for_department": "Crew",
//         "name": "Larry Nicholas",
//         "original_name": "Larry Nicholas",
//         "popularity": 3.774,
//         "profile_path": null,
//         "credit_id": "60d45e7b3e6f2b002988e9a2",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1893552,
//         "known_for_department": "Lighting",
//         "name": "Tony Hibbard",
//         "original_name": "Tony Hibbard",
//         "popularity": 1.214,
//         "profile_path": null,
//         "credit_id": "60d4a1ea3e6f2b00737a1917",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1902319,
//         "known_for_department": "Lighting",
//         "name": "Gary Tandrow",
//         "original_name": "Gary Tandrow",
//         "popularity": 0.84,
//         "profile_path": null,
//         "credit_id": "60d49f8738469a00744bd258",
//         "department": "Lighting",
//         "job": "Chief Lighting Technician"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1902320,
//         "known_for_department": "Lighting",
//         "name": "Jerry Enright",
//         "original_name": "Jerry Enright",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d4a197ce4ddc005c91e872",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 1904434,
//         "known_for_department": "Art",
//         "name": "Marco A. Campos",
//         "original_name": "Marco A. Campos",
//         "popularity": 1.068,
//         "profile_path": null,
//         "credit_id": "60d4fc2c9979d2005d543bee",
//         "department": "Art",
//         "job": "Construction Foreman"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1934104,
//         "known_for_department": "Camera",
//         "name": "Joe Kelly",
//         "original_name": "Joe Kelly",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4c9d138469a00744c6df8",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1945142,
//         "known_for_department": "Camera",
//         "name": "Michael T. Travers",
//         "original_name": "Michael T. Travers",
//         "popularity": 1.116,
//         "profile_path": null,
//         "credit_id": "60d4c6819824c8002f81ec8f",
//         "department": "Camera",
//         "job": "Best Boy Grip"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1945428,
//         "known_for_department": "Crew",
//         "name": "Rick Sawaya",
//         "original_name": "Rick Sawaya",
//         "popularity": 0.828,
//         "profile_path": null,
//         "credit_id": "60d4571738469a00744b459f",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 1950398,
//         "known_for_department": "Camera",
//         "name": "Thomas J. Ruffner",
//         "original_name": "Thomas J. Ruffner",
//         "popularity": 0.629,
//         "profile_path": null,
//         "credit_id": "60d4c8e69824c8002f81f598",
//         "department": "Camera",
//         "job": "Dolly Grip"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 1972653,
//         "known_for_department": "Production",
//         "name": "Maryellen Aviano",
//         "original_name": "Maryellen Aviano",
//         "popularity": 1.96,
//         "profile_path": null,
//         "credit_id": "60d4fdbdc1606a005d36ff93",
//         "department": "Production",
//         "job": "Extras Casting"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 2024998,
//         "known_for_department": "Crew",
//         "name": "Gary Schorr",
//         "original_name": "Gary Schorr",
//         "popularity": 1.094,
//         "profile_path": null,
//         "credit_id": "60d50f16ef9d720074dc1956",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 2048800,
//         "known_for_department": "Sound",
//         "name": "Brian Gallagher",
//         "original_name": "Brian Gallagher",
//         "popularity": 0.996,
//         "profile_path": null,
//         "credit_id": "60d49f1663a69500729dbcb7",
//         "department": "Sound",
//         "job": "ADR Recordist"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 2081779,
//         "known_for_department": "Crew",
//         "name": "Thomas Rasada",
//         "original_name": "Thomas Rasada",
//         "popularity": 1.008,
//         "profile_path": null,
//         "credit_id": "60d4f9563a993700801b403b",
//         "department": "Crew",
//         "job": "Special Effects"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 2156253,
//         "known_for_department": "Crew",
//         "name": "Michael Coady",
//         "original_name": "Michael Coady",
//         "popularity": 1.094,
//         "profile_path": null,
//         "credit_id": "60d506d8ef9d72005d9c06a9",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 2157193,
//         "known_for_department": "Production",
//         "name": "Amy Denning Winfrey",
//         "original_name": "Amy Denning Winfrey",
//         "popularity": 0.732,
//         "profile_path": null,
//         "credit_id": "60d499a7c390c50074377cea",
//         "department": "Production",
//         "job": "Payroll Accountant"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 2263619,
//         "known_for_department": "Production",
//         "name": "Seve Spracklen",
//         "original_name": "Seve Spracklen",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d499803e6f2b0045127f18",
//         "department": "Production",
//         "job": "First Assistant Accountant"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 2411282,
//         "known_for_department": "Production",
//         "name": "Erin Kaufman",
//         "original_name": "Erin Kaufman",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d498e138469a00454057de",
//         "department": "Production",
//         "job": "Assistant Production Coordinator"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 2412778,
//         "known_for_department": "Crew",
//         "name": "Olivia Chang",
//         "original_name": "Olivia Chang",
//         "popularity": 0.828,
//         "profile_path": null,
//         "credit_id": "60d45e5763a69500464ec69e",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 2769582,
//         "known_for_department": "Crew",
//         "name": "Charlie Romano",
//         "original_name": "Charlie Romano",
//         "popularity": 0.994,
//         "profile_path": null,
//         "credit_id": "60d4568838469a005ddb3e3b",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 2877034,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Brooke C. Thatawat",
//         "original_name": "Brooke C. Thatawat",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "60d470fe38469a005ddb5778",
//         "department": "Costume & Make-Up",
//         "job": "Set Costumer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 2935096,
//         "known_for_department": "Camera",
//         "name": "Jeffrey Wright",
//         "original_name": "Jeffrey Wright",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d4cef163a695005cf00e79",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 2943025,
//         "known_for_department": "Camera",
//         "name": "Paul V. Ferrazzi",
//         "original_name": "Paul V. Ferrazzi",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d493e538469a002f77c95a",
//         "department": "Camera",
//         "job": "First Assistant Camera"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3101230,
//         "known_for_department": "Camera",
//         "name": "Jack Kohtala",
//         "original_name": "Jack Kohtala",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4cbdcc390c5002f9fabb4",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3101242,
//         "known_for_department": "Lighting",
//         "name": "W.F. Peterson",
//         "original_name": "W.F. Peterson",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4ce4cb7fbbd004877df53",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3108603,
//         "known_for_department": "Lighting",
//         "name": "Michael J. Bailey",
//         "original_name": "Michael J. Bailey",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d49fff3e6f2b00737a118a",
//         "department": "Lighting",
//         "job": "Best Boy Electric"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3132217,
//         "known_for_department": "Crew",
//         "name": "Steve Sorkin",
//         "original_name": "Steve Sorkin",
//         "popularity": 0.828,
//         "profile_path": null,
//         "credit_id": "60d50f4c7aecc60045cd5430",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3132220,
//         "known_for_department": "Crew",
//         "name": "Gary Kincaid",
//         "original_name": "Gary Kincaid",
//         "popularity": 0.828,
//         "profile_path": null,
//         "credit_id": "60d50af033ad8f005edbe877",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3132246,
//         "known_for_department": "Crew",
//         "name": "Lee Willis",
//         "original_name": "Lee Willis",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d5012da76ac50073d99bac",
//         "department": "Crew",
//         "job": "Transportation Captain"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135012,
//         "known_for_department": "Crew",
//         "name": "P.J. Wagner",
//         "original_name": "P.J. Wagner",
//         "popularity": 0.724,
//         "profile_path": null,
//         "credit_id": "60d4580c0f2fbd005f5f3112",
//         "department": "Crew",
//         "job": "Stunts"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135030,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Elizabeth A. Donovan",
//         "original_name": "Elizabeth A. Donovan",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d46fa0ce4ddc0073cf41b3",
//         "department": "Costume & Make-Up",
//         "job": "Key Costumer"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135034,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Leslie Brown",
//         "original_name": "Leslie Brown",
//         "popularity": 1.411,
//         "profile_path": null,
//         "credit_id": "60d471159824c80045d3094a",
//         "department": "Costume & Make-Up",
//         "job": "Set Costumer"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135037,
//         "known_for_department": "Costume & Make-Up",
//         "name": "Tami Stover",
//         "original_name": "Tami Stover",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d471c9ce4ddc005c916a95",
//         "department": "Costume & Make-Up",
//         "job": "Set Costumer"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135188,
//         "known_for_department": "Camera",
//         "name": "Kevin Goff",
//         "original_name": "Kevin Goff",
//         "popularity": 0.828,
//         "profile_path": null,
//         "credit_id": "60d49665ce4ddc002d7991fa",
//         "department": "Camera",
//         "job": "Second Assistant Camera"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135192,
//         "known_for_department": "Camera",
//         "name": "Patrick Bensimmon",
//         "original_name": "Patrick Bensimmon",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4969038469a00744bb2ec",
//         "department": "Camera",
//         "job": "Camera Loader"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135224,
//         "known_for_department": "Production",
//         "name": "Barbara Gutman",
//         "original_name": "Barbara Gutman",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d499013e6f2b007379fba4",
//         "department": "Production",
//         "job": "Production Accountant"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135228,
//         "known_for_department": "Production",
//         "name": "Nancy S. Rand",
//         "original_name": "Nancy S. Rand",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d49a4fc390c5002f9eed3f",
//         "department": "Production",
//         "job": "Assistant Accountant"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135231,
//         "known_for_department": "Production",
//         "name": "Karen Faust-Crossley",
//         "original_name": "Karen Faust-Crossley",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d49b8338469a005ddbbe59",
//         "department": "Production",
//         "job": "Assistant Accountant"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135262,
//         "known_for_department": "Lighting",
//         "name": "Eric Hibbard",
//         "original_name": "Eric Hibbard",
//         "popularity": 0.994,
//         "profile_path": null,
//         "credit_id": "60d4a234ce4ddc002d79b730",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135266,
//         "known_for_department": "Lighting",
//         "name": "Aaron Richards",
//         "original_name": "Aaron Richards",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d4a51f63a69500729dd102",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135268,
//         "known_for_department": "Lighting",
//         "name": "Kieran Waugh",
//         "original_name": "Kieran Waugh",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d4a59bc390c5002f9f16da",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135269,
//         "known_for_department": "Lighting",
//         "name": "Gomidas Semerjian",
//         "original_name": "Gomidas Semerjian",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d4a5e73e6f2b00737a26af",
//         "department": "Lighting",
//         "job": "Electrician"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135375,
//         "known_for_department": "Camera",
//         "name": "Mark Wright",
//         "original_name": "Mark Wright",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4cb6d0f2fbd005f60bbca",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135385,
//         "known_for_department": "Camera",
//         "name": "Michael Salvato",
//         "original_name": "Michael Salvato",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d4ce74b7fbbd004877dfbc",
//         "department": "Camera",
//         "job": "Grip"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135386,
//         "known_for_department": "Production",
//         "name": "Kim Crabb",
//         "original_name": "Kim Crabb",
//         "popularity": 2.744,
//         "profile_path": null,
//         "credit_id": "60d4d0779824c80045d44d68",
//         "department": "Production",
//         "job": "Assistant Location Manager"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135389,
//         "known_for_department": "Production",
//         "name": "Laura Brown",
//         "original_name": "Laura Brown",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d4d11a3e6f2b00298a23eb",
//         "department": "Production",
//         "job": "Assistant Location Manager"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135530,
//         "known_for_department": "Directing",
//         "name": "Paula Janos",
//         "original_name": "Paula Janos",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d4f8be21621d0046182ce2",
//         "department": "Directing",
//         "job": "Second Second Assistant Director"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135572,
//         "known_for_department": "Crew",
//         "name": "Jean Quay",
//         "original_name": "Jean Quay",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d5014366a7c3002dab6222",
//         "department": "Crew",
//         "job": "Set Medic"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135594,
//         "known_for_department": "Crew",
//         "name": "Ray Appel",
//         "original_name": "Ray Appel",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d50366a76ac50073d9a26e",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135601,
//         "known_for_department": "Crew",
//         "name": "John Brennan",
//         "original_name": "John Brennan",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d5046933ad8f00299c826a",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135607,
//         "known_for_department": "Crew",
//         "name": "Michael Cain",
//         "original_name": "Michael Cain",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d505ba33ad8f00299c8737",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135613,
//         "known_for_department": "Crew",
//         "name": "Reed Cohan",
//         "original_name": "Reed Cohan",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d507f8a76ac50073d9b18f",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135616,
//         "known_for_department": "Crew",
//         "name": "Tim Fennel",
//         "original_name": "Tim Fennel",
//         "popularity": 1.094,
//         "profile_path": null,
//         "credit_id": "60d508829979d2005d5463e9",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135620,
//         "known_for_department": "Crew",
//         "name": "Don Iwanaga",
//         "original_name": "Don Iwanaga",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "60d50965a6d931005eecc862",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135621,
//         "known_for_department": "Crew",
//         "name": "Joe 'Stinky' Killian",
//         "original_name": "Joe 'Stinky' Killian",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d50a72c1606a007e6fe8e3",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135623,
//         "known_for_department": "Crew",
//         "name": "Marc Labeaune",
//         "original_name": "Marc Labeaune",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d50b7521621d005e5a7665",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135624,
//         "known_for_department": "Crew",
//         "name": "Jeff Lira",
//         "original_name": "Jeff Lira",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d50b9933ad8f007f7d5e62",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135625,
//         "known_for_department": "Crew",
//         "name": "Dean Macklem",
//         "original_name": "Dean Macklem",
//         "popularity": 1.96,
//         "profile_path": null,
//         "credit_id": "60d50cbfef9d7200460af90c",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135633,
//         "known_for_department": "Crew",
//         "name": "Bud Main",
//         "original_name": "Bud Main",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d50dc2aa78980045174c6c",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135634,
//         "known_for_department": "Crew",
//         "name": "Tina Peterson",
//         "original_name": "Tina Peterson",
//         "popularity": 0.98,
//         "profile_path": null,
//         "credit_id": "60d50dd23a99370048b85abd",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 0,
//         "id": 3135638,
//         "known_for_department": "Crew",
//         "name": "Jason Rider",
//         "original_name": "Jason Rider",
//         "popularity": 0.694,
//         "profile_path": null,
//         "credit_id": "60d50eb99979d2002f78ee09",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 2,
//         "id": 3135640,
//         "known_for_department": "Crew",
//         "name": "Dennis M. Steere",
//         "original_name": "Dennis M. Steere",
//         "popularity": 1.4,
//         "profile_path": null,
//         "credit_id": "60d50fae21621d007fb3e164",
//         "department": "Crew",
//         "job": "Driver"
//     },
//     {
//         "adult": false,
//         "gender": 1,
//         "id": 3135651,
//         "known_for_department": "Sound",
//         "name": "Amanda Sobeck",
//         "original_name": "Amanda Sobeck",
//         "popularity": 0.6,
//         "profile_path": null,
//         "credit_id": "60d512f99979d2002f78fd63",
//         "department": "Sound",
//         "job": "Music Coordinator"
//     }
// ]