const router = require("express").Router();
const signUpController = require("../Controller/signUpController");
const RequireUserInfo = require("../Middelware/RequireUserInfo");

router.post("/SignUp", signUpController.signUpController);
router.post("/Login", signUpController.LoginController);
router.put(
  "/ForgotPassword",
  RequireUserInfo,
  signUpController.ForggotenPassword
);
router.put("/LogoutUser", signUpController.LogoutController);

module.exports = {
  router,
};
