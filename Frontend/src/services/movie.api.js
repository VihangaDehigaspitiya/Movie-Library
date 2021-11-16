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

/**
 * Set movies
 * @returns {Promise<void>}
 */
const search = async (payload) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4719df1863d64994f91870b00ebd2f41&language=en-US&page=${payload.page}&include_adult=false&query=${payload.searchTerm}&year=${payload.year}`);
}

const movie = {
    popularMovies,
    getGenreList,
    setImageConfiguration,
    getMovieDetails,
    search
};

export default movie;
