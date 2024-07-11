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

**Materi**

**User Access Materi**

Endpoint : POST /quiz/cek/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)


Response Body (succes) :

```
{
    "msg": "Successfully Add User Access",
    "data": [
        {
            "id": "bafec599-8581-4eda-8118-534a2b2de81c"
        }
    ]
}
```
Response Body (failed) :

*Wrong id_materi*
```
{
    "status": "error",
    "statusCode": 500,
    "message": "Internal Server Error",
    "data": {
        "length": 295,
        "name": "error",
        "severity": "ERROR",
        "code": "23503",
        "detail": "Key (materi)=(d2bf909e-9f05-45bf-a55b-f2b8b6d47e4f) is not present in table \"materi\".",
        "schema": "public",
        "table": "mengambil_materi",
        "constraint": "materi_to_access",
        "file": "ri_triggers.c",
        "line": "2619",
        "routine": "ri_ReportViolation"
    }
}
```
*Not Valid id_materi*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi must be a valid UUID",
    "data": "Your Data Not Valid"
}
```



**QUIZ**

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


**Get Nilai Quiz User**

Endpoint : GET /quiz/nilai/:id_mengambil_quiz

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_quiz) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Successfully",
    "data": {
        "nilai": 67
    }
}
```

Response Body (failed) :

*Not Valid UUID*

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_quiz must be a valid UUID",
    "data": "Your Data Not Valid"
}
```

*Wrong id_mengambil_quiz*

```
{
    "status": "error",
    "statusCode": 404,
    "message": "History Not Found",
    "data": "Check Your id materi"
}

```

**JAWABAN**

Endpoint : POST /quiz/cek/:id_mengambil_quiz

Authorization Type Bearer Token : "Access Token"

Request Body :

```
{
    "id_soal":"cad44221-6199-4f05-91d8-e24824f0bb5d",
    "id_jawaban":"513bd973-3f5f-4730-b8f5-f0c980e9c1b3"
}
```

Response Body (succes) :

```
{
    "msg": "Jawaban Berhasil DiPeriksa",
    "data": {
        "hasil": false
    }
}
```

Response Body (failed) : 

*Not Valid UUID (id_mengambil_quiz)*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_quiz must be a valid UUID",
    "data": "Your Data Not Valid"
}
```
*Wrong id_mengambil_quiz*
```
{
    "status": "error",
    "statusCode": 500,
    "message": "Internal Server Error",
    "data": {
        "length": 316,
        "name": "error",
        "severity": "ERROR",
        "code": "23503",
        "detail": "Key (quiz_diambil)=(ed93f954-6d40-40a9-b315-121b9bd4e662) is not present in table \"mengambilquiz\".",
        "schema": "public",
        "table": "jawabanquizuser",
        "constraint": "quiz_to_mengambilquiz",
        "file": "ri_triggers.c",
        "line": "2619",
        "routine": "ri_ReportViolation"
    }
}
```
*Wrong id_soal*
```
{
    "status": "error",
    "statusCode": 404,
    "message": "Soal not found"
}
```
*Not Valid UUID (id_soal)*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_soal must be a valid UUID",
    "data": "Your Data Not Valid"
}
```

*Not Valid UUID (id_jawaban)*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_jawaban must be a valid UUID",
    "data": "Your Data Not Valid"
}
```
*Wrong id_jawaban*
```
{
    "status": "error",
    "statusCode": 500,
    "message": "Internal Server Error",
    "data": {
        "length": 316,
        "name": "error",
        "severity": "ERROR",
        "code": "23503",
        "detail": "Key (jawaban_user)=(513bd973-3f5f-4730-b8f5-f0c980e9c1b8) is not present in table \"jawabansoal\".",
        "schema": "public",
        "table": "jawabanquizuser",
        "constraint": "jawabanuser_to_jawaban",
        "file": "ri_triggers.c",
        "line": "2619",
        "routine": "ri_ReportViolation"
    }
}
```