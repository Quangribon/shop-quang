const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")());

let orders = [];

// nhận đơn hàng
app.post("/order", (req, res) => {
  const order = req.body;
  orders.push(order);

  console.log("Đơn mới:", order);

  res.send("Đặt hàng thành công!");
});

app.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});