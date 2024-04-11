const {
  create,
  getUserData,
  logUserIn,
  notifiUsers,
  createNoti,
  getUserDataAll,
} = require("./user.service");

module.exports = {
  createSub: (req, res) => {
    const body = req.body;
    createNoti(body, (err, results) => {
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

  createUser: (req, res) => {
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
  getUser: (req, res) => {
    const body = req.body;
    getUserData(body, (err, results) => {
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
          message: "There is no Account with that Address",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUserAll: (req, res) => {
    const body = req.body;
    getUserDataAll(body, (err, results) => {
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
          message: "There is no Account with that Address",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  loginUser: (req, res) => {
    const body = req.body;
    logUserIn(body, (err, results) => {
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
          message: "No Account Fount With That Email or Password",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  notifiUser: (req, res) => {
    const body = req.body;
    notifiUsers(body, (err, results) => {
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
          message: "No Account Fount With",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
