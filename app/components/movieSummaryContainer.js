'use client'
import { MovieSummary } from "./movieSummary";
import { ChakraProvider } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { getFilmData } from "../api/films/routes";
import { useState, useEffect} from "react";


const MovieSummaryContainer = (props) => {
    const {film_id} = props;
    // console.log({film_id});
    const [filmInfo, setFilmInfo] = useState({});

    const getFilmDataForPage = async () => {
      // console.log(film_id)
      const film = await getFilmData(
        {
          film_id: film_id
        }
      );
      console.log(film);
      setFilmInfo(film);
    };

    useEffect(()=>{
      // console.log("called")
        getFilmDataForPage();
        // console.log("after")
        return
    },[]);
    // const {film_id} = params;
    // const filmInfo = await getFilmData({film_id: film_id});
    // if (!filmInfo){
    //   notFound()
    // }
    return (
        <MovieSummary film={filmInfo}/>
    );
};

// export const generateStaticParams = async () => {
//   const films = await getFilmData();
//   console.log(films);
//   return films.map(film => ({
//     film_id: film.id
//   }))
// };

export default MovieSummaryContainer;