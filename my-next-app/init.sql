-- TABLES

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

-- Restaurants Table
CREATE TABLE restaurant (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    logo VARCHAR(255) -- URL to the logo image
);

-- Pizzas Table
CREATE TABLE pizza (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    picture VARCHAR(255), -- URL to the pizza image
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
);

-- Toppings Table
CREATE TABLE toppings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Pizza_Toppings Table
CREATE TABLE pizza_toppings (
    pizza_id INT NOT NULL,
    topping_id INT NOT NULL,
    PRIMARY KEY (pizza_id, topping_id),
    FOREIGN KEY (pizza_id) REFERENCES pizza(id),
    FOREIGN KEY (topping_id) REFERENCES toppings(id)
);

-- Menu Table
CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    pizza_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (pizza_id) REFERENCES pizza(id)
);

-- Orders Table
CREATE TABLE "order" (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    pizza_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pizza_id) REFERENCES pizza(id)
);

-- Roles Table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    restaurant_id INT NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Permissions Table
CREATE TABLE permission (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    action VARCHAR(50) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    conditions JSONB -- Optional for advanced permissions
);

-- Role_Permissions Table
CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permission(id) ON DELETE CASCADE
);

-- User_Roles Table
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Restaurant_Admins Table
CREATE TABLE restaurant_admins (
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (restaurant_id, user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Restaurant_Toppings Table
CREATE TABLE restaurant_toppings (
    restaurant_id INT NOT NULL,
    topping_id INT NOT NULL,
    PRIMARY KEY (restaurant_id, topping_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id),
    FOREIGN KEY (topping_id) REFERENCES toppings(id)
);
