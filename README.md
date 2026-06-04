# ✈️ Triply — Full-Stack Travel & Tourism Web Application

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A modern, full-stack travel and tourism platform where users can explore destinations, browse tour packages, book trips, and manage their entire travel experience — all from one place.

---

## 📸 Screenshots





## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Challenges & Learnings](#challenges--learnings)
- [Author](#author)



## 🧭 About the Project

**Triply** is a full-stack travel and tourism web application built as part of an Industrial Training project. It allows users to explore travel destinations, browse curated tour packages, and make bookings — while admins can manage all packages and bookings through a dedicated dashboard.

The application follows a **RESTful architecture** with a Spring Boot backend serving as the API layer and a React (Vite) frontend consuming those APIs.

---

## ✅ Features

### 👤 User Features
- Browse all available travel destinations and tour packages
- View detailed information about each package (price, duration, itinerary)
- Book a tour package and view booking history

### 🛠️ Admin Features
- Secure admin login
- Add, update, and delete tour packages
- View and manage all user bookings
- Dashboard overview with key stats

### 🌐 General
- Fully responsive UI (desktop & mobile)
- RESTful API communication between frontend and backend
- Error handling and form validation



## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Java 17, Spring Boot 3.2 |
| **ORM / Database Layer** | Spring Data JPA, Hibernate |
| **Security** | Spring Security |
| **Frontend** | React 18, Vite 5 |
| **HTTP Client** | Axios |
| **Routing** | React Router DOM |
| **Database** | MySQL 8.0 |
| **Build Tool** | Maven |
| **API Testing** | Postman |
| **IDE** | VS Code, Spring Tool Suite (STS) |



## 📁 Project Structure

```
triply/
│
├── triply-backend/                  # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/triply/
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   ├── service/         # Business Logic
│   │   │   │   ├── repository/      # JPA Repositories
│   │   │   │   ├── model/           # Entity Classes
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   └── config/          # Security & CORS Config
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
│
└── triply-frontend/                 # React + Vite Application
    ├── src/
    │   ├── components/              # Reusable UI Components
    │   ├── pages/                   # Page-level Components
    │   ├── services/                # Axios API Calls
    │   ├── context/                 # React Context (Auth, etc.)
    │   └── App.jsx
    ├── index.html
    └── package.json
```



## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Java 17+
- Node.js 18+ and npm
- MySQL 8.0+
- Maven 3.8+
- Git



### 🗄️ Database Setup

1. Open your MySQL client (MySQL Workbench or CLI).

2. Create the database:
```sql
CREATE DATABASE triply_db;
```

3. Update `application.properties` with your MySQL credentials (see Backend Setup).

> Spring Boot with JPA will auto-create tables on first run (`spring.jpa.hibernate.ddl-auto=update`).



### ⚙️ Backend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/triply.git
cd triply/triply-backend
```

2. **Configure the database** in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/triply_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

3. **Run the backend:**
```bash
mvn spring-boot:run
```

The backend will start at: `http://localhost:8080`



### 💻 Frontend Setup

1. **Navigate to the frontend directory:**
```bash
cd ../triply-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure the API base URL** in your Axios config or `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

4. **Run the frontend:**
```bash
npm run dev
```

The frontend will start at: `http://localhost:5173`



## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive token |

### Packages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/packages` | Get all tour packages |
| GET | `/api/packages/{id}` | Get package by ID |
| POST | `/api/packages` | Add new package (Admin) |
| PUT | `/api/packages/{id}` | Update package (Admin) |
| DELETE | `/api/packages/{id}` | Delete package (Admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings/user/{userId}` | Get bookings by user |
| GET | `/api/bookings` | Get all bookings (Admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/{id}` | Get user profile |
| PUT | `/api/users/{id}` | Update user profile |

> **Note:** Admin endpoints are protected and require admin-role authorization.

---

## 🔮 Future Enhancements

- [ ] **JWT Authentication** with refresh token support
- [ ] **Payment Gateway** integration (Razorpay / Stripe)
- [ ] **Real-time Notifications** using WebSockets
- [ ] **AI-based Destination Recommender** using user preferences
- [ ] **Reviews & Ratings** for tour packages
- [ ] **Email Confirmation** on successful booking
- [ ] **Docker Containerization** for easy deployment
- [ ] **Cloud Deployment** on AWS / Railway / Render



## 🧠 Challenges & Learnings

### Challenges Faced

**1. Lombok + Jackson Serialization Conflict**
Bidirectional JPA relationships (`@OneToMany` / `@ManyToOne`) caused `StackOverflowError` during JSON serialization when Lombok's `@Data` was used. Resolved by replacing Lombok annotations with manually written getters and setters and using `@JsonManagedReference` / `@JsonBackReference`.

**2. CORS Configuration**
The React dev server (port 5173) and Spring Boot backend (port 8080) ran on different ports, causing CORS errors. Resolved by adding a global CORS configuration in Spring Security's filter chain.

**3. Package Naming Issues**
Spring Boot's component scan failed silently due to inconsistent package naming across modules. Resolved by aligning all package declarations under a single root package.

**4. JPA Relationship Management**
Managing bidirectional entity relationships carefully to avoid data integrity issues and recursive fetch problems in Hibernate queries.

### Key Learnings

- Designing RESTful APIs with proper HTTP methods and status codes
- Managing JPA entity lifecycles and relationships in Spring Boot
- Building a React SPA with Axios, React Router, and Context API
- Debugging full-stack applications across multiple layers
- Importance of consistent project structure and naming conventions
- Separation of concerns between frontend and backend



## 👨‍💻 Author

**Swetam Kumar**
B.Tech Computer Science | Graduation 2027

- 🔗 [LinkedIn](www.linkedin.com/in/swetam-kumar-15a15a289)
- 💻 [GitHub](https://github.com/SwetamKumar)
- 📧 Kumarswetam389@example.com



## 📄 License

This project is licensed under the MIT License — see the [LICENSE] file for details.

---

> ⭐ If you found this project useful or interesting, please give it a star! It helps a lot.
