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
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMzRkNmIwLTZmN2ItNDAzMi1hZDY5LWRkMzE4MWJmMzNjMSIsInVzZXJuYW1lIjoiZHJhZGFwZGFwIiwiZW1haWwiOiJkLnJhaWhhbjIwMDNAZ21haWwuY29tIiwicm9sZSI6IjMxNTFlN2QwLTRhODEtNDA0Mi1iZTg3LTc3MGE2ZTU4NjVjYiIsImlhdCI6MTcxOTg5MTQwMCwiZXhwIjoxNzE5ODkyMDAwfQ.GEH5penoTlUhC64AuR6RVCysRG7KNqi62N4GNJz0Eek"
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


**Get Quiz From Materi**

Endpoint : GET /quiz/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)


Response Body (succes) :

```
{
    "msg": "Query Successfully",
    "data": [
        {
            "soal_id": "0aac1758-2d32-4d65-a1ef-a743a3a0e074",
            "soal": "apakah ini berhasil3",
            "pilihan": [
                {
                    "id": "d7e0e70d-c008-43b2-8304-1aba05a02b75",
                    "jawaban": "iya"
                },
                {
                    "id": "9e90e256-384e-46ec-84c8-d7ae8c237dba",
                    "jawaban": "no"
                }
            ]
        },
        {
            "soal_id": "bc71d7e8-2425-4940-ae76-dd7c76273ed1",
            "soal": "apakah ini berhasil",
            "pilihan": [
                {
                    "id": "0a001fa0-76cd-447f-abb7-1bb6b2cd542c",
                    "jawaban": "iya"
                },
                {
                    "id": "ddaa9a64-93dc-444f-b588-f144cab3d14f",
                    "jawaban": "tidak"
                }
            ]
        },
        {
            "soal_id": "ea2e23c8-b430-4541-b960-b40de909e6d7",
            "soal": "apakah ini berhasil2",
            "pilihan": [
                {
                    "id": "a4129e6e-d19c-4837-a08d-faaeeba45d38",
                    "jawaban": "iya"
                },
                {
                    "id": "73abd396-ba3b-474a-88d4-d13542a9290c",
                    "jawaban": "tidak"
                }
            ]
        }
    ]
}
```

Response Body (failed) :

*Not Valid UUID*

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi must be a valid UUID",
    "data": "Your Data Not Valid"
}
```

*Wrong id_materi*

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Quiz Not Found",
    "data": "Check Your Id Materi"
}

```

