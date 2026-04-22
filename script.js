const products = [
  { id: 1, name: "Áo", price: 100000 },
  { id: 2, name: "Quần", price: 200000 },
  { id: 3, name: "Giày", price: 300000 }
];

let cart = [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalText = document.getElementById("total");

// hiển thị sản phẩm
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product product-" + p.id;
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.price}đ</p>
    <button onclick="add(${p.id})">Thêm</button>
  `;
  productsDiv.appendChild(div);
});

function add(id) {
  const p = products.find(x => x.id === id);
  cart.push(p);
  render();
}

function render() {
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i.name + " - " + i.price + "đ";
    cartDiv.appendChild(li);
    total += i.price;
  });

  totalText.textContent = "Tổng: " + total + "đ";
}

// gửi đơn lên server
function sendOrder() {
  fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cart)
  })
  .then(res => res.text())
  .then(data => alert(data));
}