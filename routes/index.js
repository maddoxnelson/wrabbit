const express = require('express');
const router = express.Router();
const bitController = require('../controllers/bitController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const userDashController = require('../controllers/userDashController');
const wordSprintController = require('../controllers/wordSprintController');
const { catchErrors } = require('../handlers/errorHandlers');

module.exports = router;

router.get('/', catchErrors(bitController.getBits));
router.get('/write', bitController.addBit);

router.get('/bits/:id/edit',catchErrors(bitController.editBit));

router.get(`/bit/:slug`, catchErrors(bitController.getBitBySlug));

router.post('/write',
  catchErrors(bitController.createBit)
);

router.post('/write/:id',
  catchErrors(bitController.updateBit)
);

// Genres
router.get('/genre/:genre',
  catchErrors(bitController.showBitsByGenre)
)

// Word sprints
router.get('/sprint',
  authController.isLoggedIn,
  wordSprintController.chooseSprintMode
)

router.get('/sprint/:mode',
  wordSprintController.displayMode
)

// Authors
router.get('/author/:slug',
  authController.isLoggedIn,
  catchErrors(bitController.getBitsByAuthor),
  catchErrors(userDashController.showUserDash)
);

// User and authentication routes
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/login', authController.login);

// validate registration
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);
