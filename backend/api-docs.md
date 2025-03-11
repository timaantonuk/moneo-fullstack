# 📌 API Documentation

## 🔹 Authentication

### ✅ Register User
**POST** `/api/auth/register`
- **Body (JSON):**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "message": "Register success!"
}
```

### ✅ Login
**POST** `/api/auth/login`
- **Body (JSON):**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "token": "eyJhbGciOiJI...",
  "user": { "fullName": "John Doe", "email": "john@example.com" }
}
```

## 🔹 Transactions

### ✅ Add Transaction
**POST** `/api/transactions`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Body (JSON):**
```json
{
  "type": "expense",
  "amount": 100,
  "category": "Food",
  "emoji": "🍔",
  "description": "Dinner"
}
```
- **Response:**
```json
{
  "message": "Transaction added successfully!"
}
```

### ✅ Get All Transactions
**GET** `/api/transactions`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Response:**
```json
[
  {
    "_id": "transactionId",
    "userId": "userId",
    "type": "expense",
    "amount": 100,
    "category": "Food",
    "emoji": "🍔",
    "color": "#F39C12",
    "description": "Dinner",
    "date": "2024-05-01T12:00:00.000Z"
  }
]
```

### ✅ Update Transaction
**PUT** `/api/transactions/:id`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Body (JSON):**
```json
{
  "amount": 120,
  "description": "Dinner with friends"
}
```
- **Response:**
```json
{
  "message": "Transaction updated successfully!"
}
```

### ✅ Delete Transaction
**DELETE** `/api/transactions/:id`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Response:**
```json
{
  "message": "Transaction deleted successfully!"
}
```

## 🔹 Financial Goals

### ✅ Create Goal
**POST** `/api/goals`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Body (JSON):**
```json
{
  "title": "Buy a car",
  "targetAmount": 10000
}
```
- **Response:**
```json
{
  "message": "Goal created successfully!"
}
```

### ✅ Get All Goals
**GET** `/api/goals`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Response:**
```json
[
  {
    "_id": "goalId",
    "userId": "userId",
    "title": "Buy a car",
    "targetAmount": 10000,
    "savedAmount": 0,
    "isCompleted": false,
    "createdAt": "2024-05-01T12:00:00.000Z"
  }
]
```

### ✅ Update Goal
**PUT** `/api/goals/:id`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Body (JSON):**
```json
{
  "savedAmount": 5000
}
```
- **Response:**
```json
{
  "message": "Goal updated successfully!"
}
```

### ✅ Delete Goal
**DELETE** `/api/goals/:id`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Response:**
```json
{
  "message": "Goal deleted successfully!"
}
```

## 🔹 Profile Management

### ✅ Get Profile
**GET** `/api/profile`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Response:**
```json
{
  "_id": "userId",
  "fullName": "Tymofii",
  "email": "tymofii@example.com",
  "avatar": null,
  "language": "en",
  "createdAt": "2024-05-01T12:00:00.000Z"
}
```

### ✅ Update Profile
**PUT** `/api/profile`
- **Headers:**
```
Authorization: Bearer YOUR_TOKEN
```
- **Body (JSON):**
```json
{
  "fullName": "Tymofii Updated",
  "language": "ua",
  "avatar": "https://api.multiavatar.com/Tymofii.png"
}
```
- **Response:**
```json
{
  "message": "Profile updated successfully!"
}
```

---
📌 **Now the API is fully documented and ready for integration with the frontend!** 🚀

