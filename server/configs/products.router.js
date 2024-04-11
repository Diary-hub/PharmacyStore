const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("./products.controller");
const router = require("express").Router();

router.post("/createProduct", createProduct); //Register
router.post("/getProducts", getProducts); //Get User Datas
router.post("/updateProduct", updateProduct);
router.post("/deleteProduct", deleteProduct); //Login

module.exports = router;
