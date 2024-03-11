const SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie';

const GET_MOVIE_BY_ID_URL ='https://api.themoviedb.org/3/movie';

const IMDB_MOVIE_SUMMARY_URL ='https://www.imdb.com/title/';

const APPEND_TO_RESPONSE = '&append_to_response=images';

const API_KEY = process.env.API_KEY;

const DATE_FORMAT = {year: 'numeric', month: 'short', day: 'numeric'};

const IMAGE_URL_POSTER_STUB_SMALL = 'https://image.tmdb.org/t/p/w92';
const IMAGE_URL_POSTER_STUB_LARGE = 'https://image.tmdb.org/t/p/w342';
const IMAGE_URL_POSTER_STUB_GRID_SIZE = 'https://image.tmdb.org/t/p/w154';
const POSTER_PHOTO_ASPECT_RATIO = 9/7;

const ACCENT_COLOUR_HEX= "#FF6542";

const GREY_COLOUR_HEX= "#7E8287";

// const BLUE_BACKGROUND_COLOUR_HEX= "#111D4A";
const BLUE_BACKGROUND_COLOUR_HEX= "#CDD8FF";

const SEARCHBAR_GREY_COLOUR_HEX= "#C8C8C8";

const VIOLET_COLOUR_HEX= "#42033D";

const BORDER_RADIUS ="3px";

const BOX_SHADOW ="2px 2px 5px grey";

const MAX_RESPONSE_SIZE = 20;


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
    GET_MOVIE_BY_ID_URL,
    GREY_COLOUR_HEX,    
    VIOLET_COLOUR_HEX,    
    IMDB_MOVIE_SUMMARY_URL,
    BORDER_RADIUS,
    BOX_SHADOW,
    BLUE_BACKGROUND_COLOUR_HEX,
    SEARCHBAR_GREY_COLOUR_HEX,
    MAX_RESPONSE_SIZE
}