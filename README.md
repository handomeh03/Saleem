# 🏥 SaleemCare — Health Clinic & Admin Dashboard

A modern, full-stack healthcare management application built with **Next.js, NestJS, Prisma, Neon PostgreSQL, and Tailwind CSS**.

SaleemCare provides a centralized platform for managing doctors, schedules, patient appointments, and appointment tracking. It features secure role-based access control (RBAC), API rate limiting, and a responsive interface designed for administrators and patients.

🌐 **Live Demo:** [SaleemCare](https://saleem-22v9.onrender.com/)

---

## 🚀 Key Features

### 🔐 Authentication & Security
- **JWT Authentication:** Secure authentication using JSON Web Tokens.
- **Role-Based Access Control (RBAC):** Role-specific access for administrators, doctors, and patients.
- **Protected Routes:** Frontend route protection and layout-level access guards.
- **API Rate Limiting:** Server-side request throttling using NestJS Throttler to help prevent API abuse.
- **Input Validation:** Type-safe form validation using React Hook Form and Zod.

### 🛠️ Admin Dashboard
- **Doctor Management:** Manage doctor profiles, specializations, and account statuses.
- **Schedule Management:** Configure date ranges and daily availability slots.
- **Appointment Management:** Search and track appointments using patient codes or doctor names.
- **Server-Side Pagination:** Efficiently navigate appointment records.
- **Availability Controls:** View schedules through an interactive accordion interface and switch availability between `Available` and `Closed`.

### 🩺 Patient Portal
- **Appointment Tracking:** Track appointment status using a unique patient code, such as `PAT-6731`.
- **Appointment Details:** View the assigned doctor, specialization, scheduled date, and time.
- **Medical Notes:** Access relevant notes associated with the appointment.

### 🎨 Modern User Interface
- Responsive layouts for desktop and mobile devices.
- Reusable UI components, including loaders, pagination, and navigation elements.
- Interactive dashboards and forms.
- Tailwind CSS styling with Lucide React icons.
- Efficient server-state management with TanStack Query.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework and App Router |
| [React](https://react.dev/) | User interface development |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [TanStack Query](https://tanstack.com/query/latest) | Data fetching and server-state management |
| [React Hook Form](https://react-hook-form.com/) | Form management |
| [Zod](https://zod.dev/) | Schema validation |
| [Tailwind CSS](https://tailwindcss.com/) | Responsive styling |
| [Axios](https://axios-http.com/) | HTTP requests |
| [Lucide React](https://lucide.dev/) | Icons |

### Backend
| Technology | Purpose |
|---|---|
| [NestJS](https://nestjs.com/) | Backend API framework |
| [Prisma ORM](https://www.prisma.io/) | Database access and ORM |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [Neon](https://neon.tech/) | Serverless PostgreSQL hosting |
| JWT | Authentication |
| NestJS Guards | Authentication and authorization |
| NestJS Throttler | API rate limiting |

---

## 🏗️ Architecture & Project Structure

The application separates the frontend and backend into independent applications, with feature-based organization for easier maintenance and scalability.

```text
Saleem/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── auth/          # Authentication and JWT strategies
│       ├── common/        # Shared decorators, guards, and filters
│       ├── database/      # Prisma service and database configuration
│       ├── doctor/        # Doctor and schedule management
│       ├── patient/       # Patient records and appointment tracking
│       ├── security/      # Rate limiting and security configuration
│       └── main.ts        # Application entry point
│
└── frontend/
    ├── app/               # Next.js App Router pages
    ├── components/        # Shared and reusable UI components
    ├── config/            # Axios and API configuration
    └── features/          # Feature-based components and hooks
```

---

## ⚙️ Getting Started

Follow these steps to run SaleemCare locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- A PostgreSQL database, such as [Neon](https://neon.tech/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/saleem-care.git
cd Saleem
```

> Replace the repository URL with your actual GitHub repository URL.

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secure_jwt_secret"
```

Replace the placeholder values with your actual database connection string and a secure JWT secret.

### 3. Configure the Database

Run the Prisma migrations:

```bash
npx prisma migrate dev
```

If your project uses a different Prisma migration workflow, follow the commands configured for your existing schema and environment.

### 4. Start the Backend Server

```bash
npm run start:dev
```

The backend will run on the port configured in your NestJS application. The default NestJS development port is commonly `3000`.

### 5. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Make sure this URL matches your actual backend URL and API prefix configuration.

### 6. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically:

**http://localhost:3000**

> If the frontend and backend both use port `3000`, configure different ports to avoid conflicts. For example, run the backend on `3001` and update `NEXT_PUBLIC_API_URL` accordingly.

---

## 🌐 Deployment

SaleemCare is deployed using the following services:

- **Frontend & Backend:** Render
- **Database:** Neon Serverless PostgreSQL
- **Database Access:** Prisma ORM

Live application: [https://saleem-22v9.onrender.com/](https://saleem-22v9.onrender.com/)

For deployment, configure the required environment variables in the relevant Render services and ensure the backend can connect securely to the production database.

---

## 🔒 Security Considerations

- Keep database credentials and JWT secrets in environment variables.
- Never commit `.env` files or production credentials to GitHub.
- Configure appropriate JWT expiration and token validation.
- Apply authorization checks on the backend, not only in frontend route guards.
- Configure rate limits based on your application's expected traffic.
- Use HTTPS and secure production configuration.

---

## 🎯 Project Goals

SaleemCare aims to simplify clinic operations by providing:

- Centralized doctor and schedule management.
- Efficient appointment administration.
- Convenient patient appointment tracking.
- Secure, role-based access to application features.
- A maintainable and scalable full-stack architecture.

---

## 👨‍💻 Author

**Jameel Handoumeh**

Full Stack Software Engineer

- GitHub: [Add your GitHub profile](https://github.com/handomeh03)

---

⭐ If you find this project useful, consider giving it a star on GitHub!
