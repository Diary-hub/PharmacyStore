const pool = require("./database");
module.exports = {
  create: (data, callBack) => {
    pool.query(
      "insert into accounts(NAME, EMAIL, PASSWORD, PHONE, TYPE,IMAGE) values(?,?,?,?,?,?)",
      [data.NAME, data.EMAIL, data.PASSWORD, data.PHONE, data.TYPE, data.IMAGE],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createNoti: (data, callBack) => {
    pool.query(
      "insert into notifiy(EMAIL) values(?)",
      [data.EMAIL],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserData: (data, callBack) => {
    pool.query("select EMAIL from notifiy", [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserDataAll: (data, callBack) => {
    pool.query("select EMAIL from accounts", [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  logUserIn: (data, callBack) => {
    pool.query(
      "select * from accounts where EMAIL=? AND PASSWORD=?",
      [data.EMAIL, data.PASSWORD],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  notifiUsers: (data, callBack) => {
    var nodemailer = require("nodemailer");

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    var mailOptions = {
      from: "",
      to: data.EMAIL,
      subject: data.BODY
        ? "Feedback From User " + data.NAME
        : data.SUB
        ? "Medecines Price Is Low"
        : "We Have New Medecine",
      text: data.BODY
        ? data.BODY +
          "\n" +
          "\n Client Name: " +
          data.NAME +
          "\n Client Email: " +
          data.CEMAIL
        : data.SUB
        ? "We Made Discounts by: " + data.SUB + "%"
        : data.VER
        ? "Code: 8686"
        : "Please Check The Website For More Informations",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return callBack(error);
      } else {
        console.log("Email sent: " + info.response);
        return callBack(null, info);
      }
    });
  },
};
