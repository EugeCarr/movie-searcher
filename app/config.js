const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie';

const GET_MOVIE_BY_ID_URL ='https://api.themoviedb.org/3/movie';

const APPEND_TO_RESPONSE = '&append_to_response=images';

const API_KEY = process.env.API_KEY;

const DATE_FORMAT = {year: 'numeric', month: 'short', day: 'numeric'};

const IMAGE_URL_POSTER_STUB_SMALL = 'https://image.tmdb.org/t/p/w92';
const IMAGE_URL_POSTER_STUB_LARGE = 'https://image.tmdb.org/t/p/w780';
const IMAGE_URL_POSTER_STUB_GRID_SIZE = 'https://image.tmdb.org/t/p/w154';
const POSTER_PHOTO_ASPECT_RATIO = 9/6;

const ACCENT_COLOUR_HEX= "#FF6542";
export{
    SEARCH_MOVIE_URL,
    API_KEY,
    APPEND_TO_RESPONSE,
    DATE_FORMAT,
    IMAGE_URL_POSTER_STUB_SMALL,
    IMAGE_URL_POSTER_STUB_LARGE,
    IMAGE_URL_POSTER_STUB_GRID_SIZE,
    ACCENT_COLOUR_HEX,
    POSTER_PHOTO_ASPECT_RATIO,
    GET_MOVIE_BY_ID_URL
}