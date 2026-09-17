
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");


// Read products
function loadProducts() {
    fetch("/products")
        .then(response => response.json())
        .then(products => {

            table.innerHTML = "";

            products.forEach(product => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.quantity}</td>
                    <td>₹${product.price}</td>

                    <td>
                        <button onclick="editProduct(${product.id})">
                            Edit
                        </button>

                        <button class="delete-btn"
                                onclick="deleteProduct(${product.id})">
                            Delete
                        </button>
                    </td>
                `;

                table.appendChild(row);
            });
        });
}


// Create product
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const product = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value
    };

    fetch("/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        form.reset();

        loadProducts();
    });
});


// Update product
function editProduct(id) {

    const name = prompt("Enter new product name:");
    const category = prompt("Enter new category:");
    const quantity = prompt("Enter new quantity:");
    const price = prompt("Enter new price:");

    if (!name || !category || !quantity || !price) {
        return;
    }

    const product = {
        name: name,
        category: category,
        quantity: quantity,
        price: price
    };

    fetch(`/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        loadProducts();
    });
}


// Delete product
function deleteProduct(id) {

    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    fetch(`/products/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        loadProducts();
    });
}


// Load products when page opens
loadProducts();
