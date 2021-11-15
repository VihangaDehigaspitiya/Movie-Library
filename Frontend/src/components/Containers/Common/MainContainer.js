import React from 'react';
import {Col, Row} from "react-bootstrap";
import PropTypes from "prop-types";

const MainContainer = (props) => {
    return (
        <Row className={`mx-0 ${props.class}`}>
            <Col
                xl={{span: 8, offset: 2}}
                lg={{span: 10, offset: 1}}
                sm={{span: 10, offset: 1}}
                xs="12"
            >
                {props.children}
            </Col>
        </Row>
    );
};

MainContainer.propTypes = {
    class: PropTypes.string
}

export default MainContainer;
