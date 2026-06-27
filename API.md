# REST API Documentation (Ziptrrip Assessment)

Base URL: `http://localhost:5000/api`

Standard Error Response Envelope:
```json
{
  "success": false,
  "message": "Error description message"
}
```

---

## Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/todos` | Get all todos (supports search, status filter, sorting) |
| `GET` | `/todos/:id` | Get single todo by ID |
| `POST` | `/todos` | Create a new todo |
| `PUT` | `/todos/:id` | Update a todo by ID |
| `DELETE` | `/todos/:id` | Delete a todo by ID |

---

## Endpoint Details

### 1. Get All Todos
- **Method**: `GET`
- **URL**: `/todos`
- **Query Parameters**:
  - `search` (optional): Search string matching title or description.
  - `status` (optional): Filter status (`all`, `completed`, `pending`).
  - `sort` (optional): Sort order (`latest`, `oldest`).
- **Success Response** (`200 OK`):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "667d4b2e8a1f3c0012a45bc8",
      "title": "Setup CI/CD Pipeline",
      "description": "Configure GitHub Actions workflow for automated testing.",
      "completed": false,
      "priority": "High",
      "dueDate": "2026-07-01T00:00:00.000Z",
      "createdAt": "2026-06-27T09:00:00.000Z",
      "updatedAt": "2026-06-27T09:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Todo
- **Method**: `GET`
- **URL**: `/todos/:id`
- **Success Response** (`200 OK`):
```json
{
  "success": true,
  "data": {
    "id": "667d4b2e8a1f3c0012a45bc8",
    "title": "Setup CI/CD Pipeline",
    "description": "Configure GitHub Actions workflow for automated testing.",
    "completed": false,
    "priority": "High",
    "dueDate": "2026-07-01T00:00:00.000Z",
    "createdAt": "2026-06-27T09:00:00.000Z",
    "updatedAt": "2026-06-27T09:00:00.000Z"
  }
}
```
- **Error Response** (`404 Not Found`):
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

### 3. Create Todo
- **Method**: `POST`
- **URL**: `/todos`
- **Request Body**:
```json
{
  "title": "Design Database Schema",
  "description": "Define Mongoose schema models and relationships.",
  "priority": "High",
  "dueDate": "2026-07-05T00:00:00.000Z"
}
```
- **Success Response** (`201 Created`):
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": "667d4c1f8a1f3c0012a45bc9",
    "title": "Design Database Schema",
    "description": "Define Mongoose schema models and relationships.",
    "completed": false,
    "priority": "High",
    "dueDate": "2026-07-05T00:00:00.000Z",
    "createdAt": "2026-06-27T09:10:00.000Z",
    "updatedAt": "2026-06-27T09:10:00.000Z"
  }
}
```
- **Error Response** (`400 Bad Request`):
```json
{
  "success": false,
  "message": "Title is required and must be at least 3 characters long"
}
```

---

### 4. Update Todo
- **Method**: `PUT`
- **URL**: `/todos/:id`
- **Request Body**:
```json
{
  "completed": true
}
```
- **Success Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "id": "667d4c1f8a1f3c0012a45bc9",
    "title": "Design Database Schema",
    "description": "Define Mongoose schema models and relationships.",
    "completed": true,
    "priority": "High",
    "dueDate": "2026-07-05T00:00:00.000Z",
    "createdAt": "2026-06-27T09:10:00.000Z",
    "updatedAt": "2026-06-27T09:15:00.000Z"
  }
}
```

---

### 5. Delete Todo
- **Method**: `DELETE`
- **URL**: `/todos/:id`
- **Success Response** (`200 OK`):
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```
