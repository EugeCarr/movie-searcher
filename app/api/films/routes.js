"use server";
import {API_KEY, APPEND_TO_RESPONSE, GET_MOVIE_BY_ID_URL} from "../../config";
import { basicFetch } from "../fetchFunction";


export const getFilmData = async (params) => {
    if(!params) {
        return {}
    }else{
        const fetchURL = `${GET_MOVIE_BY_ID_URL}/${params.film_id}?${APPEND_TO_RESPONSE},credits&api_key=${API_KEY}`;
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