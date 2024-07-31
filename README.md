# **API Documentation**

**Created By: Dffarhn**

# USER

## Authentikasi

### Login

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
    "msg": "Login Sukses",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0ZjhjY2ViLWEyNjQtNDU0Ny1iODk0LWM4M2E3ZGQ1NWJhNyIsInVzZXJuYW1lIjoiZGFwYXBwcHBwcCIsImVtYWlsIjoiZC5yYWloYW4yMDA0QGdtYWlsLmNvbSIsInJvbGUiOiIzMTUxZTdkMC00YTgxLTQwNDItYmU4Ny03NzBhNmU1ODY1Y2IiLCJpYXQiOjE3MTk4ODk5MzQsImV4cCI6MTcxOTg5MDUzNH0.75MVcrEf7GDzm98qCcpzAxoKi07UAaGzHaOMIRDIHIY"
}
}
```

Response Body (failed) :
_Email Not Valid_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Email harus valid",
    "data": "Data Tidak Valid"
}
```

_Account Not Found_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Tidak ada akun yang ditemukan"
}
```

_Wrong Password_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password Salah"
}
```

_Password Kosong_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_Password Kurang dari 6 karakter_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password harus lebih dari 6 karakter",
    "data": "Data Tidak Valid"
}
```

### REGISTER

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
    "msg": "Registration Sukses",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzMzRkNmIwLTZmN2ItNDAzMi1hZDY5LWRkMzE4MWJmMzNjMSIsInVzZXJuYW1lIjoiZHJhZGFwZGFwIiwiZW1haWwiOiJkLnJhaWhhbjIwMDNAZ21haWwuY29tIiwicm9sZSI6IjMxNTFlN2QwLTRhODEtNDA0Mi1iZTg3LTc3MGE2ZTU4NjVjYiIsImlhdCI6MTcxOTg5MTQwMCwiZXhwIjoxNzE5ODkyMDAwfQ.GEH5penoTlUhC64AuR6RVCysRG7KNqi62N4GNJz0Eek"
    }
}
```

Response Body (failed) :

_Email Account Already Exist_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Email ini sudah terdaftar"
}
```

_Email Not Valid_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Email harus valid",
    "data": "Data Tidak Valid"
}
```

_Username Kosong_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "username dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_Username Kurang Dari 6 dan Lebih Dari 30 Karakter_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Username harus punya 6-30 karakter",
    "data": "Data Tidak Valid"
}
```

_Password Karakter Kurang Dari 6_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password harus punya 6-30 karakter",
    "data": "Data Tidak Valid"
}
```

_Password And Re-Typed Password Not Match_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Passwords tidak sama",
    "data": "Data Tidak Valid"
}
```

_Password Kosong_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password dibutuhkan",
    "data": "Data Tidak Valid"
}
```

## Profile

### Get User Profile

Endpoint : GET /profile

Authorization Type Bearer Token : "Access Token"

Response Body (succes) :

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "email": "nasho@gmail.com",
            "username": "Nasho Update 2"
        }
    ]
}
```

Response Body (failed):

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Update User Profile

Endpoint : patch /profile

Authorization Type Bearer Token : "Access Token"

Request Body :

```
{
    "username":"Username"
}
```

Response Body (succes) :

```
{
    "msg": "Profile Updated Sukses",
    "data": {
        "email": "nasho@gmail.com",
        "username": "Username Nasho"
    }
}
```

Response Body (failed):

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Username Kosong_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "username dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_Username Kurang Dari 6 dan Lebih Dari 30 Karakter_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Username harus punya 6-30 karakter",
    "data": "Data Tidak Valid"
}
```

### Update Kata Sandi User

Endpoint : patch /profile/newpassword

Authorization Type Bearer Token : "Access Token"

Request Body :

```
{
    "OldPassword":"nashohebat",
    "password":"nashohebat123",
    "retyped-password":"nashohebat123"
}
```

Response Body (succes) :

```
{
    "msg": "Ganti Kata Sandi Sukses"
}
```

Response Body (failed):

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Old Password salah_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password Salah"
}
```

_Password Karakter Kurang Dari 6_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Username harus punya 6-30 karakter",
    "data": "Data Tidak Valid"
}
```

_Password And Re-Typed Password Not Match_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Passwords tidak sama",
    "data": "Data Tidak Valid"
}
```

_Password Kosong_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Password dibutuhkan",
    "data": "Data Tidak Valid"
}
```

## Materi

### Get All Materi

Endpoint : GET /materis

Authorization Type Bearer Token : "Access Token"

Request Query: (kategori) (uuid) WAJIB!

Response Body (succes) :

```
{
    "msg": "Sukses Menerima Materi",
    "data": [
        {
            "id": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
            "jenis": "Nahwu",
            "deskripsi": "Nahwu adalah ilmu yang mempelajari struktur kalimat dalam bahasa Arab. Fokus utama nahwu adalah bagaimana kata-kata disusun dalam sebuah kalimat agar sesuai dengan kaidah tata bahasa Arab. Nahwu mencakup aturan tentang posisi dan fungsi kata dalam kalimat, serta perubahan yang terjadi pada akhir kata karena posisi tersebut.",
            "materi": [
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
                            "quiz": [
                                {
                                    "nilai": 100,
                                    "lulus": true
                                }
                            ]
                        },
                        {
                            "id": "68fb6898-5563-466a-ab33-8afbbb47103c",
                            "judul": "tes789",
                            "sudah_mengambil": true,
                            "tingkat": 3,
                            "quiz": [
                                {
                                    "nilai": 50,
                                    "lulus": false
                                }
                            ]
                        }
                    ],
                    "ujian": [
                        {
                            "id": "697b4576-18b3-45e9-9dc7-ba05f7b20090",
                            "phase_ujian": 1,
                            "kategori_ujian": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
                            "riwayat": [
                                {
                                    "nilai": 100,
                                    "lulus": true
                                }
                            ]
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
                            "phase_ujian": 2,
                            "kategori_ujian": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
                            "riwayat": null
                        }
                    ],
                    "locked": true
                }
            ]
        }
    ]
}
```

Response Body (failed) :

_Not Valid Request Query kategori UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "kategori harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Spesific Materi

Endpoint : GET /materi/:id_materi

Authorization Type Bearer Token : "Access Token"

Request params: (id_materi) (uuid) WAJIB!

Response Body (succes) :

```
{
    "msg": "Sukses Menerima Materi",
    "data": [
        {
            "id": "68fb6898-5563-466a-ab33-8afbbb47103c",
            "phase": 1,
            "judul": "tes789",
            "isi": "rokok",
            "linkvideo": "https://youtu.be/EdmpLGERRvQ?si=b1bS39boHtgsz8Gd",
            "kategori": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
            "created_at": "2024-07-01T14:52:50.990Z",
            "tingkat": 3,
            "id_quiz": "68fb6898-5563-466a-ab33-8afbbb47103c",
            "history_quiz": [
                {
                    "id_mengambil_quiz": "c78f5b58-78d6-4cce-b6c9-dc69319abca1",
                    "nilai": 80
                }
            ]
        }
    ]
}
```

Response Body (failed) :

_Not Valid Request Query id_materi UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### User Access Materi

Endpoint : POST /selectMateri/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)

Response Body (succes) :

```
{
    "msg": "Sukses Menambahkan User Access",
    "data": [
        {
            "id": "bafec599-8581-4eda-8118-534a2b2de81c"
        }
    ]
}
```

Response Body (failed) :

_Wrong id_materi_

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

_Not Valid id_materi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Kategori Materi

Endpoint : GET /kategoriMateri

Authorization Type Bearer Token : "Access Token"

Response Body (succes) :

```
{
    "msg": "Sukses Menerima kategori materi",
    "data": [
        {
            "id": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
            "jenis": "Nahwu",
            "deskripsi": "Nahwu adalah ilmu yang mempelajari struktur kalimat dalam bahasa Arab. Fokus utama nahwu adalah bagaimana kata-kata disusun dalam sebuah kalimat agar sesuai dengan kaidah tata bahasa Arab. Nahwu mencakup aturan tentang posisi dan fungsi kata dalam kalimat, serta perubahan yang terjadi pada akhir kata karena posisi tersebut."
        },
        {
            "id": "630fc24e-6efb-43a9-a997-b32d19a04606",
            "jenis": "Sharaf",
            "deskripsi": "Sharaf adalah ilmu yang mempelajari struktur kalimat dalam bahasa Arab. Fokus utama nahwu adalah bagaimana kata-kata disusun dalam sebuah kalimat agar sesuai dengan kaidah tata bahasa Arab. Nahwu mencakup aturan tentang posisi dan fungsi kata dalam kalimat, serta perubahan yang terjadi pada akhir kata karena posisi tersebut."
        }
    ]
}
```

Response Body (failed) :

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

## QUIZ

### User Take Quiz

Endpoint : POST /quiz/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
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

_Not Authorize to take this quiz_

```
{
    "status": "error",
    "statusCode": 401,
    "message": "Selesaikan Quiz Sebelumnya Terlebih Dahulu"
}
```

_Quiz for that materi not make it yet_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Tidak Ditemukan Quiz Dengan Materi Tersebut"
}
```

_Not Valid id_materi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Quiz From Materi

Endpoint : GET /quiz/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)

Response Body (succes) :

```
{
    "msg": "Sukses Menerima Data",
    "data": [
        {
            "nama_quiz": "tesupdate",
            "soal_id": "4780edf0-c793-4d12-b009-86c529e032bc",
            "soal": "Siapakah Presiden Nomor 3",
            "pilihan": [
                {
                    "id": "ad6262bb-f97e-4152-a8ec-4babdc8ed1d2",
                    "jawaban": "Soerharto"
                },
                {
                    "id": "7c842fcd-caf3-4923-ba8e-c67855a7fecd",
                    "jawaban": "Soekarno"
                },
                {
                    "id": "af9cf4b7-a82d-441a-9b02-4f0092271c6e",
                    "jawaban": "Megawati"
                },
                {
                    "id": "9f5f7305-7f6a-4185-8b81-cadba03bf3e1",
                    "jawaban": "BJ Habibie"
                }
            ]
        },
        {
            "nama_quiz": "tesupdate",
            "soal_id": "afd7390d-0875-4347-b2c2-84de2823eb52",
            "soal": "jadi kita melakukan tes update",
            "pilihan": [
                {
                    "id": "125a642a-7ecc-407c-80f4-567b621a7336",
                    "jawaban": "Prabowo"
                },
                {
                    "id": "36bfb004-8371-463d-910e-31d3615a419e",
                    "jawaban": "Anies"
                },
                {
                    "id": "231aa0b2-b446-4926-aa78-542083d83b07",
                    "jawaban": "Jokowi"
                },
                {
                    "id": "48406ea1-f043-48d0-a6e3-41d7886524ef",
                    "jawaban": "Ganjar"
                }
            ]
        },
        {
            "nama_quiz": "tesupdate",
            "soal_id": "d22f726a-3a35-4e40-8c5b-4415f6d83e40",
            "soal": "apakah ini berhasi quiz",
            "pilihan": [
                {
                    "id": "b17f3883-4ca8-46ed-ae46-5379d3498801",
                    "jawaban": "iya"
                },
                {
                    "id": "2fd85abd-a6be-461c-882d-514ea2e51d0a",
                    "jawaban": "no"
                }
            ]
        }
    ]
}
```

Response Body (failed) :

_Not Valid UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_materi_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Quiz Tidak Ditemukan",
    "data": "Cek Id Materi Anda"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Nilai Quiz User

Endpoint : GET /quiz/nilai/:id_mengambil_quiz

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_quiz) (uuid)

Response Body (succes) :

```
{
    "msg": "Sukses Menerima Data",
    "data": {
        "quiz": [
            {
                "nama_quiz": "tesupdate",
                "nilai": 100,
                "lulus": true,
                "jumlah_soal": 1,
                "jumlah_benar": 1,
                "jumlah_salah": 0
            }
        ]
    }
}

```

Response Body (failed) :

_Not Valid UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_quiz harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_mengambil_quiz_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "History Tidak Ditemukan",
    "data": "Cek id materi Anda"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Pembahasan Quiz User

Endpoint : GET /quiz/pembahasan/:id_mengambil_quiz

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_quiz) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "soal_quiz": "ab084fe0-253c-47e7-a2ea-c442fb098bba",
            "soal": "Siapakah Presiden Nomor 3",
            "jawaban_details": [
                {
                    "jawaban_user_id": "d8fcf2d4-f2c1-4e67-b4a6-8fdbf17bf35b",
                    "jawaban_user": "BJ Habibie",
                    "jawaban_benar": "Megawati"
                }
            ],
            "benar": false
        },
        {
            "soal_quiz": "ca8c35c6-b92c-4753-97ab-45efc3bd812f",
            "soal": "Siapakah Presiden Nomor 1",
            "jawaban_details": [
                {
                    "jawaban_user_id": "aac4b00f-5022-4725-a2fb-9fe3c4923253",
                    "jawaban_user": "Soekarno",
                    "jawaban_benar": "Soerharto"
                }
            ],
            "benar": false
        },
        {
            "soal_quiz": "cf10aa25-7c8c-45c0-8534-fe67caa34f7d",
            "soal": "Siapakah Presiden Nomor 2",
            "jawaban_details": [
                {
                    "jawaban_user_id": "e96d3251-a493-4a89-8348-24e22e7669ce",
                    "jawaban_user": "BJ Habibie",
                    "jawaban_benar": "BJ Habibie"
                }
            ],
            "benar": true
        }
    ]
}
```

Response Body (Failed):

_Wrong id_mengambil_quiz_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Pembahasan Tidak Ditemukan"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

## Ujian

### User Take Ujian

Endpoint : POST /ujian/:id_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_ujian) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
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

_Not Authorize to take this Ujian_

```
{
    "status": "error",
    "statusCode": 401,
    "message": "Anda Tidak Diperbolehkan Mengambil Ujian ini"
}
```

_Not Valid id_ujian_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_ujian harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Ujian

Endpoint : GET /ujian/:id_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_ujian) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
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

_Not Valid UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_ujian harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_ujian_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Ujian Not Found",
    "data": "Cek Id Ujian Anda"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Nilai Ujian User

Endpoint : GET /ujian/nilai/:id_mengambil_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_ujian) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
    "data": {
        "ujian": [
            {
                "nilai": 50,
                "lulus": false,
                "jumlah_soal": 2,
                "jumlah_benar": 1,
                "jumlah_salah": 1
            }
        ]
    }
}
```

Response Body (failed) :

_Not Valid UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_ujian harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_mengambil_ujian_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "History Not Found",
    "data": "Cek id_mengambil_ujian Anda"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Get Pembahasan Ujian User

Endpoint : GET /ujian/pembahasan/:id_mengambil_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_ujian) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "soal_ujian": "ab084fe0-253c-47e7-a2ea-c442fb098bba",
            "soal": "Siapakah Presiden Nomor 3",
            "jawaban_details": [
                {
                    "jawaban_user_id": "d8fcf2d4-f2c1-4e67-b4a6-8fdbf17bf35b",
                    "jawaban_user": "BJ Habibie",
                    "jawaban_benar": "Megawati"
                }
            ],
            "benar": false
        },
        {
            "soal_ujian": "ca8c35c6-b92c-4753-97ab-45efc3bd812f",
            "soal": "Siapakah Presiden Nomor 1",
            "jawaban_details": [
                {
                    "jawaban_user_id": "aac4b00f-5022-4725-a2fb-9fe3c4923253",
                    "jawaban_user": "Soekarno",
                    "jawaban_benar": "Soerharto"
                }
            ],
            "benar": false
        },
        {
            "soal_ujian": "cf10aa25-7c8c-45c0-8534-fe67caa34f7d",
            "soal": "Siapakah Presiden Nomor 2",
            "jawaban_details": [
                {
                    "jawaban_user_id": "e96d3251-a493-4a89-8348-24e22e7669ce",
                    "jawaban_user": "BJ Habibie",
                    "jawaban_benar": "BJ Habibie"
                }
            ],
            "benar": true
        }
    ]
}
```

Response Body (Failed):

_Wrong id_mengambil_ujian_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Pembahasan Tidak Ditemukan"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

## JAWABAN

### Jawaban Quiz

Endpoint : POST /quiz/cek/:id_mengambil_quiz

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_quiz) (uuid)

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

_Not Valid UUID (id_mengambil_quiz)_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_quiz harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_mengambil_quiz_

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

_Wrong id_soal_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Soal Tidak Ditemukan"
}
```

_Not Valid UUID (id_soal)_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_soal harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Not Valid UUID (id_jawaban)_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_jawaban harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_jawaban_

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

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Jawaban Ujian

Endpoint : POST /ujian/cek/:id_mengambil_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_mengambil_ujian) (uuid)

```
{
    {{BASEURL}}/ujian/cek/db8e5cd9-5b56-4aaf-aeb5-407b4b15b4a7
}

```

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

_Not Valid UUID (id_mengambil_ujian)_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_mengambil_ujian harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_mengambil_ujian_

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

_Wrong id_soal_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Soal Tidak Ditemukan"
}
```

_Not Valid UUID (id_soal)_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_soal harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Not Valid UUID (id_jawaban)_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_jawaban harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_jawaban_

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

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

## Statistik

### Statistik Pembelajaran User

Endpoint : GET /statistik

Authorization Type Bearer Token : "Access Token"

Response Body (succes) :

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "progress": 66,
            "materi_id": "68fb6898-5563-466a-ab33-8afbbb47103c",
            "IsMateri": false,
            "IsUjian": false,
            "IsQuiz": true
        }
    ]
}
```

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "progress": 0,
            "ujian_id": "697b4576-18b3-45e9-9dc7-ba05f7b20090",
            "phase": 1,
            "kategori": "3053b811-0544-4cea-b951-1b5f0b9ab36f",
            "IsMateri": false,
            "IsUjian": true,
            "IsQuiz": false
        }
    ]
}
```

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "progress": 0,
            "materi_id": "2fc63e29-be4a-401f-b89a-aa423c4d8a36",
            "IsMateri": true,
            "IsUjian": false,
            "IsQuiz": false
        }
    ]
}
```

Response Body (failed) :
_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

# ADMIN

## MATERI

### ADD MATERI

Endpoint : POST /admin/materi

Authorization Type Bearer Token : "Access Token"

Request Body :

```
{
    "judul" : "nahwu GES",
    "isi":"jangan pernah meninggalkan sholat karena sholat tiang agama yang mana tiang agama adalah tiang yang paling tiang",
    "linkVideo":"linkVideo",
    "kategori":"3053b811-0544-4cea-b951-1b5f0b9ab36f", // bisa di dapat dari endpoint BASEURL/kategoriMateri
    "phase": 2, //tergantung apakah phase 1 atau 2
    "tingkat":3 // tingkat dia di phase itu seperti bab
}
```

Response Body (succes) :

```
{
    "msg": "Sukses Menambahkan Materi",
    "data": {
        "id": "a9abfdc8-e8b5-4f4c-be00-ee85e5836d9f"
    }
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

### UPDATE MATERI

Endpoint : PATCH /admin/materi/:id_materi

Authorization Type Bearer Token : "Access Token"

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
    "msg": "Sukses Update Materi"
}
```

Response Body (failed) :
_id_materi Not Found on database_

```
{
    "status": "error",
    "statusCode": 500,
    "message": "Failed to Update materi to database"
}
```

_id_materi Not Valid_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_judul Not Valid_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "judul dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_isi Not Valid_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "isi dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_LinkVideo Not Found_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "linkVideo dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

### Delete MATERI

Endpoint : DELETE /admin/materi/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params : id_materi (uuid)

Response Body (succes) :

```
{
    "message": "Sukses delete"
}
```

Response Body (failed) :
_id_materi Not Found on database_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "No Data Deleted"
}
```

_id_materi Not Valid_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

## Ujian


### Get Ujian

Endpoint : GET /admin/ujian/:id_ujian

Authorization Type Bearer Token : "Access Token"

Request Params: (id_ujian) (uuid)

Response Body (succes) :

```
{
    "msg": "Query Sukses",
    "data": [
        {
            "soal_id": "e97fbf4b-22ff-4d0e-9f85-4d5b5d70bbb5",
            "soal": "apakah ini berhasil122312 ujian lagi",
            "pilihan": [
                {
                    "id": "8b12392b-3763-48b2-9bee-8c0594d3d7d7",
                    "jawaban": "iya"
                },
                {
                    "id": "044f29cb-0f7c-466c-ab77-fb5a509b0a53",
                    "jawaban": "no"
                }
            ],
            "jawaban_benar": "044f29cb-0f7c-466c-ab77-fb5a509b0a53",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi.\n"
        },
        {
            "soal_id": "436e2418-8e3b-40dd-9c58-bb2e4ccd4e30",
            "soal": "Siapakah pilpres 2024 jilid 2",
            "pilihan": [
                {
                    "id": "aa755c1d-480c-4d88-9441-5af081a6a2e2",
                    "jawaban": "Prabowo"
                },
                {
                    "id": "d70b59ae-7905-45eb-a52e-6b725e23aca9",
                    "jawaban": "Ganjar"
                },
                {
                    "id": "6c372d10-6f47-42f7-b2b9-48fbbc916647",
                    "jawaban": "Anies"
                },
                {
                    "id": "f8a55abf-3981-4646-9324-66037cdc576e",
                    "jawaban": "Jokowi"
                }
            ],
            "jawaban_benar": "d70b59ae-7905-45eb-a52e-6b725e23aca9",
            "pembahasan": "Itu dikarenakan ada nya suatu persepsi yang membentuk suatu kemegahan nasional"
        },
        {
            "soal_id": "67ba5eb9-a52f-42e3-a214-d401331ce697",
            "soal": "apakah ini berhasil122312 ujian lagi 2",
            "pilihan": [
                {
                    "id": "154d1abe-f6f3-4029-aeff-85424bbd016a",
                    "jawaban": "no"
                },
                {
                    "id": "146e85d4-d681-4b89-a0b6-fc5926d6a305",
                    "jawaban": "iya"
                }
            ],
            "jawaban_benar": "154d1abe-f6f3-4029-aeff-85424bbd016a",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "40c4e315-2165-43ea-a625-df1a7a9b0fac",
            "soal": "apakah ini berhasil122312 ujian lagi 2",
            "pilihan": [
                {
                    "id": "125d1018-4d59-482f-9944-0c472e93baba",
                    "jawaban": "no"
                },
                {
                    "id": "809f1dd2-886e-4533-a931-014129f35908",
                    "jawaban": "iya"
                }
            ],
            "jawaban_benar": "125d1018-4d59-482f-9944-0c472e93baba",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "2c53af39-5ebb-4113-8856-8aa6c4df4af8",
            "soal": "apakah ini berhasil122312 ujian lagi 2",
            "pilihan": [
                {
                    "id": "17dbd863-e207-46a4-a3ef-51c539ed7c26",
                    "jawaban": "iya"
                },
                {
                    "id": "abeaecdf-beed-4a96-860e-e96a4bb3c897",
                    "jawaban": "no"
                }
            ],
            "jawaban_benar": "abeaecdf-beed-4a96-860e-e96a4bb3c897",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "d6dbb716-e1dd-42b4-8b39-95528af3fdd3",
            "soal": "apakah ini berhasil122312 ujian lagi",
            "pilihan": [
                {
                    "id": "d56ba4b9-fb8d-4fec-871e-2db806868a57",
                    "jawaban": "no"
                },
                {
                    "id": "72b36983-25ad-4ee3-90c4-7c945bb1dd9c",
                    "jawaban": "iya"
                }
            ],
            "jawaban_benar": "d56ba4b9-fb8d-4fec-871e-2db806868a57",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "0ac16561-8885-45e2-af01-eb27592f754c",
            "soal": "apakah ini berhasil122312 ujian lagi 2",
            "pilihan": [
                {
                    "id": "38e560f4-638c-4e5d-940b-df33c8e1e6b7",
                    "jawaban": "no"
                },
                {
                    "id": "afaf6cab-48a2-4d09-b59b-0e8c6b5d3047",
                    "jawaban": "iya"
                }
            ],
            "jawaban_benar": "38e560f4-638c-4e5d-940b-df33c8e1e6b7",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "2c809db1-d071-47c9-b636-af6e47718ff5",
            "soal": "apakah ini berhasil122312 update sebuah soal plis pls",
            "pilihan": [
                {
                    "id": "fdcdd1aa-39dd-4483-ab83-6a07722c0d3f",
                    "jawaban": "no sir"
                },
                {
                    "id": "a1a527a0-c400-40d0-a5db-bab798d2aab3",
                    "jawaban": "iya sir"
                }
            ],
            "jawaban_benar": "a1a527a0-c400-40d0-a5db-bab798d2aab3",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "eb2ae113-343b-47ae-9d9a-ea8f28bb2c55",
            "soal": "Siapakah Presiden Nomor 1",
            "pilihan": [
                {
                    "id": "ebca2bb0-1287-4f27-9ac2-d6867d5ab603",
                    "jawaban": "BJ Habibie"
                },
                {
                    "id": "7c27319e-4f02-4aee-b8f2-f5a10eef9d33",
                    "jawaban": "Soekarno"
                },
                {
                    "id": "ef259445-1120-4532-9369-2eaee69a5044",
                    "jawaban": "Soerharto"
                },
                {
                    "id": "c84c6a69-2344-4b7a-aedc-a87b4abfc724",
                    "jawaban": "Megawati"
                }
            ],
            "jawaban_benar": "ef259445-1120-4532-9369-2eaee69a5044",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        }
    ]
}
```

Response Body (failed) :

_Not Valid UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_ujian harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_ujian_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Ujian Not Found",
    "data": "Cek Id Ujian Anda"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Add Soal Ujian untuk phase

Endpoint : POST /admin/ujian/soal

Authorization Type Bearer Token : "Access Token"

Request Body :

```
{

    "soal":"Siapakah pilpres 2024",
    "pilihan":["Prabowo","Jokowi","Anies","Ganjar"],
    "jawaban_benar":3,
    "pembahasan":"Itu dikarenakan ada nya suatu persepsi yang membentuk suatu kemegahan nasional",
    "phase":1,
    "kategori_materi":"3053b811-0544-4cea-b951-1b5f0b9ab36f"
}
```

Response Body (succes) :

```
{
    "msg": "Soal Ditambahkan ke Database",
    "data": "697b4576-18b3-45e9-9dc7-ba05f7b20090"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

_Jawaban benar tidak ada pilihan out of range_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "jawaban_benar harus berada pada range 0 to 3",
    "data": "Data Tidak Valid"
}

```

_Jawaban benar tidak integer_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "jawaban_benar harus lebih atau sama dengan 0",
    "data": "Data Tidak Valid"
}
```

_Soal tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "soal dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_pilihan tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "pilihan harus memiliki 2 opsi",
    "data": "Data Tidak Valid"
}
```

_phase tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "phase harus integer",
    "data": "Data Tidak Valid"
}
```

_kategori_materi tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "kategori_materi harus valid UUID",
    "data": "Data Tidak Valid"
}
```

### Update Soal Ujian

Endpoint : Patch /admin/soal/:id_soal

Authorization Type Bearer Token : "Access Token"

Request Params: id_soal (uuid) WAJIB

Request Body :

```
{
{
  "soal": "jadi kita melakukan tes update ",
  "pilihan": [
                {
                    "id": "125a642a-7ecc-407c-80f4-567b621a7336",
                    "jawaban": "Prabowo"
                },
                {
                    "id": "36bfb004-8371-463d-910e-31d3615a419e",
                    "jawaban": "Anies"
                },
                {
                    "id": "231aa0b2-b446-4926-aa78-542083d83b07",
                    "jawaban": "Jokowi"
                },
                {
                    "id": "48406ea1-f043-48d0-a6e3-41d7886524ef",
                    "jawaban": "Ganjar"
                }
            ],
  "jawaban_benar": "125a642a-7ecc-407c-80f4-567b621a7336",
  "pembahasan" : "pak jokowi dong yang menang gimana sih"
}
}
```

Response Body (succes) :

```
{
    "message": "Update Sukses"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

_Jawaban benar tidak ada pilihan_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Jawaban benar harus termasuk dalam daftar pilihan",
    "data": "Data Tidak Valid"
}

```

_Soal tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "soal dibutuhkan",
    "data": "Data Tidak Valid"
}
```

### Delete Soal Ujian

Endpoint : Delete /admin/soal/:id_soal

Authorization Type Bearer Token : "Access Token"

Request Params: id_soal (uuid) WAJIB

Response Body (succes) :

```
{
    "message": "Delete Sukses"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

## Quiz


### Get Quiz From Materi

Endpoint : GET /admin/quiz/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params: (id_materi) (uuid)

Response Body (succes) :

```
{
    "msg": "Sukses Menerima Data",
    "data": [
        {
            "soal_id": "4780edf0-c793-4d12-b009-86c529e032bc",
            "soal": "Siapakah Presiden Nomor 3",
            "pilihan": [
                {
                    "id": "ad6262bb-f97e-4152-a8ec-4babdc8ed1d2",
                    "jawaban": "Soerharto"
                },
                {
                    "id": "7c842fcd-caf3-4923-ba8e-c67855a7fecd",
                    "jawaban": "Soekarno"
                },
                {
                    "id": "af9cf4b7-a82d-441a-9b02-4f0092271c6e",
                    "jawaban": "Megawati"
                },
                {
                    "id": "9f5f7305-7f6a-4185-8b81-cadba03bf3e1",
                    "jawaban": "BJ Habibie"
                }
            ],
            "jawaban_benar": "af9cf4b7-a82d-441a-9b02-4f0092271c6e",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        },
        {
            "soal_id": "afd7390d-0875-4347-b2c2-84de2823eb52",
            "soal": "jadi kita melakukan tes update",
            "pilihan": [
                {
                    "id": "125a642a-7ecc-407c-80f4-567b621a7336",
                    "jawaban": "Prabowo"
                },
                {
                    "id": "36bfb004-8371-463d-910e-31d3615a419e",
                    "jawaban": "Anies"
                },
                {
                    "id": "231aa0b2-b446-4926-aa78-542083d83b07",
                    "jawaban": "Jokowi"
                },
                {
                    "id": "48406ea1-f043-48d0-a6e3-41d7886524ef",
                    "jawaban": "Ganjar"
                }
            ],
            "jawaban_benar": "125a642a-7ecc-407c-80f4-567b621a7336",
            "pembahasan": "pak jokowi dong yang menang gimana sih"
        },
        {
            "soal_id": "d22f726a-3a35-4e40-8c5b-4415f6d83e40",
            "soal": "apakah ini berhasi quiz",
            "pilihan": [
                {
                    "id": "b17f3883-4ca8-46ed-ae46-5379d3498801",
                    "jawaban": "iya"
                },
                {
                    "id": "2fd85abd-a6be-461c-882d-514ea2e51d0a",
                    "jawaban": "no"
                }
            ],
            "jawaban_benar": "2fd85abd-a6be-461c-882d-514ea2e51d0a",
            "pembahasan": "Lorem ipsum dolor sit amet consectetur. Sagittis netus enim elit at in auctor. Pellentesque faucibus lacus in mi."
        }
    ]
}
```

Response Body (failed) :

_Not Valid UUID_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "id_materi harus valid UUID",
    "data": "Data Tidak Valid"
}
```

_Wrong id_materi_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Quiz Tidak Ditemukan",
    "data": "Cek Id Materi Anda"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

### Add Soal Quiz per Materi

Endpoint : POST /admin/quiz/soal/:id_materi

Authorization Type Bearer Token : "Access Token"

Request Params : id_materi (uuid)

Request Body :

```
{
    "soal":"Siapakah pilpres 2024",
    "pilihan":["Prabowo","Jokowi","Anies","Ganjar"],
    "jawaban_benar":3,
    "pembahasan":"Itu dikarenakan ada nya suatu persepsi yang membentuk suatu kemegahan nasional"
}
```

Response Body (succes) :

```
{
    "msg": "Soal Ditambahkan ke Database",
    "data": "48690445-d0b1-4dc6-bfe7-7ae654e10808"
}

```

_Wrong Id Materi_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Id Materi Not Found"
}

```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

_Jawaban benar tidak ada pilihan out of range_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "jawaban_benar must be within the range of 0 to 3",
    "data": "Data Tidak Valid"
}

```

_Jawaban benar tidak integer_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "jawaban_benar harus lebih atau sama dengan 0",
    "data": "Data Tidak Valid"
}
```

_Soal tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "soal dibutuhkan",
    "data": "Data Tidak Valid"
}
```

_pilihan tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "pilihan harus memiliki 2 opsi",
    "data": "Data Tidak Valid"
}
```

### Update Soal Quiz

Endpoint : Patch /admin/soal/:id_soal

Authorization Type Bearer Token : "Access Token"

Request Params: id_soal (uuid) WAJIB

Request Body :

```
{
  "soal": "jadi kita melakukan tes update ",
  "pilihan": [
                {
                    "id": "125a642a-7ecc-407c-80f4-567b621a7336",
                    "jawaban": "Prabowo"
                },
                {
                    "id": "36bfb004-8371-463d-910e-31d3615a419e",
                    "jawaban": "Anies"
                },
                {
                    "id": "231aa0b2-b446-4926-aa78-542083d83b07",
                    "jawaban": "Jokowi"
                },
                {
                    "id": "48406ea1-f043-48d0-a6e3-41d7886524ef",
                    "jawaban": "Ganjar"
                }
            ],
  "jawaban_benar": "125a642a-7ecc-407c-80f4-567b621a7336",
  "pembahasan" : "pak jokowi dong yang menang gimana sih"
}
```

Response Body (succes) :

```
{
    "message": "Update Sukses"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```

_Jawaban benar tidak ada pilihan_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "Jawaban benar harus termasuk dalam daftar pilihan",
    "data": "Data Tidak Valid"
}

```

_Soal tidak terisi_

```
{
    "status": "error",
    "statusCode": 400,
    "message": "soal dibutuhkan",
    "data": "Data Tidak Valid"
}
```

### Delete Soal Quiz

Endpoint : Delete /admin/soal/:id_soal

Authorization Type Bearer Token : "Access Token"

Request Params: id_soal (uuid) WAJIB

Response Body (succes) :

```
{
    "message": "Delete Sukses"
}
```

_Wrong Authorization Token_

```
{
    "status": "error",
    "statusCode": 403,
    "message": "Access Invalid",
    "data": "Token Telah Expired"
}

```

_Wrong Authorization Token 2_

```
{
    "status": "error",
    "statusCode": 404,
    "message": "Forbidden Access",
    "data": "Anda Bukan Admin"
}

```
