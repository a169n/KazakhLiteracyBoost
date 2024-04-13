const Router = require("express");
const { login, register } = require("../controllers/authController");
const router = Router();

// routes are /auth/login, /auth/register
router.post("/login", login);
router.post("/register", register);

module.exports = router;
