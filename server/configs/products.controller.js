const {
  create,
  getProductData,
  updateProductData,
  deleteProductData,
} = require("./products.service");

module.exports = {
  createProduct: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: 0,
          message: "Database Connection Faild",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getProducts: (req, res) => {
    const body = req.body;
    getProductData(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Faild",
        });
      }

      if (Object.keys(results).length === 0) {
        return res.status(500).json({
          success: 2,
          message: "There is No Products Avalable",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateProduct: (req, res) => {
    const body = req.body;
    updateProductData(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Faild",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  deleteProduct: (req, res) => {
    const body = req.body;
    deleteProductData(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database Connection Faild",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
