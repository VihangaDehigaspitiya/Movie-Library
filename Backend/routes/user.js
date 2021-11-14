const { Router } = require('express');

const userController = require('../controllers/user');
const userValidation = require('../validations/user')


const router = Router();

/* POST register a new user */
router.post('/register', [userValidation.create],  userController.register);

/* GET user verify */
router.get('/verify/:id', [userValidation.userById], userController.verify);

/* POST user login */
router.post('/login',[userValidation.login], userController.login);

/* POST user refresh token */
router.post('/refresh-token', userController.generateRefreshToken);

/* POST user logout */
router.post('/logout', userController.logout);


module.exports = router;
