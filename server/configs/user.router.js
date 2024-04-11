const {
  createUser,
  getUser,
  getUserAll,
  loginUser,
  notifiUser,
  createSub,
} = require("./user.controller");
const router = require("express").Router();

router.post("/createUser", createUser); //Register
router.post("/getUser", getUser); //Get User Datas
router.post("/getUserAll", getUserAll); //Get User Datas
router.post("/loginUser", loginUser); //Login
router.post("/notifi", notifiUser); //Notifi ALl to new Medecine
router.post("/subscribe", createSub); //Notifi ALl to new Medecine

module.exports = router;
