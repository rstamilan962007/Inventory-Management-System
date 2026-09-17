# Inventory Management System

## Project Description

The Inventory Management System is a simple CRUD-based web application developed to manage product information.

The system allows users to add, view, update, and delete products. It provides a simple interface for maintaining inventory details such as product name, category, quantity, and price.

## Features

* Add new products
* View product details
* Update product information
* Delete products
* Store data using SQLite
* Simple and responsive user interface

## Technologies Used

* HTML
* CSS
* JavaScript
* Python
* Flask
* SQLite

## Project Structure

```text
Inventory-Management-System
│
├── app.py
├── requirements.txt
├── README.md
│
├── templates
│   └── index.html
│
└── static
    ├── style.css
    └── script.js
```

## How to Run

### 1. Install the required package

```bash
pip install -r requirements.txt
```

### 2. Run the application

```bash
python app.py
```

### 3. Open in Browser

```text
http://127.0.0.1:5000
```

## CRUD Operations

| Operation | Description              |
| --------- | ------------------------ |
| Create    | Add a new product        |
| Read      | View available products  |
| Update    | Edit product information |
| Delete    | Remove a product         |

## Database

The application uses **SQLite** to store product information. The database file is created automatically when the application is started.

## Objective

The main objective of this project is to demonstrate the basic working of a CRUD-based web application with frontend, backend, and database integration.

## Developed For

**VSB SKILL VAULT – Activity 3**
**Mini Web Application – CRUD-Based Web Application**

## Conclusion

The Inventory Management System provides a simple way to manage inventory data and demonstrates the basic concepts of CRUD operations, web development, Flask, and database integration.
