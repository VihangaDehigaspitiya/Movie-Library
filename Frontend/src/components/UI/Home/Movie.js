import React from 'react';
import {Col} from "react-bootstrap";
import MovieImage from "../../../assets/images/dummy/movie.webp";
import ImdbImage from "../../../assets/images/imdb.png";


const Movie = (props) => {
    return (
        <Col lg="3" md="4" sm="6" xs="6" className="movie__wrap">
            <div className="movie">
                <div className="movie-front">
                    <div className="movie-front__img">
                        <img src={MovieImage} alt="movie"/>
                    </div>
                    <div className="movie-title">
                        <div className="movie-title__movie-category">
                            Action
                        </div>
                        <div className="movie-title__movie-name">
                            No Time to Die
                        </div>
                    </div>
                </div>
                <div className="movie-back">
                    <div className="movie-back__details">
                        <div className="movie-title">
                            <div className="movie-title__movie-category">
                                Action
                            </div>
                            <div className="movie-title__movie-name">
                                No Time to Die
                            </div>
                        </div>
                        <p className="movie-back__description">
                            Fusce euismod sem diam, vel congue mi gravida non. Aliquam id justo vel tortor luctus
                            rhoncus.
                        </p>
                        <div className="movie-back-imdb">
                            <img src={ImdbImage} alt="imdb"/>
                            <span className="movie-back-imdb__rating">7.4</span>
                            <span className="movie-back-imdb__max-rating">/ 10</span>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default Movie;
