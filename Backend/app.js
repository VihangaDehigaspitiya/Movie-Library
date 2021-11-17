const express = require("express");
require('dotenv').config({ path: './Backend/.env' })
const cors = require("cors");

const userRouter = require('./routes/user')
const wishlistRouter = require('./routes/wishlist')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/*coverage report*/
app.use('/coverage', express.static('coverage/lcov-report'))

/* user */
app.use('/user', userRouter);

/* wishlist */
app.use('/wishlist', wishlistRouter);

// Swagger Init
const expressSwagger = require("express-swagger-generator")(app);

expressSwagger({
    swaggerDefinition: {
        info: {
            title: process.env.SWAGGER_TITLE,
            description: process.env.SWAGGER_DESCRIPTION,
            version: process.env.SWAGGER_VERSION,
        },
        host: 'localhost:5000',
        consumes: ["application/json"],
        produces: ["application/json"],
        schemes: ["http", "https"],
        securityDefinitions: {
            JWT: {
                type: "apiKey",
                in: "header",
                name: "Authorization",
                description: "Authentication Token for NodeJS API Boilerplate",
            },
        },
    },
    basedir: __dirname,
    files: ["./controllers/*.js"],
});

module.exports = app;
