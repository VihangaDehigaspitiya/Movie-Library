import React, {useEffect, useState} from 'react';
import MainContainer from "../components/Containers/Common/MainContainer";
import Category from "../components/UI/MovieView/Category";
import {Row, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import ImdbImage from "../assets/images/imdb.png";
import movieApi from "../services/movie.api";

const Movie = () => {
    const {id} = useParams();
    const imageBaseUrl = localStorage.getItem('imageBaseUrl');

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null)

    useEffect(() => {
        getMovieDetails();
    }, []);

    const getMovieDetails = async () => {
        await movieApi.getMovieDetails(id)
            .then(res => {
                const {data} = res;
                setMovieDetails(data);
            })
            .catch(e => e.success)
    };

    return (
        <div className="movie-view">
            {movieDetails ? <MainContainer>
                <Row>
                    <Col md="5">
                        <div className="movie-view__img">
                            <img src={`${imageBaseUrl}/w780/${movieDetails.poster_path}`} alt="movie"/>
                        </div>
                    </Col>
                    <Col md="7" className="position-relative">
                        <div className="movie-view__bookmark"
                             onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                            <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}/>
                        </div>
                        <div className="movie-view__name">
                            <h1>{movieDetails.original_title}</h1>
                            <h4>{movieDetails.release_date.slice(0, 4)}</h4>
                        </div>
                        <div className="movie-view__categories">
                            {movieDetails.genres.map(genre => <Category category={genre.name}/>)}
                        </div>
                        <p className="movie-view__description">
                            {movieDetails.overview}
                        </p>
                        <div className="movie-view__imdb">
                            <img src={ImdbImage} alt="imdb"/>
                            <span className="movie-view__rating">{movieDetails.vote_average}</span>
                            <span className="movie-view__max-rating">/ 10</span>
                        </div>
                    </Col>
                </Row>
            </MainContainer> : <div className="text-center">loading...</div>}
        </div>
    );
};

export default Movie;
