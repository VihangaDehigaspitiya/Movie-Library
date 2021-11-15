import React from 'react';
import {Col, Row, Form} from "react-bootstrap";
import MovieImage from "../../../assets/images/dummy/RedNotice.jpg";

const WishListItem = () => {
    return (
        <Row className="wishlist-item">
            <Col md="2">
                <Form.Group className="text-center">
                    <Form.Check
                        required
                        value={Math.floor((Math.random() * 100))}
                    />
                </Form.Group>
            </Col>
            <Col md="2">
                <div className="wishlist-item__img">
                    <img src={MovieImage} alt="movie"/>
                </div>
            </Col>
            <Col md="6">
                <div className="wishlist-item__title">
                    Red Notice (2021)
                </div>
                <div className="wishlist-item__categories">
                    Action / Adventure
                </div>
            </Col>
            <Col md="2">
                <div className="wishlist-item__remove">
                    <i className="fas fa-minus-circle"/>
                </div>
            </Col>
        </Row>
    );
};

export default WishListItem;
