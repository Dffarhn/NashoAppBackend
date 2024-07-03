**USER**

**Login**

Endpoint : POST /login

Request Body :

```
{
    "email":"d.raihan2004@gmail.com",
    "password":"dapa123"
}
```

Response Body (succes) :

```
{
    "msg": "Login successful",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0ZjhjY2ViLWEyNjQtNDU0Ny1iODk0LWM4M2E3ZGQ1NWJhNyIsInVzZXJuYW1lIjoiZGFwYXBwcHBwcCIsImVtYWlsIjoiZC5yYWloYW4yMDA0QGdtYWlsLmNvbSIsInJvbGUiOiIzMTUxZTdkMC00YTgxLTQwNDItYmU4Ny03NzBhNmU1ODY1Y2IiLCJpYXQiOjE3MTk4ODk5MzQsImV4cCI6MTcxOTg5MDUzNH0.75MVcrEf7GDzm98qCcpzAxoKi07UAaGzHaOMIRDIHIY"
}
```

Response Body (failed) : 

*Account Not Found*
```
{
    "status": "error",
    "statusCode": 404,
    "message": "No account found with that email"
}
```

*Wrong Password*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Incorrect password"
}
```
*Email Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Must be a valid email",
    "data": "Your Data Not Valid"
}
```

*Password Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password is required",
    "data": "Your Data Not Valid"
}
```

**REGISTER**

Endpoint : POST /register

Request Body :

```
{
    "email":"d.raihan2003@gmail.com",
    "password":"dapa123",
    "retyped-password":"dapa123",
    "username":"dradapdap"
}
```

Response Body (succes) :

```
{
    "msg": "Registration successful",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMzRkNmIwLTZmN2ItNDAzMi1hZDY5LWRkMzE4MWJmMzNjMSIsInVzZXJuYW1lIjoiZHJhZGFwZGFwIiwiZW1haWwiOiJkLnJhaWhhbjIwMDNAZ21haWwuY29tIiwicm9sZSI6IjMxNTFlN2QwLTRhODEtNDA0Mi1iZTg3LTc3MGE2ZTU4NjVjYiIsImlhdCI6MTcxOTg5MTQwMCwiZXhwIjoxNzE5ODkyMDAwfQ.GEH5penoTlUhC64AuR6RVCysRG7KNqi62N4GNJz0Eek",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMzRkNmIwLTZmN2ItNDAzMi1hZDY5LWRkMzE4MWJmMzNjMSIsInVzZXJuYW1lIjoiZHJhZGFwZGFwIiwiZW1haWwiOiJkLnJhaWhhbjIwMDNAZ21haWwuY29tIiwicm9sZSI6IjMxNTFlN2QwLTRhODEtNDA0Mi1iZTg3LTc3MGE2ZTU4NjVjYiIsImlhdCI6MTcxOTg5MTQwMCwiZXhwIjoxNzE5OTc3ODAwfQ.enZRmRmWj62FXv56o6XKvNeyHu1-SBEMav4XruOEADU"
    }
}
```

Response Body (failed) : 

*Email Account Already Exist*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Email already exists"
}
```
*Email Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Must be a valid email",
    "data": "Your Data Not Valid"
}
```

*Username Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "username is required",
    "data": "Your Data Not Valid"
}
```
*Username Kurang Dari 6 dan Lebih Dari 30 Karakter*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Username must be between 6 and 30 characters",
    "data": "Your Data Not Valid"
}
```

*Password Karakter Kurang Dari 6*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password must be at least 6 characters",
    "data": "Your Data Not Valid"
}
```
*Password And Re-Typed Password Not Match*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Passwords do not match",
    "data": "Your Data Not Valid"
}
```
*Password Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password is required",
    "data": "Your Data Not Valid"
}
```