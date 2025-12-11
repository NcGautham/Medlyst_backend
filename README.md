# Medlyst Backend

The REST API server for the Medlyst doctor appointment booking platform. Built with Node.js, Express, and PostgreSQL.

## Features

-   **Doctor Management**: Endpoints to list, create, and get details of doctors.
-   **Slot Management**: Handle time slot availability and booking capacity.
-   **Booking System**: Process and store user appointments.
-   **Admin API**: Protected routes for administrative tasks.

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: PostgreSQL
-   **Tools**: Nodemon, Dotenv, Cors

## API Endpoints

### Public
-   `GET /doctors`: List all doctors
-   `GET /doctors/:id`: Get specific doctor details and available slots
-   `GET /slots`: List all slots

### Admin
-   `POST /admin/doctors`: Create a new doctor
-   `POST /admin/slots`: Create time slots
-   `DELETE /admin/doctors/:id`: Delete a doctor and associated data

### Bookings
-   `POST /bookings`: Create a new appointment

## Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file with your database configuration:
    ```
    DB_USER=your_user
    DB_HOST=localhost
    DB_NAME=medlyst
    DB_PASSWORD=your_password
    DB_PORT=5432
    PORT=5001
    ```

3.  **Run Migrations**
    Ensure your PostgreSQL database is running and reachable. The app handles basic schema creation on startup or via `migrations/init.sql`.

4.  **Start Server**
    ```bash
    npm run dev
    ```

The server runs on port `5001` by default.

---
&copy; 2025 Medlyst. All rights reserved.
