import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import MainContainer from "../../Containers/Common/MainContainer";
import Movie from "../../UI/Home/Movie";
import PropTypes from "prop-types";
import API from "../../../services";

const MoviesContainer = ({movies}) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres();
    }, []);

    const getGenres = async () => {
        await API.movie.getGenreList()
            .then(res => {
                const {data} = res;
                setGenres(data.genres);
                console.log(data, "this is the data")
            })
            .catch(e => e.success)
    };

    const finalMovies = movies.map(movie =>
        <Movie
            genres={genres}
            key={movie.id}
            movie={movie}
        />
    );

    return (
        <MainContainer class="movies-container">
            <Row>
                {genres.length ? finalMovies : 'Loading...'}
            </Row>
        </MainContainer>
    );
};

MoviesContainer.propTypes = {
    movies: PropTypes.array
}

export default MoviesContainer;
