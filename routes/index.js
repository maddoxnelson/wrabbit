const express = require('express');

const router = express.Router();
const bitController = require('../controllers/bitController');
const privacyController = require('../controllers/privacyController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const wordSprintController = require('../controllers/wordSprintController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/',
  catchErrors(bitController.getUser),
  catchErrors(bitController.getPublicBits),
  catchErrors(bitController.showUserFeedBits),
  catchErrors(bitController.bringToHomePage));

router.get('/write', bitController.addBit);

router.get('/bits/:id/edit', catchErrors(bitController.editBit));

router.get(`/bit/:slug`,
  catchErrors(bitController.checkBitPrivacySettings),
  catchErrors(bitController.getBitBySlug));

router.get(`/bits/privacy`,
  authController.requiredLogin,
  catchErrors(privacyController.getMyOnlyMeBits),
  catchErrors(privacyController.getMyTrustedUserBits),
  catchErrors(privacyController.getMyPublicBits),
  catchErrors(privacyController.directToPrivacyPage)
)

router.get(`/bit/privacy/update/:slug/:privacy`,
    authController.requiredLogin,
    catchErrors(privacyController.userIsAuthorOfThisBit),
    catchErrors(privacyController.updateBitPrivacy),
    catchErrors(bitController.directToBitPage)
)

router.get('/bit/delete/:id', catchErrors(bitController.deleteBit));

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
  authController.requiredLogin,
  wordSprintController.chooseSprintMode
)

router.get('/sprint/:mode',
  wordSprintController.displayMode
)

// Authors
router.get('/author/:slug',
  catchErrors(bitController.getBitsByAuthor)
);

// JSON API for bits from author
router.get('/api/bits/:slug',
  authController.requiredLogin,
  catchErrors(bitController.getJSONBitsByAuthor)
)

router.get('/api/bit/:id',
  authController.requiredLogin,
  catchErrors(bitController.apiGetSingleBit)
)

router.get('/tests',
  bitController.returnSimpleText);

router.get('/api/users',
  authController.requiredLogin,
  catchErrors(userController.apiGetUsers));

router.get('/api/user/:id',
  authController.requiredLogin,
  catchErrors(userController.apiGetSingleUser));

router.get('/user/trust/:id/',
  authController.requiredLogin,
  catchErrors(userController.trustOrUntrustUser)
)

// User and authentication routes
router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/login',
  authController.login,
  authController.directToScreen
);

// validate registration
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

module.exports = router;
