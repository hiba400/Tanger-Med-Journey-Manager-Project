# Tanger Med Journey Manager

**React | Express | MongoDB | Material UI**

A comprehensive journey management system for Tanger Med logistics operations, featuring multi-user role management, real-time request tracking, and administrative oversight capabilities.

## Project Overview

Tanger Med Journey Manager is a full-stack web application designed to streamline logistics operations by managing truck journeys, driver assignments, passenger requests, and administrative oversight. The system provides role-based access for administrators, drivers, and passengers with distinct interfaces for each user type.

### Business Context

This system addresses the operational needs of logistics management in port and industrial environments, where efficient coordination between drivers, passengers, and administrators is critical for smooth operations. The application enables real-time request submission, approval workflows, and comprehensive tracking of journey history.

### Key Features

- **Multi-User System**: Role-based access for Admin, Driver, and Passenger
- **Admin Dashboard**: Comprehensive oversight of all operations
- **Driver Management**: Create, update, and manage driver profiles
- **Truck Management**: Track and manage vehicle fleet
- **Request Management**: Handle journey requests with approval workflows
- **Request History**: Complete audit trail of all journey requests
- **Passenger Management**: Manage passenger profiles and requests
- **Authentication System**: Secure login with password change functionality
- **Real-time API Testing**: Built-in API testing tools for development
- **Database Fallback**: In-memory database fallback when MongoDB is unavailable

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19.1.1, Material UI 7.2.0, React Router DOM 7.7.1 |
| **Backend** | Express 4.21.2, Node.js |
| **Database** | MongoDB Atlas with Mongoose 8.16.4 |
| **Styling** | Tailwind CSS, Framer Motion |
| **HTTP Client** | Axios, Fetch API |
| **State Management** | React Context API |
| **Icons** | Font Awesome, Heroicons, Lucide React |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React + MUI)                       │
│                     http://localhost:3000                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTP/REST API
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Express API)                         │
│                    http://localhost:5000                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              MongoDB Atlas (Primary) / In-Memory DB (Fallback)    │
└─────────────────────────────────────────────────────────────────┘
```

## Repository Structure

```text
Tanger-Med-Journey-Manager-Project/
├── backend/                        # Express.js backend application
│   ├── models/                    # Mongoose data models
│   │   ├── Admin.js              # Admin user model
│   │   ├── Driver.js             # Driver model
│   │   ├── Passenger.js          # Passenger model
│   │   ├── Request.js            # Journey request model
│   │   ├── RequestHistory.js     # Request history model
│   │   └── Truck.js              # Truck model
│   ├── routes/                    # Express API routes
│   │   ├── Admin.js              # Admin authentication & management
│   │   ├── Driver.js             # Driver CRUD operations
│   │   ├── Passenger.js          # Passenger CRUD operations
│   │   ├── Request.js            # Request management
│   │   ├── RequestHistory.js     # Request history tracking
│   │   └── Truck.js              # Truck management
│   ├── utils/                     # Utility functions
│   │   ├── adminAuth.js          # Admin authentication middleware
│   │   └── memoryDB.js           # In-memory database fallback
│   ├── server.js                 # Main server entry point
│   ├── package.json              # Backend dependencies
│   └── .env.example              # Environment configuration template
├── frontend/                       # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   ├── APITest.js        # API testing component
│   │   │   ├── ChangePassword.jsx # Password change form
│   │   │   ├── ProtectedRoute.jsx # Authentication wrapper
│   │   │   └── ...               # Other UI components
│   │   ├── contexts/             # React Context providers
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── layouts/              # Layout components
│   │   │   └── authentication/   # Authentication layouts
│   │   ├── pages/                # Page components
│   │   │   ├── BreakdownAdminDashboard.jsx
│   │   │   ├── DriverManagement.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RequestManagement.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── TruckManagement.jsx
│   │   ├── services/             # API service layer
│   │   │   ├── api.js            # Axios-based API client
│   │   │   ├── apiFetch.js       # Fetch-based API client
│   │   │   └── apiTest.js        # API testing utilities
│   │   ├── App.js                # Main React application
│   │   ├── routes.js             # React Router configuration
│   │   └── index.js              # Application entry point
│   ├── public/                   # Static assets
│   │   ├── img/                  # Images and logos
│   │   └── index.html            # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   └── .env.example              # Environment configuration template
├── start-app.sh                   # Application startup script
├── start-tm-journey.sh            # Journey manager startup script
└── README.md                      # This file
```

## Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (for production deployment)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy example environment file
   cp .env.example .env
   
   # Edit .env with your MongoDB Atlas connection string
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

4. **Start backend server**
   ```bash
   npm start
   ```

   Backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:5000" > .env
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   Frontend will start on `http://localhost:3000`

### Quick Start

Use the provided startup scripts:

```bash
# Start both frontend and backend
./start-app.sh

# Or start journey manager specifically
./start-tm-journey.sh
```

## Usage

### Admin Access

1. Navigate to `http://localhost:3000`
2. Click "Login" and enter admin credentials
3. Access the dashboard to manage:
   - Drivers
   - Trucks
   - Requests
   - Request history
   - System settings

### API Endpoints

#### Authentication
- `POST /admin/login` - Admin login
- `PATCH /admin/change-password` - Change admin password

#### Drivers
- `GET /driver` - Get all drivers
- `POST /driver` - Create new driver
- `PUT /driver/:id` - Update driver
- `DELETE /driver/:id` - Delete driver

#### Trucks
- `GET /truck` - Get all trucks
- `POST /truck` - Create new truck
- `PUT /truck/:id` - Update truck
- `DELETE /truck/:id` - Delete truck

#### Requests
- `GET /request` - Get all requests
- `POST /request` - Create new request
- `PUT /request/:id` - Update request
- `DELETE /request/:id` - Delete request

#### Passengers
- `GET /passenger` - Get all passengers
- `POST /passenger` - Create new passenger
- `PUT /passenger/:id` - Update passenger
- `DELETE /passenger/:id` - Delete passenger

#### Request History
- `GET /request-history` - Get request history
- `POST /request-history` - Add to history

For detailed API documentation, see `frontend/API_INTEGRATION_README.md`

## Database Schema

### Admin
- `name`: String (required)
- `email`: String
- `password`: String
- `phone`: String (required, Moroccan phone format validation)

### Driver
- Name, contact information, license details
- Truck assignment
- Availability status

### Passenger
- Name, contact information
- Request history

### Request
- Journey details
- Driver assignment
- Passenger information
- Status (pending, approved, completed, cancelled)

### Truck
- Registration number
- Capacity
- Status (available, in-use, maintenance)

## Security Considerations

**Important**: This is an academic/development project. For production deployment, implement:

- **JWT Authentication**: Implement token-based authentication with refresh tokens
- **Rate Limiting**: Implement API rate limiting
- **CORS Configuration**: Restrict CORS to specific origins
- **HTTPS/TLS**: Use HTTPS in production
- **Environment Variables**: Never commit .env files to version control
- **MongoDB Security**: Use MongoDB Atlas security features (IP whitelisting, authentication)
- **Session Management**: Implement secure session management
- **CSRF Protection**: Add CSRF tokens for state-changing operations

**Current Implementation Notes**:
- ✅ Passwords are hashed using bcrypt (10 salt rounds)
- ✅ Password comparison uses bcrypt for authentication
- ✅ Basic input validation for critical endpoints
- ✅ MongoDB credentials moved to environment variables
- ⏳ Basic authentication without JWT tokens (planned)
- ⏳ No rate limiting (planned)
- ⏳ In-memory database fallback for development convenience

## Troubleshooting

### Backend Won't Start

1. Check Node.js version (18+ required)
2. Verify MongoDB Atlas connection string in .env
3. Ensure port 5000 is not in use
4. Check MongoDB Atlas cluster status

### Frontend Won't Start

1. Check Node.js version (18+ required)
2. Ensure dependencies are installed
3. Verify REACT_APP_API_URL in .env
4. Check port 3000 is not in use

### Database Connection Issues

1. Verify MongoDB Atlas connection string
2. Check MongoDB Atlas cluster status
3. Ensure IP whitelist includes your IP address
4. Application will fallback to in-memory DB if MongoDB is unavailable

### API Connection Errors

1. Ensure backend is running on port 5000
2. Check CORS configuration
3. Verify REACT_APP_API_URL in frontend .env
4. Check browser console for specific error messages

## Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Admin Authentication | ✅ Complete | Login with password change |
| Driver Management | ✅ Complete | Full CRUD operations |
| Truck Management | ✅ Complete | Full CRUD operations |
| Request Management | ✅ Complete | Full CRUD operations |
| Passenger Management | ✅ Complete | Full CRUD operations |
| Request History | ✅ Complete | Audit trail |
| Admin Dashboard | ✅ Complete | Comprehensive overview |
| Profile Management | ✅ Complete | User profile settings |
| Settings Page | ✅ Complete | System configuration |
| API Testing Tools | ✅ Complete | Built-in testing |
| Password Hashing | ✅ Complete | bcrypt with 10 salt rounds |
| JWT Authentication | ⏳ Not Implemented | Basic auth only |
| Input Validation | ✅ Basic | Critical endpoints validated |
| Rate Limiting | ⏳ Not Implemented | No rate limiting |

## Future Enhancements

- Implement password hashing with bcrypt
- Add JWT token-based authentication
- Implement comprehensive input validation
- Add rate limiting for API endpoints
- Real-time notifications with WebSockets
- Mobile-responsive optimization
- Advanced analytics and reporting
- PDF generation for journey reports
- Email notifications for request updates
- Integration with external logistics systems
- Multi-language support
- Advanced search and filtering
- Export data to CSV/Excel

## Development Tools

### API Testing

The application includes built-in API testing tools:
- Navigate to the APITest component
- Test all endpoints with a single click
- Test custom endpoints with custom payloads
- Verify API connectivity and responses

### Authentication Testing

Test authentication workflows:
- Admin login
- Password change functionality
- Protected route access

## License

No license has been selected for this project. All rights reserved to the author.

## Author

**Hiba Ben Adou**

Computer Engineering Student – ENSA Tangier

This project demonstrates full-stack MERN development with React, Express, MongoDB, and Material UI, featuring role-based access control, RESTful API design, and comprehensive logistics management capabilities.
