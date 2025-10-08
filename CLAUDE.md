# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lumos is an empathetic AI assistant for memorial pages that helps friends and family write obituaries and condolence messages. The application guides users through questions to generate meaningful, personalized content that serves as a starting point for expressing grief and comfort.

## Architecture

**Full-stack application:**
- **Frontend**: React 18 (served via Nginx in production)
- **Backend**: Spring Boot 3.2 with Java 17
- **Database**: PostgreSQL 16
- **Deployment**: Docker Compose (separate dev and prod configurations)

**Communication:**
- Frontend makes API calls to backend through `/api/*` endpoints
- In Docker, frontend nginx proxies API requests to backend
- Frontend uses `REACT_APP_API_URL` environment variable for API endpoint configuration

**Package structure (backend):**
- `com.example.backend` - Main application package
- `com.example.backend.controller` - REST controllers

## Development Commands

### Local Development (with Docker)
```bash
# Start all services (frontend, backend, postgres)
docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

**Service endpoints:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- PostgreSQL: localhost:5432 (db: appdb, user: postgres, pass: postgres)

### Backend Development (requires Java 17 & Maven)
```bash
cd backend

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Build
mvn clean package
```

### Frontend Development (requires Node.js 18+)
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Production Deployment

**AWS EC2 deployment:**
```bash
# Deploy to production (uses docker-compose.prod.yml)
./deploy.sh

# Manual deployment steps
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

**Environment configuration:**
- Copy `.env.example` to `.env` and configure for production
- Update database password in production environment
- The deploy script pulls from `master` branch

## Database

**Configuration:**
- Hibernate auto-update enabled (`spring.jpa.hibernate.ddl-auto=update`)
- SQL logging enabled in development
- PostgreSQL dialect with JPA/Hibernate
- Data persists in Docker volume `postgres_data`
