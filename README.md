# TshirtUp

TshirtUp is a full-stack e-commerce web application developed as part of a personal learning project.

The goal of this project is to create an online T-shirt store where users can browse products, explore categories, manage their accounts, and use a shopping cart.

The application combines a Java Spring Boot backend with a React frontend, communicating through REST APIs.

## Technologies

### Backend
- Java
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security
- BCrypt
- REST API
- Maven

### Frontend
- React
- JavaScript
- Vite
- React Router
- HTML
- CSS
- Fetch API

## Features

### Product Management
- Display available products
- View product details
- Browse products by category
- Create, update, and delete products through REST APIs
- Manage products through an administration interface

### User Management
- User registration
- Login using email and password
- Password hashing with BCrypt
- User profile management
- Update personal information
- Store user addresses
- Administrator role information

### Frontend
- Homepage displaying T-shirt categories
- Product catalog and product detail pages
- Login and registration pages
- User profile page
- Shopping cart page
- Product administration interface
- Privacy policy and terms of sale pages
- Cookie consent component
- Navigation using React Router

## Project Architecture

The application is divided into two main parts.

### Backend

The backend follows a layered architecture:

- Controller: handles HTTP requests and REST endpoints
- Service: contains business logic
- Repository: manages database operations using Spring Data JPA
- Model: represents database entities
- Config: manages Spring Security and CORS configuration

### Frontend

The frontend is organized using reusable React components and dedicated pages.

React Router handles navigation between pages, while the Fetch API is used to communicate with the Spring Boot backend.

## Database

The backend manages three main entities:

- Product: name, description, price, image URL, and category
- Category: name and description
- User: personal information, email, hashed password, address, and administrator status

JPA and Hibernate are used to map Java entities to database tables.

## REST API

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/produits | Retrieve all products |
| GET | /api/produits/{id} | Retrieve a product by ID |
| GET | /api/produits/categorie/{categorieId} | Retrieve products by category |
| POST | /api/produits | Create a product |
| PUT | /api/produits/{id} | Update a product |
| DELETE | /api/produits/{id} | Delete a product |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/categories | Retrieve all categories |
| GET | /api/categories/{id} | Retrieve a category by ID |

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/utilisateurs/inscription | Register a user |
| POST | /api/utilisateurs/connexion | Log in |
| PUT | /api/utilisateurs/{id} | Update user information |

## Security

The application uses Spring Security and BCrypt for password hashing.

User login verifies credentials against stored password hashes.

CORS is configured to allow communication between the React frontend and Spring Boot backend during local development.

Authentication and authorization improvements are still needed before production deployment.

## Project Status

TshirtUp is a learning project developed to strengthen my full-stack development skills.

It has allowed me to gain practical experience with Java, Spring Boot, React, REST APIs, database relationships, frontend-backend communication, and basic user account management.

The project is still evolving, with opportunities to improve security, error handling, and e-commerce functionality.
