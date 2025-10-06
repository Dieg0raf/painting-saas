# ContractorHub

A full-stack SaaS platform designed to streamline job estimation and client management for construction companies. Built with modern web technologies to provide an intuitive, mobile-responsive experience for contractors and field workers.

## 🚀 Features

### Core Functionality
- **Job Estimation Management** - Create, edit, and track project estimates
- **Client Relationship Management** - Maintain customer database and communication history
- **PDF Generation** - Export professional estimates and invoices
- **Mobile-Responsive Design** - Access from any device in the field

### Technical Features
- **Secure Authentication** - JWT-based user authentication
- **Real-time Updates** - Live data synchronization across devices
- **Data Export** - PDF generation for estimates and reports
- **Responsive UI** - Optimized for desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend
- **Flask** - Python web framework
- **PostgreSQL** - Production-ready database
- **JWT** - Secure authentication
- **Python** - PDF generation and business logic

### Frontend
- **Next.js** - React framework with SSR
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type-safe development

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 13+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dieg0raf/contractor-hub
   cd contractor-hub
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb contractor_hub
   python setup_database.py
   ```

## 🏗️ Architecture
