# Lumos - Memorial Page Writing Assistant

An empathetic AI assistant to help friends and family find the right words when creating obituaries and condolence messages for memorial pages.

## About

Lumos helps people express their grief and give comfort to others during difficult times. The application guides users through a series of thoughtful questions to generate meaningful, personalized content for memorial pages - whether writing an obituary or a condolence message. The AI-generated text serves as a compassionate starting point that users can then edit, extend, and refine to truly capture their feelings and memories.

## Tech Stack

- **Frontend**: React 18
- **Backend**: Spring Boot 3.2
- **Database**: PostgreSQL 16
- **Containerization**: Docker & Docker Compose

## Project Structure

```
.
├── backend/                 # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/               # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Start all services:
```bash
docker-compose up --build
```

2. Access the applications:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - PostgreSQL: localhost:5432

### Stopping the Application

```bash
docker-compose down
```

To remove volumes as well:
```bash
docker-compose down -v
```

## Services

### Frontend (React)
- Runs on port 3000
- Nginx serves the built React app
- Proxies API requests to backend

### Backend (Spring Boot)
- Runs on port 8080
- REST API endpoint: `/api/health`
- Connects to PostgreSQL database

### Database (PostgreSQL)
- Runs on port 5432
- Database: `appdb`
- User: `postgres`
- Password: `postgres`

## Development

### Running Services Individually

**Backend (requires Java 17 and Maven):**
```bash
cd backend
mvn spring-boot:run
```

**Frontend (requires Node.js 18+):**
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Notes

- The frontend includes a health check that connects to the backend
- Database data persists in a Docker volume
- All services run in a shared Docker network
