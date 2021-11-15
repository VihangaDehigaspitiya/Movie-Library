import {Col} from "react-bootstrap";
import ImdbImage from "../../../assets/images/imdb.png";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const Movie = ({movie, genres}) => {
    const imageBaseUrl = localStorage.getItem('imageBaseUrl');

    const [movieGenres, setMovieGenres] = useState([]);

    useEffect(() => {
        console.log(genres, "component genres")
        const finalGenres = movie.genre_ids.map(id => genres.find(genre => genre.id === id).name);
        console.log(finalGenres, movie.genre_ids);
        setMovieGenres(finalGenres);
    }, []);

    return (
        <Col xxl="3" xl="4" lg="4" md="4" sm="6" xs="6" className="movie__wrap">
            <Link className="link-reset" to={`/movie/${movie.id}`}>
                <div className="movie">
                    <div className="movie-front">
                        <div className="movie-front__img">
                            <img src={`${imageBaseUrl}/w220_and_h330_face/${movie.poster_path}`} alt="movie"/>
                        </div>
                        <div className="movie-title">
                            <div className="movie-title__movie-category">
                                {movieGenres[0]}
                            </div>
                            <div className="movie-title__movie-name">
                                {movie.original_title}
                            </div>
                        </div>
                    </div>
                    <div className="movie-back">
                        <div className="movie-back__details">
                            <div className="movie-title">
                                <div className="movie-title__movie-category">
                                    {movieGenres[0]}
                                </div>
                                <div className="movie-title__movie-name">
                                    {movie.original_title}
                                </div>
                            </div>
                            <p className="movie-back__description">
                                {movie.overview.slice(0, 100)}...
                            </p>
                            <div className="movie-back-imdb">
                                <img src={ImdbImage} alt="imdb"/>
                                <span className="movie-back-imdb__rating">{movie.vote_average}</span>
                                <span className="movie-back-imdb__max-rating">/ 10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Col>
    );
};

Movie.propTypes = {
    movie: PropTypes.object
};

export default Movie;
