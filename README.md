# ContractorHub

A full-stack SaaS platform designed to streamline job estimation and client management for construction companies. Built with modern web technologies to provide an intuitive, mobile-responsive experience for contractors and field workers.

## Overview

ContractorHub helps construction companies manage their entire workflow from initial client contact through project completion. The platform provides tools for creating detailed estimates, maintaining customer relationships, and generating professional documentation.

## Main Functionality

### Estimates Management
- Create, edit, and track project estimates with detailed breakdowns
- Organize work by area and description with customizable line items
- Add multiple work types including exterior and interior projects
- Track estimate status from draft to completion
- Include notes and additional information for each estimate

### Customer Management  
- Maintain a central customer database with full contact details
- Store complete address and location information
- Edit customer information when creating new estimates
- View customer history across all related estimates

### Status Tracking
- Monitor estimates through six distinct stages
- Draft, pending, accepted, declined, in progress, and completed states
- Visual status indicators with color coding for quick identification
- Filter and search estimates by status

### User Interface
- Clean, professional design optimized for field use
- Responsive layout that works on desktop, tablet, and mobile devices
- Intuitive navigation with sidebar menu
- Dark and light mode support
- Accessible design following WCAG guidelines

### Data Persistence
- Customer snapshots preserve client information at time of estimate creation
- Full estimate history with creation and update timestamps
- Secure data storage with proper authentication and authorization

## Screenshots

![Dashboard View](path/to/dashboard-screenshot.png)
*Main dashboard showing estimates overview*

![Create Estimate](path/to/create-estimate-screenshot.png)
*Estimate creation form with customer information and project details*

![Estimate Details](path/to/estimate-details-screenshot.png)
*Detailed estimate view with customer snapshot and work items*

## Tech Stack

### Backend
- Python with Flask framework
- SQLAlchemy for database ORM
- JWT authentication using Flask-JWT-Extended
- SQLite for development, PostgreSQL for production
- Argon2 for secure password hashing

### Frontend
- Next.js 14 with TypeScript
- React Server Components
- Tailwind CSS for styling
- React Hook Form for form management
- TanStack Query for data fetching
- Sonner for toast notifications

## Getting Started

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/contractor-hub.git
   cd contractor-hub
   ```

2. Set up the backend
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

3. Set up the frontend
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Access the application
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:3000

## Development

### Project Structure
```
contractor-hub/
├── backend/          # Python Flask API
│   ├── routes/       # API endpoints
│   ├── models/       # Database models
│   └── config/       # Configuration
├── frontend/         # Next.js application
│   ├── src/
│   │   ├── app/      # App routes and API
│   │   ├── components/  # React components
│   │   └── lib/      # Shared utilities
│   └── public/       # Static assets
```

### Database
The application uses SQLite for development. The database is automatically created on first run. Tables include Users, Companies, Customers, Estimates, and related models.

### Authentication
JWT tokens are used for secure authentication. Users must log in to access the application, and all API requests require valid authentication tokens.

## Features in Development

- PDF export functionality for estimates
- Advanced search and filtering
- Customer communication logging
- Invoice generation
- Mobile app using React Native

## License

This project is proprietary software. All rights reserved.
