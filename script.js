const banners=["🔥 Sale cực mạnh","🎧 Tai nghe xịn","⚡ Giá sốc"];
let slide=0;

setInterval(()=>{
  document.getElementById("slider").innerText=banners[slide];
  document.getElementById("slider").style.background=
    `linear-gradient(90deg,#0ea5e9,#3b82f6)`;
  slide=(slide+1)%banners.length;
},2000);

/* DATA */
const data=[
  {
    name:"AP3 ANC",
    price:250000,
    cat:"ear",
    img:"anh/ap3.jpg"
  },
  {
    name:"AP4 ANC",
    price:650000,
    cat:"ear",
    img:"anh/ap4.jpg"
  },
  {
    name:"AP-PRO ANC",
    price:350000,
    cat:"ear",
    img:"anh/appro.jpg"
  },
  {
    name:"AP-PRO2 ANC",
    price:450000,
    cat:"ear",
    img:"anh/pro2.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP2 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"tai nghe xương",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"tai nghe công nghệ",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  },
  {
    name:"AP-PRO3 ANC",
    price:950000,
    cat:"ear",
    img:"anh/pro3.jpg"
  }

];

let current="all";
let total=0;

/* RENDER */
function render(){
  const list=document.getElementById("products");
  list.innerHTML="";
  const keyword=document.getElementById("search").value.toLowerCase();

  data.filter(p=>{
    return (current=="all"||p.cat==current)
    && p.name.toLowerCase().includes(keyword);
  })
  .forEach(p=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
    <img class="product-img" src="${p.img}">
    <h3 class="product-name">${p.name}</h3>
    <p class="product-price">${p.price.toLocaleString()}đ</p>
    <button class="buy-btn" onclick="add(${p.price});event.stopPropagation()">
      Mua ngay
    </button>
  `;
    div.onclick=()=>showDetail(p);
    list.appendChild(div);
  });
}

/* FILTER */
function filter(cat){
  current=cat;
  render();
}

/* SEARCH */
document.getElementById("search").addEventListener("input",render);

/* CART */
function add(price){
  total+=price;
  document.getElementById("total").innerText=total.toLocaleString()+"đ";
}

/* MODAL */
function showDetail(p){
  const modal=document.getElementById("modal");
  modal.style.display="flex";
  document.getElementById("modalContent").innerHTML=`
    <h3>${p.name}</h3>
    <p>Giá: ${p.price.toLocaleString()}đ</p>
    <button onclick="buyZalo('${p.name}', ${p.price})">
  Mua ngay
</button>
    <br><br>
    <button onclick="closeModal()">Đóng</button>
  `;
}

function closeModal(){
  document.getElementById("modal").style.display="none";
}

/* INIT */
render();
function toggleMenu(){
  const menu = document.getElementById("menuList");
  menu.classList.toggle("hide");
}
function buyZalo(name, price){
  let phone = "0343282287";

  let message = `Tôi muốn mua ${name}
Giá: ${price.toLocaleString()}đ

Tên:
SĐT:
Địa chỉ:`;

  let url = "https://zalo.me/" + phone + "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}