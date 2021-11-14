const { Router } = require('express');

const userController = require('../controllers/user');
const userValidation = require('../validations/user')


const router = Router();

/* POST register a new user */
router.post('/register', [userValidation.create],  userController.register);

/* GET user verify */
router.get('/verify/:id', [userValidation.userById], userController.verify);


module.exports = router;
