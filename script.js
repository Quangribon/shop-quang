
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgPZf6aXnzOaF8ytLyWoWcGr78X2NIhM",
  authDomain: "shop-quangribon.firebaseapp.com",
  projectId: "shop-quangribon",
  storageBucket: "shop-quangribon.firebasestorage.app",
  messagingSenderId: "591997584122",
  appId: "1:591997584122:web:1ace50b4802d143a6d7f43"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("JS LOADED");

// ===== SLIDER =====
const banners = ["🔥 Sale cực mạnh", "🎧 Tai nghe xịn", "⚡ Giá sốc"];
let slide = 0;

setInterval(() => {
  const slider = document.getElementById("slider");
  if (slider) {
    slider.innerText = banners[slide];
    slider.style.background = `linear-gradient(90deg,#0ea5e9,#3b82f6)`;
    slide = (slide + 1) % banners.length;
  }
  
}, 2000);

// ===== DATA =====
const data = [
  { name: "AP2 Hàng Cũ", price: 199000, oldPrice: 450000, cat: "ear", img: "anh/ap3.jpg", desc: "Tai nghe hàng cũ,đã qua sửa chữa.Không áp dụng giảm giá" },
  { name: "AP3 Hàng Cũ", price: 169000, oldPrice: 450000, cat: "ear", img: "anh/ap3.jpg", desc: "Tai nghe hàng cũ,đã qua sửa chữa.Không áp dụng giảm giá" },
  { name: "AP4 ANC", price: 650000, cat: "ear", img: "anh/ap4.jpg", desc: "Tai nghe chống ồn ANC, pin 8h, case 30h" },
  { name: "AP-PRO Hàng Cũ ",oldPrice: 450000, price: 199000, cat: "ear", img: "anh/appro.jpg", desc: "Tai nghe hàng cũ,đã qua sửa chữa.Không áp dụng giảm giá" },
  { name: "AP-PRO2 ANC", price: 650000, cat: "ear", img: "anh/pro2.jpg", desc: "Tai nghe chống ồn ANC, pin 8h, case 30h" },
  { name: "AP-PRO3 ANC", price: 950000, cat: "ear", img: "anh/pro3.jpg", desc: "Tai nghe cao cấp nhất" },
  { name: "Chống Rớt Tai Nghe", price: 35000, cat: "acc", img: "anh/phu kien chong roi.jpg", desc: "Giữ tai nghe giúp tự tin hơn khi chạy bộ"},
  { name: "Dây sạc nhanh Màu Xanh", price: 35000, cat: "acc", img: "anh/dayxanh.jpg", desc: "Dây sạc nhanh chân tai C"},
  { name: "Dây sạc nhanh Màu Vàng", price: 35000, cat: "acc", img: "anh/dayvang.jpg", desc: "Dây sạc nhanh chân tai C"},
  { name: "Dây sạc nhanh Màu Trắng", price: 35000, cat: "acc", img: "anh/daytrang.jpg", desc: "Dây sạc nhanh chân tai C"},
  { name: "Dây sạc nhanh Màu Cam", price: 35000, cat: "acc", img: "anh/daycam.jpg", desc: "Dây sạc nhanh chân tai C"},
  { name: "Dây sạc nhanh Mùa Xanh Biển", price: 35000, cat: "acc", img: "anh/dayxanhdatroi.jpg", desc: "Dây sạc nhanh chân tai C"}
];

let current = "all";

// ===== RENDER =====
function render() {
  const list = document.getElementById("products");
  if (!list) return;

  list.innerHTML = "";
  const keyword = document.getElementById("search").value.toLowerCase();

  data
    .filter(p => (current === "all" || p.cat === current) && p.name.toLowerCase().includes(keyword))
    .forEach(p => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <img class="product-img" src="${p.img}">
        <h3>${p.name}</h3>
        <p style="color:red">${p.price.toLocaleString()}đ</p>
        <button onclick="buyZalo('${p.name}', ${p.price})">Mua ngay</button>
        <button onclick='showDetail(${JSON.stringify(p)})'>Chi tiết</button>
      `;

      list.appendChild(div);
    });
}

// ===== SEARCH =====
document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  if (search) search.addEventListener("input", render);
});

function filter(cat) {
  current = cat;
  render();
}

// ===== MODAL =====
function showDetail(p) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modalContent");

  modal.style.display = "flex";
  content.innerHTML = `
    <img src="${p.img}" style="width:100%">
    <h3>${p.name}</h3>
    <p>
      ${p.oldPrice ? `<span style="text-decoration:line-through;color:gray;margin-right:5px;">
        ${p.oldPrice.toLocaleString()}đ
      </span>` : ""}
      
      <span style="color:red;font-weight:bold;">
        ${p.price.toLocaleString()}đ
      </span>
    </p>
    <p>${p.desc}</p>
    <button onclick="buyZalo('${p.name}', ${p.price})">Mua ngay</button>
    <button onclick="closeModal()">Đóng</button>
  `;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// ===== ZALO =====
function buyZalo(name, price) {
  let phone = "0343282287";

  let message = `Tôi muốn mua ${name}
Giá: ${price.toLocaleString()}đ

Tên:
SĐT:
Địa chỉ:`;

  let url = "https://zalo.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

// ===== MENU =====
function toggleMenu() {
  document.getElementById("menuList").classList.toggle("hide");
}

// ===== CHECK NGÀY =====
function isSameDay(timestamp) {
  let last = new Date(parseInt(timestamp));
  let now = new Date();
  return last.toDateString() === now.toDateString();
}

// ===== VÒNG QUAY =====
const gifts = [
  { text: "Giảm 10%", percent: 30 },
  { text: "Giảm 20%", percent: 25 },
  { text: "Freeship", percent: 20 },
  { text: "Giảm 30%", percent: 15 },
  { text: "Giảm 50%", percent: 5 },
  { text: "Quà bí mật 🎁", percent: 5 }
];
const secretGifts = [
  {
    name: "Tai nghe VIP",
    img: "anh/ap3.jpg",
    msg: "🎉 Chúc bạn may mắn! Đây là phần quà đặc biệt!"
  },
  {
    name: "Voucher 100K",
    img: "anh/pro2.jpg",
    msg: "🔥 Bạn nhận được voucher giảm giá 100K!"
  },
  {
    name: "Freeship toàn quốc",
    img: "anh/ap4.jpg",
    msg: "🚚 Chúc mừng! Bạn được freeship!"
  }
];
function getWeightedIndex() {
  let total = gifts.reduce((sum, g) => sum + g.percent, 0);
  let rand = Math.random() * total;

  let sum = 0;
  for (let i = 0; i < gifts.length; i++) {
    sum += gifts[i].percent;
    if (rand < sum) return i;
  }
}

let angle = 0;
let spinning = false;

function drawWheel() {
  const canvas = document.getElementById("wheelCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const arc = (2 * Math.PI) / gifts.length;

  ctx.clearRect(0, 0, 300, 300);

  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate(angle);
  ctx.translate(-150, -150);

  for (let i = 0; i < gifts.length; i++) {
    let start = i * arc;

    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff6600";
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, start, start + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(start + arc / 2);
    ctx.fillStyle = "#000";
    ctx.fillText(gifts[i].text, 50, 5);
    ctx.restore();
  }

  ctx.restore();
}

// ===== SPIN =====
function spinWheel() {
  console.log("SPIN");

  let lastSpin = localStorage.getItem("spinTime");
  if (lastSpin && isSameDay(lastSpin)) {
    document.getElementById("result").innerText = "❌ Hết lượt hôm nay";
    return;
  }

  if (spinning) return;
  spinning = true;

  const arc = (2 * Math.PI) / gifts.length;
  let randomIndex = getWeightedIndex();

  let end =
    angle +
    (Math.PI * 2 * 5) +
    (Math.PI * 2 - randomIndex * arc - arc / 2) - 
    Math.PI / 2;

  let duration = 3000;
  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    let progress = time - startTime;

    let ease = 1 - Math.pow(1 - progress / duration, 3);
    angle = angle + (end - angle) * ease;

    drawWheel();

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;

      let result = gifts[randomIndex].text;

      if (result.includes("Quà bí mật")) {
        let gift = secretGifts[Math.floor(Math.random() * secretGifts.length)];

        document.getElementById("result").innerHTML = `
          <div style="text-align:center">
            <h3>🎁 ${gift.name}</h3>
            <img src="${gift.img}" style="width:120px;border-radius:10px;margin:10px 0">
            <p>${gift.msg}</p>
          </div>
        `;
      } else {
        document.getElementById("result").innerText = "🎉 " + result;
      }

      localStorage.setItem("spinTime", Date.now());

      const btn = document.getElementById("spinBtn");
      btn.disabled = true;
      btn.style.opacity = "0.5";
    }
  }

  requestAnimationFrame(animate);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  render();
  drawWheel();

  const btn = document.getElementById("spinBtn");
  if (btn) btn.addEventListener("click", spinWheel);

  let lastSpin = localStorage.getItem("spinTime");
  if (lastSpin && isSameDay(lastSpin)) {
    document.getElementById("result").innerText = "❌ Hết lượt hôm nay";
    btn.disabled = true;
  } else {
    document.getElementById("result").innerText = "✅ Bạn còn 1 lượt quay";
  }
});

// ===== POPUP =====
function showVongQuay() {
  document.getElementById("spinPopup").style.display = "flex";
}

function closeSpin() {
  document.getElementById("spinPopup").style.display = "none";
}
window.addEventListener("load", function () {
  showVongQuay();
});
const flycamPassword = "FLYCAM2026";

const flycamLink = "https://docs.google.com/document/u/0/d/1XeH_vSSrIdedth46C7ATSDOF0mx01GbUb3FgFyKuGh8/mobilebasic?pli=1";

function flycam(){
    document.getElementById("flycamPopup").style.display="flex";
    document.getElementById("flycamCode").value="";
    document.getElementById("flycamError").innerText="";
}

function closeFlycam(){
    document.getElementById("flycamPopup").style.display="none";
}

function checkFlycam(){

    let code=document.getElementById("flycamCode").value.trim();

    if(code===flycamPassword){
        window.location.href=flycamLink;
    }else{
        document.getElementById("flycamError").innerText="❌ Mã truy cập không đúng!";
    }
}
// ===== Export ra window =====
window.showVongQuay = showVongQuay;
window.closeSpin = closeSpin;
window.spinWheel = spinWheel;

window.filter = filter;
window.buyZalo = buyZalo;
window.showDetail = showDetail;
window.closeModal = closeModal;
window.toggleMenu = toggleMenu;

window.flycam = flycam;
window.closeFlycam = closeFlycam;
window.checkFlycam = checkFlycam;
