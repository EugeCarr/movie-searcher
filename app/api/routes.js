"use server";
import { SEARCH_MOVIE_URL, API_KEY, APPEND_TO_RESPONSE, GET_MOVIE_BY_ID_URL} from "../config";
import { basicFetch } from "./fetchFunction";
import { NextResponse } from "next/server";

export const searchFilms = async (params) =>{
    
    const searchMovieURL = SEARCH_MOVIE_URL;
    const authStr = '&api_key=' + API_KEY;
    const query = !params.query ? '' : '?query=' + params.query;
    const reg = !params.region ? '' : '&region=' + params.region;
    const year = !params.year ? ''  : '&primary_release_year=' + params.year;
    const isAdult = params.adult== null ? '': !params.adult ? '&include_adult=false' : '&include_adult=true';

    const fetchURL = searchMovieURL + query + reg + year + isAdult  + authStr + APPEND_TO_RESPONSE + ',genres';

    try {
        const response = await fetch(
            fetchURL,
            {
                method: "GET"
            }
        );
        const body = await response.json();
        // console.log(body.results);
        return body.results;
    }catch (error) {
        console.log(error);
        return {data: []}
    } 
};


