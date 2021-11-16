import axios from "axios";

/**
 * Get all popular movies
 * @param page
 * @returns {Promise<AxiosResponse<any>>}
 */
const popularMovies = async (page = 1) => {
    return await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=4719df1863d64994f91870b00ebd2f41&sort_by=popularity.desc&page=${page}`);
};

/**
 * Get all genre list
 * @returns {Promise<AxiosResponse<any>>}
 */
const getGenreList = async () => {
    return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=4719df1863d64994f91870b00ebd2f41`);
};

/**
 * Get specific movie details
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const getMovieDetails = async (id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4719df1863d64994f91870b00ebd2f41`);
};

/**
 * Set image configuration
 * @returns {Promise<void>}
 */
const setImageConfiguration = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=4719df1863d64994f91870b00ebd2f41`);
    localStorage.setItem('imageBaseUrl', data.images.secure_base_url);
};

const movie = {
    popularMovies,
    getGenreList,
    setImageConfiguration,
    getMovieDetails
};

export default movie;
