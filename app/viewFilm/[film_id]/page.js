'use client'
import MovieSummaryContainer from "../../components/movieSummaryContainer";
import { ChakraProvider } from "@chakra-ui/react";
import {Suspense, lazy} from "react";
import { getFilmData } from "../../api/films/routes";
import dynamic from "next/dynamic";
import { MovieSummary } from "../../components/movieSummary";

const LazyMovieSummary = dynamic(() => import("../../components/movieSummary"), {ssr: false});

const Page = async ({params}) => {
    const {film_id} = params;
    const filmData = await getFilmData({film_id: film_id});
    return (
      <ChakraProvider>
        <Suspense fallback={<p>Loading movie...</p>}>
          <MovieSummary film={filmData}/>
        </Suspense>
      </ChakraProvider>
    );
};


const delayForFilmData = (comp) => {
  // const data = getFilmData({film_id});
  // console.log({film_id, comp});
  console.log({comp});
  return new Promise().then(()=> comp)
};
// export const generateStaticParams = async () => {
//   const films = await getFilmData();
//   console.log(films);
//   return films.map(film => ({
//     film_id: film.id
//   }))
// };

export default Page;