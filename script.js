const products=[
{id:1,name:"Aliment pour volailles",category:"Aliments",price:15000,unit:"sac",emoji:"🌾"},
{id:2,name:"Abreuvoir pour élevage",category:"Équipements",price:3500,unit:"pièce",emoji:"💧"},
{id:3,name:"Matériel d’élevage",category:"Équipements",price:12000,unit:"pièce",emoji:"⚙️"},
{id:4,name:"Produit agricole",category:"Produits agricoles",price:8000,unit:"unité",emoji:"🌱"},
{id:5,name:"Accessoire d’élevage",category:"Accessoires",price:5000,unit:"pièce",emoji:"🧰"},
{id:6,name:"Équipement avicole",category:"Équipements",price:18000,unit:"pièce",emoji:"🐔"}];
let cart=JSON.parse(localStorage.getItem("sipanCart")||"[]");
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
function toggleMenu(){document.getElementById("nav").classList.toggle("open")}
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase(), c=document.getElementById("category").value;
 const list=products.filter(p=>(!q||p.name.toLowerCase().includes(q))&&(!c||p.category===c));
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-visual">${p.emoji}</div><div class="product-body"><span class="badge">${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)} / ${p.unit}</div><button onclick="addToCart(${p.id})">Ajouter au panier</button></div></article>`).join("")||"<p>Aucun produit trouvé.</p>";
}
function save(){localStorage.setItem("sipanCart",JSON.stringify(cart));updateCount()}
function updateCount(){document.getElementById("count").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function addToCart(id){let x=cart.find(a=>a.id===id);if(x)x.qty++;else cart.push({id,qty:1});save();openCart()}
function openCart(){document.getElementById("cart").classList.add("show");renderCart()}
function closeCart(){document.getElementById("cart").classList.remove("show")}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p>Votre panier est vide.</p>";document.getElementById("total").textContent="0 FCFA";return}
 let total=0;
 box.innerHTML=cart.map(x=>{const p=products.find(a=>a.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><span>${p.name}<br><small>${x.qty} × ${money(p.price)}</small></span><span><button onclick="changeQty(${p.id},1)">+</button> <button onclick="changeQty(${p.id},-1)">−</button></span></div>`}).join("");
 document.getElementById("total").textContent=money(total);
}
function changeQty(id,d){let x=cart.find(a=>a.id===id);x.qty+=d;if(x.qty<=0)cart=cart.filter(a=>a.id!==id);save();renderCart()}
function checkoutWhatsApp(){
 if(!cart.length)return alert("Votre panier est vide.");
 const lines=cart.map(x=>{const p=products.find(a=>a.id===x.id);return `- ${p.name} x${x.qty}`}).join("\n");
 const msg=`Bonjour SIPAN PRODUCTION,\nJe souhaite passer une commande :\n${lines}\n\nMerci de me contacter pour confirmer la disponibilité, le prix et la livraison.`;
 window.open("https://wa.me/2290147544702?text="+encodeURIComponent(msg),"_blank");
}
function sendContact(e){
 e.preventDefault();
 const msg=`Bonjour SIPAN PRODUCTION,\nNom : ${name.value}\nTéléphone : ${phone.value}\nEmail : ${email.value}\nDemande : ${message.value}`;
 window.open("https://wa.me/2290147544702?text="+encodeURIComponent(msg),"_blank");
}
document.getElementById("cart").addEventListener("click",e=>{if(e.target.id==="cart")closeCart()});
renderProducts();updateCount();
