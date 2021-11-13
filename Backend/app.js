const express = require("express");
const dotenv =  require("dotenv");
const cors = require("cors");

const userRouter = require('./routes/user')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* user */
app.use('/user', userRouter);

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

app.listen(5000);

module.exports = app;
