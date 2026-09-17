from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


def get_db():
    conn = sqlite3.connect("inventory.db")
    conn.row_factory = sqlite3.Row
    return conn


def create_table():
    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            price REAL NOT NULL
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/products", methods=["GET"])
def get_products():
    conn = get_db()
    products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()

    return jsonify([dict(product) for product in products])


@app.route("/products", methods=["POST"])
def add_product():
    data = request.json

    conn = get_db()

    conn.execute(
        """INSERT INTO products
           (name, category, quantity, price)
           VALUES (?, ?, ?, ?)""",
        (
            data["name"],
            data["category"],
            data["quantity"],
            data["price"]
        )
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Product added successfully"})


@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):
    data = request.json

    conn = get_db()

    conn.execute(
        """UPDATE products
           SET name=?, category=?, quantity=?, price=?
           WHERE id=?""",
        (
            data["name"],
            data["category"],
            data["quantity"],
            data["price"],
            id
        )
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Product updated successfully"})


@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    conn = get_db()

    conn.execute(
        "DELETE FROM products WHERE id=?",
        (id,)
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Product deleted successfully"})


if __name__ == "__main__":
    create_table()
    app.run(debug=True)
