# Bug Tracker

A full-stack bug tracking system built with **Next.js**, **React**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**. The application streamlines the software testing workflow by allowing teams to report, assign, manage, and validate software defects through a role-based workflow.

The system also integrates **Google Gemini AI** to automatically classify ticket severity when it is not manually specified by the user.

---

## Features

- JWT Authentication
- Role-Based Access Control (RBAC)
- User Management
- Project Management
- Ticket Management
- Ticket History
- Dashboard with Software Quality Metrics
- AI-Powered Severity Classification
- PDF Report Generation
- Responsive User Interface

---

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Prisma ORM

### Database

- PostgreSQL

### Charts

- Recharts

### Artificial Intelligence

- Google Gemini API

---

## Installation

Clone the repository.

```bash
git clone https://github.com/your-username/bug-tracker.git
```

Navigate to the project directory.

```bash
cd bug-tracker
```

Install the dependencies.

```bash
npm install
```

or

```bash
pnpm install
```

Run the development server.

```bash
npm run dev
```

or

```bash
pnpm dev
```

---

## User Roles

### Administrator

- Manage users
- Manage projects
- Manage tickets
- View all tickets
- Access global dashboard metrics
- Generate PDF reports

### QA Tester

- View assigned tickets
- Validate bug fixes
- Reopen tickets when necessary
- Close verified tickets

### Developer

- View assigned tickets
- Update ticket status
- Upload technical evidence
- Resolve reported issues

---

## Ticket Workflow

```text
Bug Report
    │
    ▼
Severity Selected?
    │
 ┌──┴──┐
 │     │
Yes    No
 │      │
 ▼      ▼
Save   Google Gemini
        Predicts Severity
        │
        ▼
    Ticket Created
        │
        ▼
Assigned to Developer
        │
        ▼
Developer Fixes Issue
        │
        ▼
QA Validation
        │
   ┌────┴────┐
   │         │
Closed   Reopened
```

---

## Dashboard

The dashboard provides real-time software quality metrics, including:

- Open Tickets
- Critical Tickets
- Tickets Under Review
- Mean Time To Resolution (MTTR)
- Ticket Trends
- Severity Distribution
- Most Affected Modules
- Recent Tickets

---

## Project Structure

```text
app/
components/
actions/
lib/
prisma/
public/
types/
```

---

## Future Improvements

- Email notifications
- File attachments
- Kanban board
- Advanced filtering
- Audit logs
- Real-time notifications
- Multi-tenant support

---

## License

This project was developed as part of a Software Engineering internship project.
