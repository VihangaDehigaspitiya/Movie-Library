const { Router } = require('express');

const wishlistController = require('../controllers/wishlist');
const wishlistValidation = require('../validations/wishlist');

const {checkAuthorization} = require('../auth');

const router = Router();

/* GET wishlist all */
router.get('/', checkAuthorization, wishlistController.getWishlistMovies)

/* POST wishlist add */
router.post('/', checkAuthorization, [wishlistValidation.create], wishlistController.addToWishList)

/* PUT wishlist remove */
router.put('/', checkAuthorization, [wishlistValidation.delete], wishlistController.removeWishlistMovies)

/* GET wishlist check */
router.get('/:id', checkAuthorization, wishlistController.checkWishList)


module.exports = router;
