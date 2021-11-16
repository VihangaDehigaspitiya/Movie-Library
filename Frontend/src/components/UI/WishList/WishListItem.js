import React from 'react';
import {Col, Row, Form} from "react-bootstrap";

const WishListItem = ({id, ...args}) => {
    const imageBaseUrl = localStorage.getItem('imageBaseUrl');

    return (
        <Row className="wishlist-item">
            <Col md="2">
                <Form.Group className="text-center">
                    <Form.Check
                        required
                        value={id}
                        onChange={args.handleChange}
                    />
                </Form.Group>
            </Col>
            <Col md="2">
                <div className="wishlist-item__img">
                    <img src={`${imageBaseUrl}/w780/${args.movie.image}`} alt="movie"/>
                </div>
            </Col>
            <Col md="6">
                <div className="wishlist-item__title">
                    {args.movie.title} ({args.movie.release_date.slice(0, 4)})
                </div>
                <div className="wishlist-item__categories">
                    {args.movie.genre}
                </div>
            </Col>
            <Col md="2">
                <div className="wishlist-item__remove">
                    <i className="fas fa-minus-circle" onClick={() => args.onRemove(id)}/>
                </div>
            </Col>
        </Row>
    );
};

export default WishListItem;
