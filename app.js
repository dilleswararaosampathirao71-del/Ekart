// 🟢 GET ELEMENTS
let add = document.getElementById("add");
let productName = document.getElementById("name");
let des = document.getElementById("des");
let price = document.getElementById("price");
let url = document.getElementById("url");


// 🟢 ADD PRODUCT
if (add) {
    add.addEventListener("click", () => {

        if (!productName.value || !price.value) {
            alert("Enter name and price");
            return;
        }

        if (isNaN(price.value)) {
            alert("Enter valid price");
            return;
        }

        let div = document.createElement("div");
        div.className = "card";

        let img = document.createElement("img");
        img.src = url.value;

        let h = document.createElement("h2");
        h.innerText = productName.value;

        let p = document.createElement("p");
        p.innerText = des.value;

        let btn = document.createElement("button");
        btn.innerText = "BUY";

        btn.onclick = () =>
            addtocart(productName.value, Number(price.value), url.value);

        div.append(img, h, p, btn);

        document.getElementById("product").appendChild(div);

        addtocart(productName.value, Number(price.value), url.value);
    });
}


// 🟢 ADD TO CART
function addtocart(product, price, image) {

    fetch("http://localhost:5000/addtocart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: product,
            price: price,
            image: image
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
    });
}


// 🟡 DISPLAY CART
function displayCart() {

    fetch("http://localhost:5000/cart")
    .then(res => res.json())
    .then(cart => {

        let table = document.getElementById("cartTable");
        let total = document.getElementById("total");

        if (!table) return;

        table.innerHTML = "";

        let sum = 0;

        cart.forEach(item => {

            let tr = document.createElement("tr");

            tr.innerHTML = `
                <td><img src="${item.image}" width="60"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price * item.quantity}</td>
            `;

            table.appendChild(tr);

            sum += item.price * item.quantity;
        });

        total.innerText = "Total: ₹" + sum;
    });
}


// 🔵 UPDATE
function updateQuantity(index, change) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// 🔴 REMOVE
function removeItem(index) {

    

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


// 🟣 LOAD
window.addEventListener("DOMContentLoaded", displayCart);


// 🟠 NAVIGATION
let cartIcon = document.getElementById("cart");

if (cartIcon) {
    cartIcon.onclick = () => {
        window.location.href = "cart.html";
    };
}