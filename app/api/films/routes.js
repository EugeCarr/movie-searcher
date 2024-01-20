"use server"
import {API_KEY, APPEND_TO_RESPONSE, GET_MOVIE_BY_ID_URL} from "../../config";
import { basicFetch } from "../fetchFunction";


export const getFilmData = async (params) => {
    console.log(params);
    if(!params) {
        return {}
    }else{
        const fetchURL = `${GET_MOVIE_BY_ID_URL}/${params.film_id}?append_to_response=images,credits,genres&api_key=${API_KEY}`;
        // console.log(fetchURL);
        try {
            const response = await fetch(
                fetchURL,
                {
                    method: "GET"
                }
            );
            const body = await response.json();
            // console.log(body)
            return body;
        }catch (error) {
            console.log(error);
            return {data: []}
        } 
    }
    
}