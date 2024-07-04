# Chapter 5 Challenge

### Skill Metrics

1. Express.js
2. Express.js with TypeScript
3. RestfulAPI
4. Database
5. Database: SQL

#### Requirements: Create an HTTP Server that can be used for car data management by admin, car rental by customer, and simple login for 'admin' and 'customer' roles.

## Entity Relationship Diagram

![challenge 6](https://github.com/nndakurnia/24001143-synrgy7-nan-bcr-ch5/assets/98036215/e4433ebe-eac0-46a6-9b23-f80837932b91)

The API consists of three main endpoints that provide different functions:

1. Authentication/Authorization API
2. Admin API
3. Customer API


**Base URL:**

> <http://localhost:${port}>


## 1. Authentication/Authorization API

This endpoint authenticates users by using email and password requests already in the database. This API implements token-based authentication using JSON Web Tokens (JWT) with authorization based on the role whether they are 'admin' or 'customer, which later each role can access the endpoint according to their authorization.

**Method:**

> POST

- **Login as Admin or Customer**

```bash
POST {{Host}}/api/auth/login
```

**Request Body**

```bash
{
  "email": "admin@gmail.com",
  "password": "12345678",
}
```

**Response:**

```JSON
{
  "message": "Success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzIwMDcxMjc3LCJleHAiOjE3MjAyNDQwNzd9.jI0gy7BMw4KUZ-2Nr_xlZkLzw3WzZOUOV7RJ1C_i1R8"
}
```


## 2. Admin API

To access the admin API, authorization as admin is required. The token, which is the response from the login endpoint, is used as the authorization header on each Admin endpoint. Admin can CRUD the rental car data and also update the rental status and payment of the rental made by the customer.

- **Request Header:**
  required on each endpoint

  | Key           | Value                  |
  | ------------- | ---------------------- |
  | Authorization | "Login response token" |


#### Cars Data Management (CRUD)

**Method:**

> GET

- **Show Cars List**

```bash
GET {{Host}}/api/admin/car
```

**Response:**

```JSON
{
  "message": "Success",
  "data": [
    {
      "id": 1,
      "plate": "DBH-3491",
      "name": "Ford F150",
      "image": "https://res.cloudinary.com/dpif60wfq/image/upload/v1717424041/kkxlm74oszbvxn3fthcv.jpg",
      "rent_cost": 200000,
      "capacity": 2,
      "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter",
      "transmission": "Automatic",
      "type": "Sedan",
      "year": 2022,
      "available_at": "2022-03-03T15:49:05.563Z",
      "is_available": true,
      "created_at": "2024-06-03T14:54:38.073Z",
      "updated_at": "2024-06-03T14:54:38.073Z"
    },
    {
      "id": 2,
      "plate": "WXB-3984",
      "name": "BMW X5",
      "image": "https://res.cloudinary.com/dpif60wfq/image/upload/v1717424042/zvtrast8nmig4lhvajoy.jpg",
      "rent_cost": 800000,
      "capacity": 6,
      "description": " Rear passenger map pockets. Electrochromic rearview mirror. Dual chrome exhaust tips. Locking glove box.",
      "transmission": "Automatic",
      "type": "Convertible",
      "year": 2019,
      "available_at": "2022-03-03T15:49:05.563Z",
      "is_available": false,
      "created_at": "2024-06-03T14:54:38.073Z",
      "updated_at": "2024-06-03T14:54:38.073Z"
    },
    {
      "id": 3,
      "plate": "OSL-4224",
      "name": "Lincoln MKZ",
      "image": "https://res.cloudinary.com/dpif60wfq/image/upload/v1717424039/grklg1nwu0nv3xzj7nh9.jpg",
      "rent_cost": 900000,
      "capacity": 6,
      "description": " Driver & front passenger map pockets. Direct-type tire pressure monitor system. Cargo area lamp. Glove box lamp.",
      "transmission": "Automanual",
      "type": "Sedan",
      "year": 2021,
      "available_at": "2022-03-04T15:49:05.563Z",
      "is_available": true,
      "created_at": "2024-06-03T14:54:38.073Z",
      "updated_at": "2024-06-03T14:54:38.073Z"
    },
  ]
}
```

- **Show Car By Id**

```bash
GET {{Host}}/api/admin/car/1
```

**Response:**

```JSON
{
  "message": "Success",
  "findData": {
    "id": 1,
    "plate": "DBH-3491",
    "name": "Ford F150",
    "image": "https://res.cloudinary.com/dpif60wfq/image/upload/v1717424041/kkxlm74oszbvxn3fthcv.jpg",
    "rent_cost": 200000,
    "capacity": 2,
    "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "transmission": "Automatic",
    "type": "Sedan",
    "year": 2022,
    "available_at": "2022-03-03T15:49:05.563Z",
    "is_available": true,
    "created_at": "2024-06-03T14:54:38.073Z",
    "updated_at": "2024-06-03T14:54:38.073Z"
  }
}
```

- **Filter Car By Query Name and Type**

```bash
GET {{Host}}/api/admin/car?type=sedan&name=ford
```

**Response:**

```JSON
{
  "message": "Success",
  "data": [
    {
      "id": 1,
      "plate": "DBH-3491",
      "name": "Ford F150",
      "image": "https://res.cloudinary.com/dpif60wfq/image/upload/v1717424041/kkxlm74oszbvxn3fthcv.jpg",
      "rent_cost": 200000,
      "capacity": 2,
      "description": " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter",
      "transmission": "Automatic",
      "type": "Sedan",
      "year": 2022,
      "available_at": "2022-03-03T15:49:05.563Z",
      "is_available": true,
      "created_at": "2024-06-03T14:54:38.073Z",
      "updated_at": "2024-06-03T14:54:38.073Z"
    }
  ]
}
```

**Method:**

> POST

- **Adding Car Data**

```bash
POST {{Host}}/api/admin/car
```

**Request Body**

```bash
{
  "plate": "NHI-3883",
  "name": "Nissan Pathfiner",
  "image": ((file upload))
  "rent_cost": "600000",
  "capacity": "6",
  "description": " 200mm front axle. Roof mounted antenna. Cargo compartment cover. Rear bench seat -inc: (3) adjustable headrests.",
  "transmission": "Automatic",
  "type": "Sedan",
  "year": "2022",
  "available_at": "2024-06-04T13:18:00.104Z",
}
```

**Response:**

```JSON
{
  "message": "Car added successfully!",
  "data": {
    "id": 14,
    "plate": "NHI-3883",
    "name": "Nissan Pathfiner",
    "rent_cost": "600000",
    "capacity": "6",
    "description": " 200mm front axle. Roof mounted antenna. Cargo compartment cover. Rear bench seat -inc: (3) adjustable headrests.",
    "transmission": "Automatic",
    "type": "Sedan",
    "year": "2022",
    "available_at": "2024-06-04T13:18:00.104Z",
    "is_available": true,
    "created_at": "2024-06-03T13:18:00.104Z",
    "updated_at": "2024-06-03T13:18:00.104Z",
    "image": "http://res.cloudinary.com/dpif60wfq/image/upload/v1720012698/yfxcnkg9qlq18tvlrdkw.jpg"
  }
}
```

**Method:**

> PATCH

- **Updating Car Data**

```bash
PATCH {{Host}}/api/admin/car/1
```

**Request Body**

```bash
{
  "rent_cost": 250000,
  "available_at": "2022-06-17T15:49:05.563Z",
}
```

**Response:**

```JSON
{
  "message":  "Car updated successfully!",
  "data": {
    "id": 14,
    "plate": "NHI-3883",
    "name": "Nissan Pathfiner",
    "rent_cost": "250000",
    "capacity": "6",
    "description": " 200mm front axle. Roof mounted antenna. Cargo compartment cover. Rear bench seat -inc: (3) adjustable headrests.",
    "transmission": "Automatic",
    "type": "Sedan",
    "year": "2022",
    "available_at": "2022-06-17T15:49:05.563Z",
    "is_available": true,
    "created_at": "2024-06-03T13:18:00.104Z",
    "updated_at": "2024-06-04T13:24:13.979Z",
    "image": "http://res.cloudinary.com/dpif60wfq/image/upload/v1720012698/yfxcnkg9qlq18tvlrdkw.jpg"
  }
}
```

**Method:**

> DELETE

- **Updating Car Data**

```bash
DELETE {{Host}}/api/admin/car/1
```

```JSON
{
  "message": "Car deleted successfully!"
}
```

#### Rental Management

> GET

- **Show Rental List**

```bash
GET {{Host}}/api/admin/rent
```

**Response:**

```JSON
{
  "message": "Success",
  "data": [
    {
      "id": 1,
      "user_id": 2,
      "car_id": 7,
      "start_date": "2024-06-15T17:00:00.000Z",
      "end_date": "2024-06-17T17:00:00.000Z",
      "status": "pending",
      "rental_cost": 900000,
      "payment_status": false,
      "created_at": "2024-06-03T14:54:38.085Z",
      "updated_at": "2024-06-03T14:54:38.085Z"
    },
    {
      "id": 2,
      "user_id": 2,
      "car_id": 5,
      "start_date": "2024-06-09T17:00:00.000Z",
      "end_date": "2024-06-10T17:00:00.000Z",
      "status": "cancelled",
      "rental_cost": 400000,
      "payment_status": false,
      "created_at": "2024-06-03T14:54:38.085Z",
      "updated_at": "2024-06-03T14:54:38.085Z"
    }
  ]
}
```

> GET

- **Show Rental By Id**

```bash
GET {{Host}}/api/admin/rent/1
```

**Response:**

```JSON
{
  "message": "Success",
  "findData": {
      "id": 1,
      "user_id": 2,
      "car_id": 7,
      "start_date": "2024-06-15T17:00:00.000Z",
      "end_date": "2024-06-17T17:00:00.000Z",
      "status": "pending",
      "rental_cost": 900000,
      "payment_status": false,
      "created_at": "2024-06-03T14:54:38.085Z",
      "updated_at": "2024-06-03T14:54:38.085Z"
  }
}
```

**Method:**

> PATCH

- **Updating Rental Status: 'Pending' || 'Confirmed' || 'Finished' || 'Canceled'**

```bash
PATCH {{Host}}/api/admin/rent/status/1
```

**Request Body**

```bash
{
  "status": "confirmed"
}
```

**Response:**

```JSON
{
  "message": "Success",
  "UpdatedData": {
    "status": "confirmed",
    "id": 1,
    "user_id": 2,
    "car_id": 7,
    "start_date": "2024-06-15T17:00:00.000Z",
    "end_date": "2024-06-17T17:00:00.000Z",
    "rental_cost": 900000,
    "payment_status": false,
    "created_at": "2024-06-03T14:54:38.085Z",
    "updated_at": "2024-06-03T14:54:38.085Z"
  }
}
```

**Method:**

> PATCH

- **Updating Rental Payment Status: true || false**

```bash
PATCH {{Host}}/api/admin/rent/payment/1
```

**Request Body**

```bash
{
  "payment_status": "true"
}
```

**Response:**

```JSON
{
  "message": "Success",
  "UpdatedData": {
    "payment_status": true,
    "id": 1,
    "user_id": 2,
    "car_id": 7,
    "start_date": "2024-06-15T17:00:00.000Z",
    "end_date": "2024-06-17T17:00:00.000Z",
    "status": "confirmed",
    "rental_cost": 900000,
    "created_at": "2024-06-03T14:54:38.085Z",
    "updated_at": "2024-06-03T14:54:38.085Z"
  }
}
```


## 3. Customer API

To access the customer API, authorization as customer is required. The token, which is the response from the login endpoint, is used as the authorization header on each customer endpoint. CUstomer can get their rental data and make new rent car.

**In this example, the customer login used is the user with ID 2**

- **Request Header:**
  required on each endpoint

  | Key           | Value                  |
  | ------------- | ---------------------- |
  | Authorization | "Login response token" |


**Method:**

> GET

- **Show Customer Rental List**

```bash
GET {{Host}}/api/customer/rent
```

**Response:**

```JSON
{
  "message": "Success",
  "findData": [
    {
      "id": 1,
      "user_id": 2,
      "car_id": 7,
      "start_date": "2024-06-15T17:00:00.000Z",
      "end_date": "2024-06-17T17:00:00.000Z",
      "status": "confirmed",
      "rental_cost": 900000,
      "payment_status": true,
      "created_at": "2024-06-03T14:54:38.085Z",
      "updated_at": "2024-06-03T14:54:38.085Z"
    },
    {
      "id": 2,
      "user_id": 2,
      "car_id": 5,
      "start_date": "2024-06-09T17:00:00.000Z",
      "end_date": "2024-06-10T17:00:00.000Z",
      "status": "cancelled",
      "rental_cost": 400000,
      "payment_status": false,
      "created_at": "2024-06-03T14:54:38.085Z",
      "updated_at": "2024-06-03T14:54:38.085Z"
    }
  ]
}
```

- **Show Customer Rental List By Id**

```bash
GET {{Host}}/api/customer/rent/1
```

**Response:**

```JSON
{
  "message": "Success",
  "findData": {
    "id": 1,
    "user_id": 2,
    "car_id": 7,
    "start_date": "2024-06-15T17:00:00.000Z",
    "end_date": "2024-06-17T17:00:00.000Z",
    "status": "confirmed",
    "rental_cost": 900000,
    "payment_status": true,
    "created_at": "2024-06-03T14:54:38.085Z",
    "updated_at": "2024-06-03T14:54:38.085Z"
  }
}
```

**Method:**

> POST

- **Create New Rental**

```bash
POST {{Host}}/api/customer/rent
```

**Request Body**

```bash
{
  "car_id": 6,
  "start_date": "2024-06-25T17:00:00.000Z",
  "end_date": "2024-06-27T17:00:00.000Z"
}
```

**Response:**

```JSON
{
  "message": "Rent added successfully!",
  "data": {
    "id": 4,
    "user_id": 2,
    "car_id": 6,
    "start_date": "2024-06-25T17:00:00.000Z",
    "end_date": "2024-06-27T17:00:00.000Z",
    "status": "pending",
    "rental_cost": 1800000,
    "payment_status": false,
    "created_at": "2024-06-04T04:20:15.616Z",
    "updated_at": "2024-06-04T04:20:15.616Z"
  }
}
```
