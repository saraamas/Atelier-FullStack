# 🚗 CarsApp

CarsApp is a full-stack web application for managing car-related services, built with **Spring Boot** for the backend and **ReactJS** for the frontend. The application is containerized using **Docker**, and the services are orchestrated via **Docker Compose**.

## 🏗️ Project Architecture

The CarsApp project follows a microservices architecture consisting of the following components:

- **Backend**: Spring Boot service handling the business logic and data access.
- **Frontend**: ReactJS application providing an intuitive user interface for interacting with the car services.
- **PostgreSQL**: Database service to store and manage data for the application.
- **Prometheus & Grafana**: Monitoring and visualization tools to track the health and performance of the services.

## 📦 Docker Setup

All services are containerized and defined in the `docker-compose.yml` file.

### Services

- **Backend**
  - Framework: Spring Boot
  - Build Path: `./carsapp-backend`
  - Port: `8080`
  - Environment variables:
    - `POSTGRES_HOST`: Connection to the PostgreSQL service
    - `POSTGRES_USER`: `postgres`
    - `POSTGRES_PASSWORD`: `admin`
    
- **Frontend**
  - Framework: ReactJS
  - Build Path: `./app-frontt`
  - Port: `3000`
  - Depends on the backend service.

- **PostgreSQL**
  - Database: `compagnie`
  - User: `postgres`
  - Password: `admin`
  - Port: `5432`
  - Volume: Persistent storage for database data.

- **Prometheus**
  - Port: `9090`
  - Used for monitoring and gathering metrics.

- **Grafana**
  - Port: `3001`
  - User: `admin`
  - Password: `admin123`
  - Depends on Prometheus for data visualization.

### Networks

All services are connected via the `app-network` to allow seamless communication between containers.

### Volumes

- `pgdata`: Persistent volume for PostgreSQL data.

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/saraamas/Atelier-FullStack.git
   cd Atelier-FullStack


2. **Access the application:**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:8080](http://localhost:8080)
    - Grafana: [http://localhost:3001](http://localhost:3001) (Username: `admin`, Password: `admin123`)
    - Prometheus: [http://localhost:9090](http://localhost:9090)


🔧 **Configuration**

Make sure to configure the environment variables correctly:


1. **Build Backend Docker Image**:  
   Navigate to the backend directory and build the Docker image for the Spring Boot application:

    ```bash
    cd CarsApp-Backend
    docker build -t carsApp-backend .
    ```

2. **Build Frontend Docker Image**:  
   Navigate to the frontend directory and build the Docker image for the ReactJS application:

    ```bash
    cd app-front
    docker build -t carsapp-frontend .

3. **Database (PostgreSQL)**:  
  Ensure the correct database and user credentials are defined:

    ```yaml
    environment:
      POSTGRES_DB: compagnie
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin
    ```

4. **Build and run the containers using Docker Compose:**

    ```bash
    docker-compose up --build
    ```

   To shut down the services:

    ```bash
    docker-compose down
    ```


---

🛠️ **Technologies Used**

- **Backend**: Spring Boot
- **Frontend**: ReactJS
- **Database**: PostgreSQL
- **Monitoring**: Prometheus, Grafana
- **Orchestration**: Docker Compose

---

📊 **Monitoring and Visualization**

- **Prometheus**: Used to scrape metrics from various services and monitor their performance.
- **Grafana**: Dashboards for visualizing Prometheus metrics, making it easy to monitor the health of the system.

---

🧩 **Future Improvements**

- Add authentication and authorization using Spring Security and JWT.
- Improve the frontend design with Material UI.
- Scale the services for production environments with Kubernetes.
