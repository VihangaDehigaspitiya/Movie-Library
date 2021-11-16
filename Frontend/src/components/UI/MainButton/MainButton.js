import React from 'react';
import {Button, Spinner} from "react-bootstrap";
import PropTypes from 'prop-types';

const MainButton =
    ({
         size = '',
         type = 'submit',
         variant = 'primary',
         isLoading = false,
         ...args
     }) => {

        const spinner = <Spinner
            className={args.spinnerClass}
            as="span"
            animation="border"
            role="status"
            aria-hidden="true"
        />;

        return (
            <Button
                onClick={args.handleClick}
                className={`main-button ${args.classes}`}
                size={size}
                type={type}
                variant={variant}>
                {isLoading ? spinner : args.children}
            </Button>
        );
    };

MainButton.propTypes = {
    size: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    classes: PropTypes.string,
    handle: PropTypes.func
};

export default MainButton;
