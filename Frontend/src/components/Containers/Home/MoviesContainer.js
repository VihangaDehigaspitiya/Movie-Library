import React from 'react';
import {Row} from "react-bootstrap";
import MainContainer from "../../Containers/Common/MainContainer";
import Movie from "../../UI/Home/Movie";

const MoviesContainer = () => {
    return (
        <MainContainer class="movies-container">
            <Row>
                <Movie/>
                <Movie/>
                <Movie/>
                <Movie/>
            </Row>
        </MainContainer>
    );
};

export default MoviesContainer;
