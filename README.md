**API DOCUMENTATION**


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
*Email Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Email harus valid",
    "data": "Your Data Not Valid"
}
```

*Account Not Found*
```
{
    "status": "error",
    "statusCode": 404,
    "message": "Tidak ada akun yang ditemukan"
}
```

*Wrong Password*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password Salah"
}
```

*Password Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password dibutuhkan",
    "data": "Your Data Not Valid"
}
```
*Password Kurang dari 6 karakter*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password harus lebih dari 6 karakter",
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
    "message": "Email ini sudah terdaftar"
}
```
*Email Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Email harus valid",
    "data": "Your Data Not Valid"
}
```

*Username Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "username dibutuhkan",
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
    "message": "Username harus punya 6-30 karakter",
    "data": "Your Data Not Valid"
}
```
*Password And Re-Typed Password Not Match*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Passwords tidak sama",
    "data": "Your Data Not Valid"
}
```
*Password Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password dibutuhkan",
    "data": "Your Data Not Valid"
}
```

**Materi**

**Get All Materi**

Endpoint : GET /materis

Authorization Type Bearer Token : "Access Token"

Request Query: (kategori) (uuid) WAJIB!


Response Body (succes) :

```
{
    "msg": "Successfully retrieved materi",
    "data": [
        {
            "phase": 1,
            "materi": [
                {
                    "id": "d2bf909e-9f05-45bf-a55b-f2b8b6d47e3f",
                    "judul": "tesupdate",
                    "sudah_mengambil": true,
                    "tingkat": 1,
                    "quiz": [
                        {
                            "nilai": 100,
                            "lulus": true
                        }
                    ]
                },
                {
                    "id": "9a88cc44-8d18-4464-9664-2281c236ace8",
                    "judul": "tes456",
                    "sudah_mengambil": true,
                    "tingkat": 2,
                    "quiz": null
                },
                {
                    "id": "68fb6898-5563-466a-ab33-8afbbb47103c",
                    "judul": "tes789",
                    "sudah_mengambil": false,
                    "tingkat": 3,
                    "quiz": null
                }
            ],
            "ujian": [
                {
                    "id": "697b4576-18b3-45e9-9dc7-ba05f7b20090",
                    "riwayat": null
                }
            ],
            "locked": false
        },
        {
            "phase": 2,
            "materi": [
                {
                    "id": "2fc63e29-be4a-401f-b89a-aa423c4d8a36",
                    "judul": "ini materi 2\n",
                    "sudah_mengambil": false,
                    "tingkat": 1,
                    "quiz": null
                },
                {
                    "id": "9941495a-2536-4144-b566-a95c527abe58",
                    "judul": "tes789",
                    "sudah_mengambil": false,
                    "tingkat": 2,
                    "quiz": null
                }
            ],
            "ujian": [
                {
                    "id": "c8ce88e1-0432-47fa-b032-8851aeb4608a",
                    "riwayat": null
                }
            ],
            "locked": true
        }
    ]
}
```

Response Body (failed) :

*Not Valid Request Query kategori UUID*

```
{
    "status": "error",
    "statusCode": 400,
    "message": "kategori harus valid UUID",
    "data": "Your Data Not Valid"
}
```
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```


**Get Spesific Materi**

Endpoint : GET /materi/:id_materi

Authorization Type Bearer Token : "Access Token"

Request params: (id_materi) (uuid) WAJIB!


Response Body (succes) :

```
{
    "msg": "Successfully retrieved materi",
    "data": [
        {
            "id": "d2bf909e-9f05-45bf-a55b-f2b8b6d47e3f",
            "phase": 1,
            "judul": "tesupdate",
            "isi": "rokok",
            "linkvideo": "linkVideo",
            "kategori": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
            "created_at": "2024-07-01T13:21:34.556Z",
            "tingkat": 1,
            "id_quiz":"d2bf909e-9f05-45bf-a55b-f2b8b6d47e3f"
        }
    ]
}
```

Response Body (failed) :

*Not Valid Request Query id_materi UUID*

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi harus valid UUID",
    "data": "Your Data Not Valid"
}
```
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```


**User Access Materi**

Endpoint : POST /selectMateri/:id_materi

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
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```



**QUIZ**

**User Take Quiz**

Endpoint : POST /quiz/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)


Response Body (succes) :

```
{
    "msg": "Query Successfully",
    "data": {
        "id_mengambil_quiz": [
            {
                "id": "db8e5cd9-5b56-4aaf-aeb5-407b4b15b4a7"
            }
        ]
    }
}
```
Response Body (failed) :

*Not Authorize to take this quiz*
```
{
    "status": "error",
    "statusCode": 401,
    "message": "Get The Previously Quiz First"
}
```
*Quiz for that materi not make it yet*
```
{
    "status": "error",
    "statusCode": 404,
    "message": "Quiz not found for the given materi"
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
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
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
    "message": "id_materi harus valid UUID",
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
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
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
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```
**Ujian**

**User Take Ujian**

Endpoint : POST /ujian/:id_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_ujian) (uuid)


Response Body (succes) :

```
{
    "msg": "Query Successfully",
    "data": {
        "id_mengambil_ujian": [
            {
                "id": "db8e5cd9-5b56-4aaf-aeb5-407b4b15b4a7"
            }
        ]
    }
}
```
Response Body (failed) :

*Not Authorize to take this quiz*
```
{
    "status": "error",
    "statusCode": 401,
    "message": "You are not authorized to access the exam"
}
```

*Not Valid id_ujian*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_ujian harus valid UUID",
    "data": "Your Data Not Valid"
}
```
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```


**Get Ujian**

Endpoint : GET /ujian/:id_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_ujian) (uuid)


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
    "message": "id_ujian harus valid UUID",
    "data": "Your Data Not Valid"
}
```

*Wrong id_ujian*

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Ujian Not Found",
    "data": "Check Your Id Ujian"
}

```
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```


**Get Nilai Ujian User**

Endpoint : GET /ujian/nilai/:id_mengambil_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_ujian) (uuid)

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
    "message": "id_mengambil_ujian must be a valid UUID",
    "data": "Your Data Not Valid"
}
```

*Wrong id_mengambil_ujian*

```
{
    "status": "error",
    "statusCode": 404,
    "message": "History Not Found",
    "data": "Check Your id_mengambil_ujian"
}

```
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```

**JAWABAN**

**Jawaban Quiz**
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
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```
**Jawaban Ujian**
Endpoint : POST /ujian/cek/:id_mengambil_ujian

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

*Not Valid UUID (id_mengambil_ujian)*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_ujian must be a valid UUID",
    "data": "Your Data Not Valid"
}
```
*Wrong id_mengambil_ujian*
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
        "detail": "Key (quiz_diambil)=(ed93f954-6d40-40a9-b315-121b9bd4e662) is not present in table \"mengambilujian\".",
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
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```


**ADMIN**

**UPDATE MATERI**

Endpoint : PATCH /admin/materi/:id_materi

Request Params : id_materi (uuid)

Request Body :

```
{
    "judul": "tesupdate",
    "isi": "rokok",
    "linkVideo": "linkVideo"
}
```

Response Body (succes) :
```
{
    "msg": "Successfully Update materi"
}
```

Response Body (failed) : 
*id_materi Not Found on database*
```
{
    "status": "error",
    "statusCode": 500,
    "message": "Failed to Update materi to database"
}
```
*id_materi Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "id harus valid UUID",
    "data": "Your Data Not Valid"
}
```
*judul Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "judul dibutuhkan",
    "data": "Your Data Not Valid"
}
```
*isi Not Valid*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "isi dibutuhkan",
    "data": "Your Data Not Valid"
}
```

*LinkVideo Not Found*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "linkVideo dibutuhkan",
    "data": "Your Data Not Valid"
}
```
*Wrong Authorization Token*

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Your Token is Expired"
}

```