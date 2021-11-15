import React, {useState} from 'react';
import MainContainer from "../components/Containers/Common/MainContainer";
import Category from "../components/UI/MovieView/Category";
import {Row, Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import MovieImage from "../assets/images/dummy/RedNotice.jpg";
import ImdbImage from "../assets/images/imdb.png";

const Movie = () => {
    const {id} = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);
    console.log(id);
    return (
        <div className="movie-view">
            <MainContainer>
                <Row>
                    <Col md="5">
                        <div className="movie-view__img">
                            <img src={MovieImage} alt="movie"/>
                        </div>
                    </Col>
                    <Col md="7" className="position-relative">
                        <div className="movie-view__bookmark"
                             onClick={() => setIsBookmarked(!isBookmarked)}
                        >
                            <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}/>
                        </div>
                        <div className="movie-view__name">
                            <h1>Red Notice</h1>
                            <h4>2021</h4>
                        </div>
                        <div className="movie-view__categories">
                            <Category category="Action"/>
                            <Category category="Adventure"/>
                        </div>
                        <p className="movie-view__description">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at eos facilis officiis
                            ratione! Ab adipisci amet, aut blanditiis error esse hic ipsum labore nostrum nulla,
                            obcaecati optio perspiciatis possimus quae quisquam ullam velit voluptatibus! Accusantium
                            blanditiis dicta, molestias nemo omnis repellendus sunt! Ab architecto assumenda consequatur
                            culpa deleniti dignissimos ducimus eos eveniet ex excepturi exercitationem, in ipsa iure,
                            modi omnis quaerat quam sapiente ullam vel voluptatem. Accusamus consequuntur eius fuga
                            officia voluptas? Debitis hic ipsa quo reiciendis saepe sint voluptas? Commodi deserunt
                            dolore earum exercitationem harum illo ipsum iusto nostrum nulla qui quod, recusandae totam
                            vel! Nihil nostrum, quae.
                        </p>
                        <div className="movie-view__imdb">
                            <img src={ImdbImage} alt="imdb"/>
                            <span className="movie-view__rating">7.4</span>
                            <span className="movie-view__max-rating">/ 10</span>
                        </div>
                    </Col>
                </Row>
            </MainContainer>
        </div>
    );
};

export default Movie;
