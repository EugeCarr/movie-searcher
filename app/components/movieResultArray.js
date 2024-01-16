'use client';
import { 
    Card,
    Heading,
    
 } from "@chakra-ui/react"; 
import { useSearchContext } from "../contexts/searchContext";
import { MovieResult } from "./movieResult";

const filmTest = {
    adult: false,
    backdrop_path: "/1FLId9BrCihR6vsJKVoiyRfnnh9.jpg",
    genre_ids: [],
    id: 65843,
    original_language: "en",
    original_title: "Journey - The Escape Tour",
    overview: "The Escape Tour was a concert tour by the American rock band Journey. It was one of Journey's most successful concert tours, in support of their first number one album, Escape. The tour included six consecutive sold out dates at the Pine Knob Theatre in Detroit, and four straight sold out shows at the Los Angeles Forum, and Chicago's Rosemont Horizon. Journey also made an appearance on July 2, 1982 at the Rose Bowl in Pasadena, California with Blue Öyster Cult, Triumph and Aldo Nova. The eight and a half month tour took Journey through Japan and North America. Point Blank, Billy Squier, Greg Kihn Band and Loverboy were the opening acts during the tour.",
    popularity: 1.4,
    poster_path: "/of6RdcGgHV9i8opoafNAxCuEWLa.jpg",
    release_date: "2005-11-01",
    title: "Journey - The Escape Tour",
    video: false,
    vote_average: 7.5,
    vote_count: 1
};

export const MovieResultGrid = () => {
    const {searchResults} = useSearchContext;
    // const movieListitems = searchResults.map((movie)=> <MovieResult film={movie}/>)
    // console.log(filmTest);
    const movieListitems = <Card colorScheme="blackAlpha">
    <MovieResult film={filmTest}/>
    </Card>;
    // if(!searchResults){
    //     return(<></>)
    // }else{
        return( <MovieResult film={filmTest}/>          
        )
    // }
}; 