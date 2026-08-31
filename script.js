const products=[
 {id:1,name:"Aliment volaille",cat:"aliments",price:15000,img:"https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Abreuvoir d’élevage",cat:"equipements",price:4500,img:"https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Semences agricoles",cat:"agricoles",price:5000,img:"https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Mangeoire",cat:"equipements",price:6500,img:"https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=700&q=80"}
];
let cart=JSON.parse(localStorage.getItem("sipan_cart")||"[]");
const money=n=>new Intl.NumberFormat("fr-FR").format(n)+" FCFA";
function renderProducts(){
 const q=document.querySelector("#search").value.toLowerCase(), c=document.querySelector("#category").value;
 const list=products.filter(p=>(c==="all"||p.cat===c)&&p.name.toLowerCase().includes(q));
 document.querySelector("#products").innerHTML=list.map(p=>`<article class="product"><div class="product-img" style="background-image:url('${p.img}')"></div><div class="product-body"><div class="product-cat">${p.cat}</div><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="addToCart(${p.id})">Ajouter au panier</button></div></article>`).join("")||"<p>Aucun produit trouvé.</p>";
}
function addToCart(id){const p=products.find(x=>x.id===id), item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});save();toast("Produit ajouté au panier");openCart()}
function save(){localStorage.setItem("sipan_cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.querySelector("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const box=document.querySelector("#cartItems");
 box.innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div><h4>${x.name}</h4><small>${money(x.price)} × ${x.qty}</small></div><div class="qty"><button onclick="changeQty(${x.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${x.id},1)">+</button></div></div>`).join(""):"<p style='color:#65736d'>Votre panier est vide.</p>";
 document.querySelector("#cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function changeQty(id,d){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save()}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#cart").setAttribute("aria-hidden","false")}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#cart").setAttribute("aria-hidden","true")}
function toast(t){const x=document.querySelector("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2200)}
document.querySelector("#search").addEventListener("input",renderProducts);document.querySelector("#category").addEventListener("change",renderProducts);
document.querySelector("#cartOpen").onclick=openCart;document.querySelector("#cartClose").onclick=closeCart;
document.querySelector(".menu-btn").onclick=()=>{const n=document.querySelector(".nav-links");n.classList.toggle("open");document.querySelector(".menu-btn").setAttribute("aria-expanded",n.classList.contains("open"))};
document.querySelectorAll(".nav-links a").forEach(a=>a.onclick=()=>document.querySelector(".nav-links").classList.remove("open"));
document.querySelector("#checkout").onclick=()=>cart.length?toast("Commande enregistrée en mode démonstration. Connectez le backend pour la traiter."):toast("Votre panier est vide.");
document.querySelector("#contactForm").onsubmit=e=>{e.preventDefault();document.querySelector("#formStatus").textContent="Votre demande a bien été enregistrée en mode démonstration.";toast("Demande envoyée");e.target.reset()};
renderProducts();renderCart();
