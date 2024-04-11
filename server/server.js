const express = require("express");
const app = express();
const userRouter = require("./configs/user.router");
const productsRouter = require("./configs/products.router");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);

app.listen(5000, () => {
  console.log("The server is Started on 5000");
});
