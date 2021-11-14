const { Router } = require('express');

const wishlistController = require('../controllers/wishlist');
const wishlistValidation = require('../validations/wishlist');

const {checkAuthorization} = require('../auth');

const router = Router();

/* GET wishlist all */
router.get('/', checkAuthorization, wishlistController.getWishlistMovies)

/* POST wishlist add */
router.post('/', checkAuthorization, [wishlistValidation.create], wishlistController.addToWishList)

/* DELETE wishlist remove */
router.delete('/', checkAuthorization, [wishlistValidation.delete], wishlistController.removeWishlistMovies)


module.exports = router;
