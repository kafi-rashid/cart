let products = [];
let cart = [];
let totalAmount = 0;

document.addEventListener("DOMContentLoaded", function() {
    isLoggedIn();

    const form = document.getElementById("login-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        login(form);
    });

    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-button')) {
            const productId = event.target.getAttribute('data-product-id');
            addToCart(productId);
        }
        if (event.target.classList.contains('cart-dec-button')) {
            const productId = event.target.getAttribute('data-product-id');
            removeFromCart(productId);
        }
        if (event.target.classList.contains('cart-inc-button')) {
            const productId = event.target.getAttribute('data-product-id');
            addToCart(productId);
        }
    });
});

function fetchProducts() {
    let user = sessionStorage.getItem("user");
    if (user) {  
        fetch('http://localhost:3000/products', {
            headers: {
                "Authorization": "Basic " + JSON.parse(user).token
            }
        }).then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                products = data;
                renderProducts();
            }
        });
    }
}

function isLoggedIn() {
    let user = sessionStorage.getItem("user");
    if (user) {
        document.getElementById("login").classList.add("d-none");
        document.getElementById("welcome").classList.remove("d-none");
        document.getElementById("welcome-container").classList.add("d-none");
        document.getElementById("greeting-user").textContent = JSON.parse(user).user.username.toUpperCase();
        document.getElementById("products-container").classList.remove("d-none");
        fetchProducts();
        renderCart();
    } else {
        document.getElementById("login").classList.remove("d-none");
        document.getElementById("welcome").classList.add("d-none");
        document.getElementById("welcome-container").classList.toggle("d-none")
        document.getElementById("welcome-container").classList.add("center");
        document.getElementById("products-container").classList.add("d-none");
    }
}

function login(form) {
    let username = form.elements["username"].value;
    let password = form.elements["password"].value;
    if (username.trim().length > 0 && password.trim().length > 0) {
        fetch('http://localhost:3000/auth', {
            method: 'POST',
            body: JSON.stringify({
                username: username.toLowerCase(),
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("Invalid username or password!");
            }
        })
        .then(data => {
            if (data && data.hasOwnProperty("token")) {
                form.reset();
                sessionStorage.setItem("user", JSON.stringify(data));
                isLoggedIn();
            }
        });
    }
}

function logout() {
    sessionStorage.clear();
    isLoggedIn();
}

function renderProducts() {
    let rows = "";
    products.forEach(product => {
        rows += `
        <tr>
            <td>
                <div class="name-with-image">
                    <img src="${ product.image }">
                    <p class="font-weight-bold">${ product.name }</p>
                </div>
            </td>
            <td class="text-right">${ "$" + product.price }</td>
            <td class="text-right">${ product.quantity }</td>
            <td class="text-center">
                <img src="assets/images/cart.png"
                    alt="Add to Cart"
                    class="add-to-cart-button"
                    data-product-id="${ product.id }">
            </td>
        </tr>`
    });
    document.getElementById("product-rows").innerHTML = rows;
}

function addToCart(productId) {
    let product = products.find(prod => prod.id === parseInt(productId));
    if (product && product.quantity > 0) {
        let addProduct = JSON.parse(JSON.stringify(product));
        let alreadyAdded = cart.find(prod => prod.id === parseInt(productId));
        if (alreadyAdded) {
            if (alreadyAdded.quantity < product.quantity) {
                alreadyAdded.quantity++;
                alreadyAdded.total = alreadyAdded.price * alreadyAdded.quantity;    
            }
        } else {
            addProduct.quantity = 1;
            addProduct["total"] = addProduct.price * addProduct.quantity;
            cart.push(addProduct);
        }
        renderCart();
    }
}

function removeFromCart(productId) {
    let product = products.find(prod => prod.id === parseInt(productId));
    let alreadyAdded = cart.find(prod => prod.id === parseInt(productId));
    if (alreadyAdded) {
        if (alreadyAdded.quantity === 1) {
            cart = cart.filter(prod => prod.id !== parseInt(productId));
        } else {
            alreadyAdded.quantity--;
            alreadyAdded.total = alreadyAdded.price * alreadyAdded.quantity;    
        }
    }
    renderCart();
}

function renderCart() {
    totalAmount = 0;
    if (cart && cart.length > 0) {
        document.getElementById("cart-table").classList.remove("d-none");
        document.getElementById("cart-empty").classList.add("d-none");
    } else {
        document.getElementById("cart-table").classList.add("d-none");
        document.getElementById("cart-empty").classList.remove("d-none");
    }
    let rows = "";
    if (cart && cart.length > 0) {
        cart.forEach(product => {
            rows += `
            <tr>
                <td>
                    <div class="name-with-image">
                        <img src="${ product.image }">
                        <p class="font-weight-bold">${ product.name }</p>
                    </div>
                </td>
                <td class="text-right">${ "$" + product.price }</td>
                <td class="text-right">${ "$" + product.total.toFixed(2) }</td>
                <td class="text-center">
                    <div class="quantity">
                        <button class="cart-dec-button" data-product-id="${ product.id }">-</button>
                        <input type="text" disabled value="${ product.quantity }">
                        <button class="cart-inc-button" data-product-id="${ product.id }">+</button>
                    </div>
                </td>
            </tr>`;
            totalAmount += product.total;
        });
    }
    document.getElementById("cart-rows").innerHTML = rows;
    document.getElementById("total-amount").innerHTML = "$" + totalAmount.toFixed(2);
}

function placeOrder() {
    console.log(cart);
    cart.forEach(prod => {
        let product = products.find(p => p.id === parseInt(prod.id));
        if (product) {
            product.quantity = product.quantity - prod.quantity;
        }
    });
    cart = [];
    alert("Order has been placed! Thank you.")
    renderProducts();
    renderCart();
}