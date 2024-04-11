const pool = require("./database");
module.exports = {
  create: (data, callBack) => {
    pool.query(
      "insert into medecine(NAME, CATEGORY, PRICE, QUALITY, Description,IMAGE) values(?,?,?,?,?,?)",
      [
        data.NAME,
        data.CATEGORY,
        data.PRICE,
        data.QUALITY,
        data.Description,
        data.IMAGE,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductData: (data, callBack) => {
    console.log(data);
    data.CATEGORY
      ? pool.query(
          "select * from medecine where CATEGORY=?",
          [data.CATEGORY],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        )
      : pool.query("select * from medecine", [], (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        });
  },
  updateProductData: (data, callBack) => {
    pool.query(
      "UPDATE medecine SET PRICE = PRICE - (PRICE * (?/100))",
      [data.DIS],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteProductData: (data, callBack) => {
    pool.query(
      "DELETE FROM `medecine` WHERE ID=?",
      [data.ID],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
