'use client'
import MovieSummaryContainer from "../../components/movieSummaryContainer";
import { ChakraProvider } from "@chakra-ui/react";
import {Suspense} from "react";


const Page = ({params}) => {
    const {film_id} = params;
    return (
      <ChakraProvider>
        <Suspense fallback={<p>Loading movie...</p>}>
          <MovieSummaryContainer film_id={film_id}/>
        </Suspense>
      </ChakraProvider>
    );
};

// export const generateStaticParams = async () => {
//   const films = await getFilmData();
//   console.log(films);
//   return films.map(film => ({
//     film_id: film.id
//   }))
// };

export default Page;