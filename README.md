# Backend Developer Intern Assignment  
## Scalable REST API with Authentication & Role-Based Access

---

## Project Overview

This project implements a secure and scalable REST API using Django and Django Ninja, along with a React frontend interface to interact with the APIs.

The system includes:

- User registration and login
- JWT-based authentication
- Role-based access control (Admin / User)
- CRUD operations for tasks
- API versioning
- Swagger documentation
- Structured logging
- Modular and scalable architecture

---

## Tech Stack

### Backend
- Python 3.11
- Django
- Django Ninja
- Django Ninja JWT
- PostgreSQL (configurable)
- django-cors-headers

### Frontend
- React (Vite)
- Axios
- Custom CSS

---

## Features

### Authentication
- Secure password hashing
- JWT access token generation
- Protected endpoints using JWTAuth
- Token-based frontend authentication

### Role-Based Access Control

Admin:
- View all tasks
- Update/Delete any task

User:
- View only own tasks
- Update/Delete only own tasks

---

## API Endpoints

Base URL:

```

/api/v1/

```

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login and receive JWT |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks/` | List tasks |
| POST | `/tasks/` | Create task |
| PUT | `/tasks/{id}/` | Update task |
| DELETE | `/tasks/{id}/` | Delete task |

Note: PUT and DELETE require trailing slash.

---

## API Documentation

Swagger UI is available at:

```

http://127.0.0.1:8000/api/docs (Since default port for django is 8000)

```

---

## Project Structure

### Backend

```

backend/
│── config/
│── apps/
│   ├── users/
│   ├── tasks/
│── logs/
│   └── app.log
│── manage.py
│── requirements.txt

```

### Frontend

```

frontend/
│── src/
│   ├── api/
│   ├── context/
│   ├── pages/
│   ├── components/
│   ├── index.css

```

---

## Backend Setup

### 1. Create Virtual Environment

```

python -m venv venv
venv\Scripts\activate

```

### 2. Install Dependencies

```

pip install -r requirements.txt

````

### 3. Configure Database

Update `config/settings.py`:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "db_name",
        "USER": "postgres",
        "PASSWORD": "password",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
````

SQLite can be used for local testing if required.

---

### 4. Run Migrations

```
python manage.py makemigrations
python manage.py migrate
```

### 5. Run Development Server

```
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

### 1. Install Dependencies

```
cd frontend
npm install
```

### 2. Run Development Server

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Logging

The application includes structured logging.

Logs are written to:

```
backend/logs/app.log
```
You can see the example logs of this task [here](https://github.com/Vinu-bhandary/backend-task/tree/main/backend/logs)

Logging includes:

* API access
* Task creation
* Task updates
* Task deletion
* Unauthorized access attempts
* Errors

Log configuration is defined in `settings.py` using Django’s built-in logging framework.

---

## Security Practices

* Django password hashing
* JWT-based authentication
* Role-based authorization checks
* Input validation using Pydantic schemas
* CORS restricted to frontend origin
* Indexed foreign keys for performance
* Separation of concerns via modular apps

---

## Scalability Considerations

* Modular architecture (Users and Tasks apps)
* API versioning (`/api/v1/`)
* Logging support
