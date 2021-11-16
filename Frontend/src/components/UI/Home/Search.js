import React from 'react';
import SearchBg from "../../../assets/images/search-bg.webp";
import {Row, Col, Form, FloatingLabel} from "react-bootstrap";
import {yearList} from "../../../assets/content/content";
import MainButton from "../MainButton/MainButton";
import MainContainer from "../../Containers/Common/MainContainer";

const Search = (props) => {
    const getOptionList = (list) => list.map(item =>
        <option
            key={item.value}
            value={item.value}>
            {item.name}
        </option>
    );

    return (
        <div className="search" style={{backgroundImage: `url(${SearchBg})`}}>
            <div className="search__content">
                <MainContainer>
                    <Form onSubmit={props.handleSearch}>
                        <Row className="mx-0 search-main">
                            <Col md="8" sm="9">
                                <Form.Group className="h-100 w-100">
                                    <Form.Control
                                        className="h-100"
                                        name="searchTerm"
                                        type="text"
                                        placeholder="Search..."
                                        value={props.search.searchTerm}
                                        onChange={props.handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md="4" sm="3">
                                <MainButton
                                    isLoading={false}
                                    classes="w-100"
                                    size="lg">
                                    Search
                                </MainButton>
                            </Col>
                        </Row>
                        <Row className="mx-0 search-by">
                            {/*<Col md="3" sm="6">
                                <FloatingLabel label="Genre">
                                    <Form.Select
                                        name="genre"
                                        onChange={props.handleChange}>
                                        {getOptionList(genreList)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md="3" sm="6">
                                <FloatingLabel label="Rating">
                                    <Form.Select
                                        name="rating"
                                        onChange={props.handleChange}>
                                        {getOptionList(ratingList)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>*/}
                            <Col md="12" sm="6">
                                <FloatingLabel label="Year">
                                    <Form.Select
                                        name="year"
                                        onChange={props.handleChange}>
                                        {getOptionList(yearList)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                           {/* <Col md="3" sm="6">
                                <FloatingLabel label="Order By">
                                    <Form.Select
                                        name="orderBy"
                                        onChange={props.handleChange}>
                                        {getOptionList(orderByList)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>*/}
                        </Row>
                    </Form>
                </MainContainer>
            </div>
        </div>
    );
};

export default Search;
