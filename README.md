# Flask + React CRUD Project

This project is built as part of the Associate Software Engineer (Python/React) Assessment.

It demonstrates:
- Flask Backend with CRUD APIs for Tasks and Comments
- Automated Tests for API endpoints
- React Frontend for managing tasks and comments

## Setup Instructions

### Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```
Runs at: http://localhost:5000

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Runs at: http://localhost:5173

### API Endpoints

#### Tasks
- GET /api/tasks/
- POST /api/tasks/
- PUT /api/tasks/<id>
- DELETE /api/tasks/<id>

#### Comments
- GET /api/comments/<task_id>
- POST /api/comments/<task_id>
- PUT /api/comments/<id>
- DELETE /api/comments/<id>

### Tests
```bash
cd backend
pytest
```

