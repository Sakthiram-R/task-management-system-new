# 📋 Task Management System

A full-stack CRUD application built with **React**, **Django REST Framework**, and **MySQL**. This project demonstrates industry-standard practices for building scalable web applications.

## 🎯 Features

✅ **CRUD Operations**
- Create new tasks
- Read/View all tasks with pagination
- Update existing tasks
- Delete tasks

✅ **Advanced Features**
- Mark tasks as completed/pending
- Filter by status (All, Pending, Completed)
- Search tasks by title and description
- Task priority levels (Low, Medium, High)
- Due date management
- Task statistics and progress tracking
- Responsive mobile-friendly UI

✅ **Technical Highlights**
- RESTful API with Django REST Framework
- React functional components with Hooks
- Comprehensive error handling
- Form validation on frontend and backend
- Loading states and user feedback
- Pagination with customizable page size
- CORS enabled for cross-origin requests
- MySQL database with optimized indexes

## 📋 Project Structure

```
task-management-system/
├── backend/                          # Django Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── taskproject/
│   │   ├── settings.py              # Django settings with CORS & DB config
│   │   ├── urls.py                  # Main URL router
│   │   └── wsgi.py
│   └── tasks/                       # Main App
│       ├── models.py                # Task Model
│       ├── serializers.py           # DRF Serializers
│       ├── views.py                 # API ViewSets
│       ├── urls.py                  # App URL routes
│       └── migrations/
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx         # Create/Update form
│   │   │   ├── TaskList.jsx         # Task list with pagination
│   │   │   ├── TaskItem.jsx         # Individual task card
│   │   │   ├── FilterBar.jsx        # Filter & search
│   │   │   └── LoadingSpinner.jsx
│   │   ├── services/
│   │   │   └── api.js               # Axios API client
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskList.css
│   │   │   └── TaskItem.css
│   │   ├── App.jsx                  # Main component
│   │   └── main.jsx                 # React entry point
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── database/
│   └── schema.sql                   # MySQL schema
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+)
- **Python** (v3.8+)
- **MySQL** (v5.7+)
- **Git**

### Backend Setup

#### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Setup Database
```bash
# Create MySQL database
mysql -u root -p < ../database/schema.sql

# Or manually create:
# CREATE DATABASE task_management_db;
```

#### 4. Configure Environment Variables
Create `.env` file in backend directory:
```env
SECRET_KEY=your-secret-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_ENGINE=django.db.backends.mysql
DB_NAME=task_management_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
```

#### 5. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 6. Create Superuser (Optional - for Admin Panel)
```bash
python manage.py createsuperuser
```

#### 7. Start Django Server
```bash
python manage.py runserver
```

Server will run at: `http://localhost:8000`

---

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Configure Environment Variables
Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:8000/api
```

#### 3. Start Development Server
```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 📡 API Endpoints

### Base URL: `http://localhost:8000/api`

#### Task Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/tasks/` | Get all tasks (with pagination & filtering) |
| **POST** | `/tasks/` | Create new task |
| **GET** | `/tasks/{id}/` | Get specific task |
| **PUT** | `/tasks/{id}/` | Update task |
| **PATCH** | `/tasks/{id}/` | Partially update task |
| **DELETE** | `/tasks/{id}/` | Delete task |
| **POST** | `/tasks/{id}/mark_complete/` | Mark task as complete |
| **POST** | `/tasks/{id}/mark_incomplete/` | Mark task as incomplete |
| **GET** | `/tasks/statistics/` | Get task statistics |

#### Query Parameters

```
GET /tasks/?page=1&status=pending&search=title&ordering=-created_at

Parameters:
- page: Page number (default: 1)
- status: Filter by status (pending/completed)
- search: Search by title or description
- ordering: Sort by field (-created_at, due_date, priority)
```

---

## 🧪 API Testing with Postman

### 1. Create Task
```
POST http://localhost:8000/api/tasks/
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management system",
  "priority": "high",
  "due_date": "2026-03-15T10:00:00Z"
}
```

### 2. Get All Tasks
```
GET http://localhost:8000/api/tasks/
```

### 3. Get Specific Task
```
GET http://localhost:8000/api/tasks/1/
```

### 4. Update Task
```
PUT http://localhost:8000/api/tasks/1/
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": false,
  "priority": "medium"
}
```

### 5. Delete Task
```
DELETE http://localhost:8000/api/tasks/1/
```

### 6. Mark as Complete
```
POST http://localhost:8000/api/tasks/1/mark_complete/
```

### 7. Mark as Incomplete
```
POST http://localhost:8000/api/tasks/1/mark_incomplete/
```

### 8. Filter by Status
```
GET http://localhost:8000/api/tasks/?status=pending
GET http://localhost:8000/api/tasks/?status=completed
```

### 9. Search Tasks
```
GET http://localhost:8000/api/tasks/?search=project
```

### 10. Get Statistics
```
GET http://localhost:8000/api/tasks/statistics/
```

---

## 🐛 Common Issues & Troubleshooting

### Issue 1: CORS Error
```
Error: Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
- Ensure `CORS_ALLOWED_ORIGINS` in `settings.py` includes your frontend URL
- Check that `corsheaders` middleware is installed and configured

### Issue 2: Database Connection Error
```
Error: (1045, "Access denied for user 'root'@'localhost'")
```

**Solution:**
- Verify MySQL is running: `mysql -u root -p`
- Check DB credentials in `.env` file
- Ensure database exists: `CREATE DATABASE task_management_db;`

### Issue 3: Port Already in Use
```
Error: Port 8000 is already in use
```

**Solution:**
```bash
# Kill process on port 8000 (Linux/macOS)
lsof -ti:8000 | xargs kill -9

# Change port (Windows)
python manage.py runserver 8001

# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue 4: Module Not Found
```
Error: ModuleNotFoundError: No module named 'rest_framework'
```

**Solution:**
```bash
pip install -r requirements.txt
```

### Issue 5: React Not Compiling
```
Error: Cannot find module 'react'
```

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security Best Practices

### Backend
- ✅ Change `SECRET_KEY` in production
- ✅ Set `DEBUG=False` in production
- ✅ Use environment variables for sensitive data
- ✅ Configure `ALLOWED_HOSTS` properly
- ✅ Enable HTTPS in production
- ✅ Use strong database passwords
- ✅ Implement rate limiting for APIs
- ✅ Add authentication if needed

### Frontend
- ✅ Never hardcode API credentials
- ✅ Use environment variables for API URLs
- ✅ Validate form inputs on client side
- ✅ Sanitize user inputs
- ✅ Use HTTPS for API calls

---

## 📦 Deployment Guide

### Deploy Django to Heroku

#### 1. Install Heroku CLI
```bash
brew install heroku/brew/heroku  # macOS
# or download from heroku.com
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
cd backend
heroku create your-app-name
```

#### 4. Add Procfile
```
web: gunicorn taskproject.wsgi
```

#### 5. Install Production Dependencies
```bash
pip install gunicorn
pip freeze > requirements.txt
```

#### 6. Configure Environment Variables
```bash
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DEBUG=False
heroku config:set ALLOWED_HOSTS=your-app-name.herokuapp.com
```

#### 7. Push to Heroku
```bash
git push heroku main
```

#### 8. Run Migrations
```bash
heroku run python manage.py migrate
```

### Deploy React to Vercel

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy Frontend
```bash
cd frontend
vercel
```

#### 4. Configure Environment Variables
In Vercel dashboard:
- Settings → Environment Variables
- Add `VITE_API_URL=https://your-heroku-app.herokuapp.com/api`

#### 5. Redeploy
```bash
vercel --prod
```

---

## 📊 Database Schema

### Task Table
```sql
CREATE TABLE tasks_task (
  id: BigAutoField (Primary Key)
  title: CharField(255) - Required
  description: TextField - Optional
  status: BooleanField (0=Pending, 1=Completed) - Default: False
  priority: CharField - Options: (low, medium, high)
  due_date: DateTimeField - Optional
  created_at: DateTimeField - Auto-generated
  updated_at: DateTimeField - Auto-updated
);

Indexes:
- status (for filtering)
- created_at (for sorting)
- status + created_at (composite index)
- priority
- due_date
```

---

## 🔄 Data Flow

```
User Action (Frontend)
         ↓
React Component Updates State
         ↓
Axios API Call (HTTP Request)
         ↓
Django URL Router
         ↓
ViewSet Handler
         ↓
Serializer Validation
         ↓
Model Operation (Create/Read/Update/Delete)
         ↓
MySQL Database
         ↓
Response sent back to Frontend
         ↓
Component Re-renders with New Data
```

---

## 📝 Technologies Used

### Backend
- **Django** 4.2 - Web Framework
- **Django REST Framework** 3.14 - REST API
- **django-cors-headers** - CORS Support
- **MySQL Connector** - Database Driver
- **Python Dotenv** - Environment Management

### Frontend
- **React** 18.2 - UI Library
- **Vite** - Build Tool
- **Axios** - HTTP Client
- **CSS3** - Styling (No Framework)

### Database
- **MySQL** 5.7+ - Relational Database

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:

✅ Full-stack web development concepts  
✅ RESTful API design principles  
✅ Django ORM and database modeling  
✅ React Hooks and component lifecycle  
✅ State management in React  
✅ Form validation and error handling  
✅ HTTP requests with Axios  
✅ MySQL indexing and query optimization  
✅ CORS and security best practices  
✅ Deployment strategies  

---

## 📞 Support

For issues, questions, or suggestions:
1. Check the [Troubleshooting](#-common-issues--troubleshooting) section
2. Review API documentation
3. Check browser console for errors
4. Review terminal output for backend errors

---

## 📜 License

This project is open source and available under the MIT License.

---

## 🚀 Next Steps

To enhance this project further, consider adding:

- [ ] User authentication & authorization
- [ ] Task categories/tags
- [ ] Task comments and attachments
- [ ] Recurring tasks
- [ ] Task reminders/notifications
- [ ] Dark mode
- [ ] Export tasks to PDF/CSV
- [ ] Task analytics dashboard
- [ ] Real-time updates with WebSockets
- [ ] Unit & integration tests

---

**Built with ❤️ by Your Development Team**