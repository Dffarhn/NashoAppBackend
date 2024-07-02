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
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0ZjhjY2ViLWEyNjQtNDU0Ny1iODk0LWM4M2E3ZGQ1NWJhNyIsInVzZXJuYW1lIjoiZGFwYXBwcHBwcCIsImVtYWlsIjoiZC5yYWloYW4yMDA0QGdtYWlsLmNvbSIsInJvbGUiOiIzMTUxZTdkMC00YTgxLTQwNDItYmU4Ny03NzBhNmU1ODY1Y2IiLCJpYXQiOjE3MTk4ODk5MzQsImV4cCI6MTcxOTg5MDUzNH0.75MVcrEf7GDzm98qCcpzAxoKi07UAaGzHaOMIRDIHIY",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0ZjhjY2ViLWEyNjQtNDU0Ny1iODk0LWM4M2E3ZGQ1NWJhNyIsInVzZXJuYW1lIjoiZGFwYXBwcHBwcCIsImVtYWlsIjoiZC5yYWloYW4yMDA0QGdtYWlsLmNvbSIsInJvbGUiOiIzMTUxZTdkMC00YTgxLTQwNDItYmU4Ny03NzBhNmU1ODY1Y2IiLCJpYXQiOjE3MTk4ODk5MzQsImV4cCI6MTcxOTk3NjMzNH0.iPxFrSBQViZVy0NuN22DLcp8b1fnYy6p1lmg-Ike_9M"
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
*EMAIL NOT VALID*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Your Data Not Valid",
    "data": "Must be a valid email"
}
```

*Password Kosong*
```
{
    "status": "error",
    "statusCode": 400,
    "message": "Your Data Not Valid",
    "data": "Password is required"
}
```

**Get Semua Data Product Knowledge**

Endpoint : GET /api/v1/user/productKnowledge

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
    "status": 200,
    "message": "Data Product Knowledge Berhasil Diambil",
    "data": [
        {
            "id": 1,
            "nama": "Jumlah Cicilan & Bonus",
            "deskripsi": "Knowledge mengenai seputar yang ada dalam prapen",
            "gambarUrl": "https://images.bisnis.com/posts/2023/11/18/1715493/logo-bsi.jpg",
            "total": 5,
            "finished": 2
        },
        {
            "id": 2,
            "nama": "Jumlah Cicilan & Bonus 2",
            "deskripsi": "Knowledge mengenai seputar yang ada dalam prapen",
            "gambarUrl": "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/01/2023/05/11/BSI-Dery-Ridwansah-3-2693187413.jpg",
            "total": 1,
            "finished": 1
        },
        {
            "id": 3,
            "nama": "Tabungan",
            "deskripsi": "Knowledge mengenai seputar yang ada dalam prapen",
            "gambarUrl": "https://images.bisnis.com/posts/2023/11/18/1715493/logo-bsi.jpg",
            "total": 1,
            "finished": 0
        },
        {
            "id": 4,
            "nama": "Tabung dan Menabung",
            "deskripsi": "Knowledge mengenai seputar yang ada dalam prapen",
            "gambarUrl": "https://images.bisnis.com/posts/2023/11/18/1715493/logo-bsi.jpg",
            "total": 1,
            "finished": 0
        }
    ]
}
```

Response Body (failed) :

```
{
    "message": "Data Product Knowledge Tidak Berhasil Diambil",
    "status": 400
}
```

**Get Data Progres Artikel dalam Product Knowledge**

Endpoint : GET /api/v1/user/progresArticle/{id}

PathVariable : idProductKnowledge

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
    "status": 200,
    "message": "Data Progress Artikel Berhasil Diambil",
    "data": [
        {
            "id": 1,
            "judul": "Produk NOS Prapen yang ada sekarang",
            "gambar_url": "https://images.bisnis.com/posts/2023/11/18/1715493/logo-bsi.jpg",
            "body": "Pada kesempatan yang sama, Chief Economist BSI Banjaran Surya Indrastomo mengatakan dalam upayanya menambah kantor cabang di Arab Saudi, BSI mengincar pasar jamaah haji dan umroh asal Indonesia.",
            "poin": 100,
            "isFinished": false
        },
        {
            "id": 4,
            "judul": "Produk NOS Prapen yang ada sekarang",
            "gambar_url": "https://images.bisnis.com/posts/2023/11/18/1715493/logo-bsi.jpg",
            "body": "Pada kesempatan yang sama, Chief Economist BSI Banjaran Surya Indrastomo mengatakan dalam upayanya menambah kantor cabang di Arab Saudi, BSI mengincar pasar jamaah haji dan umroh asal Indonesia.",
            "poin": 300,
            "isFinished": false
        }
    ]
}
```

Response Body (failed) :

```
{
    "message": "Data Artikel Tidak Berhasil Diambil",
    "status": 400
}
```

**Get Detail Data Artikel**

Endpoint : GET /api/v1/user/detailArtikel/{id}

PathVariable : idArticle

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
    "status": 200,
    "message": "Data Artikel Berhasil Diambil",
    "data": {
        "id": 1,
        "judul": "Produk NOS Prapen yang ada sekarang",
        "gambar_url": "https://images.bisnis.com/posts/2023/11/18/1715493/logo-bsi.jpg",
        "body": "Pada kesempatan yang sama, Chief Economist BSI Banjaran Surya Indrastomo mengatakan dalam upayanya menambah kantor cabang di Arab Saudi, BSI mengincar pasar jamaah haji dan umroh asal Indonesia.",
        "poin": 100,
        "isFinished": false
    }
}
```

Response Body (failed) :

```
{
    "message": "Data Artikel Tidak Berhasil Diambil",
    "status": 400
}
```

**Post Poin Artikel User**

Endpoint : POST /api/v1/user/pogressArtikelDone/{id}

PathVariable : idArtikel

Authorization Type Bearer Token : "USER_TOKEN"

Request Body :

```
{
    "status": 200,
    "message": "success",
    "data": {
        "idArtikel": 4,
        "isFinished": true
    }
}
```

Response Body (succes) :

```
{
    "status" 	 : 200,
    "message"    : "Poin Berhasil Ditambahkan"
}
```

Response Body (failed) :

```
{
    "status" : 400,
    "message"    : "Tidak Berhasil Mendapatkan Point"
}
```

```
{
    "status" : 400,
    "message"    : "Artikel Tidak Ditemukan"
}
```

```
{
    "status" : 400,
    "message"    : "User Sudah Menyelesaikan Artikel ini"
}
```

**Search Productknowledge (Not Done Yet)**

**ADMIN**

**Product Knowledge**

**Get Data Product Knowledge**

Endpoint : GET /api/v1/admin/productKnowledge

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
   "data": [
	    {
		"id" : 1,
		"nama" : "Jumlah Cicilan & Bonus",
		"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	    },
	    {
		"id" : 2,
		"nama" : "Jumlah Cicilan & Bonus 2",
		"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	    },
    ],
    "message": "Data Product Knowledge Berhasil Diambil",
    "status": 200
}
```

Response Body (failed) :

```
{
    "message": "Data Product Knowledge Tidak Berhasil Diambil",
    "status": 400
}
```

**Get Data Product Knowledge By Nama**

Endpoint : GET /api/v1/admin/productKnowledge/{nama}

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
    "data": [
	    {
		"id" : 1,
		"nama" : "Jumlah Cicilan & Bonus",
		"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	    },
	    {
		"id" : 2,
		"nama" : "Jumlah Cicilan & Bonus 2",
		"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	    },
    ],
    "message": "Data Product Knowledge Berhasil Diambil",
    "status": 200
}
```

Response Body (failed) :

```
{
    "message": "Data Product Knowledge Tidak Berhasil Diambil",
    "status": 400
}
```

**Post Data Product Knowledge**

Endpoint : POST /api/v1/admin/ProductKnowledge

Authorization Type Bearer Token : "USER_TOKEN"

Request Body :

```
{
	"nama"      : "Jumlah Cicilan & Bonus",
	"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	"gambar_url" :"https://ui-avatars.com/api/?name=t&color=7F9CF5&background=EBF4FF",
}
```

Response Body (succes) :

```
{
    "status" : 200,
    "message"    : "Data Product Knowledge Berhasil Ditambahkan"
}
```

Response Body (failed) :

```
{
    "status" : 400,
    "message"    : "Data Product Knowledge Tidak Berhasil Ditambahkan"
}
```

**PUT Data Product Knowledge**

Endpoint : PUT /api/v1/admin/ProductKnowledge/{id}

Path : id_productKnowledge

Authorization Type Bearer Token : "USER_TOKEN"

Request Body :

```
{
	"gambar_url" :"https://ui-avatars.com/api/?name=t&color=7F9CF5&background=EBF4FF",
	"nama"      : "Jumlah Cicilan & Bonus",
	"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
}
```

Response Body (succes) :

```
{
    "status" : 200,
    "message"    : "Data Product Knowledge Berhasil Diperbarui"
}
```

Response Body (failed) :

```
{
    "status"     : 400,
    "message"    : "Data Product Knowledge Tidak Berhasil Diperbarui"
}
```

**DELETE Data Product Knowledge**

Endpoint : DELETE /api/v1/admin/ProductKnowledge/{id}

Path : "id_ProductKnowledge"

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
    "status" : 200,
    "message"    : "Data Product Knowledge Berhasil Dihapus"
}
```

Response Body (failed) :

```
{
    "status" : 400,
    "message"    : "Data Product Knowledge Tidak Berhasil Dihapus"
}
```

**Artikel**

**Get Data Artikel**

Endpoint : GET /api/v1/admin/article/{id}

PathVariable : id product_knowledge

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
   "data": [
	{
		"id" : 1,
		"nama" : "Jumlah Cicilan & Bonus",
		"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	},
	{
		"id" : 2,
		"nama" : "Jumlah Cicilan & Bonus 2",
		"deskripsi" : "Knowledge mengenai seputar yang ada dalam prapen",
	},
    ],
    "message": "Data Artikel Berhasil Diambil",
    "status": 200
}
```

Response Body (failed) :

```
{
    "message": "Data Artikel Tidak Berhasil Diambil",
    "status": 400
}
```

**Post Data Artikel**

Endpoint : POST /api/v1/admin/article

Authorization Type Bearer Token : "USER_TOKEN"

Request Body :

```
{
	"judul" : "Produk NOS Prapen yang ada sekarang",
	"poin"  : "500""halaman" {
		"id" : "1""no" : "1""gambar_url" : "https://ui-avatars.com/api/?name=t&color=7F9CF5&background=EBF4FF""body" : "Lorem Ipsum Body"
        }
}
```

Response Body (succes) :

```
{
    "status" : 200,
    "message"    : "Data Product Knowledge Berhasil Ditambahkan"
}
```

Response Body (failed) :

```
{
    "status" : 400,
    "message"    : "Data Product Knowledge Tidak Berhasil Ditambahkan"
}
```

**PUT Data Artikel**

Endpoint : PUT /api/v1/admin/article/{id}

Path : id_article

Authorization Type Bearer Token : "USER_TOKEN"

Request Body :

```
{
	"judul" : "Produk NOS Prapen yang ada sekarang",
	"poin"  : "500""halaman" {
            "id" : "1""no" : "1""gambar_url" : "https://ui-avatars.com/api/?name=t&color=7F9CF5&background=EBF4FF""body" : "Lorem Ipsum Body"
        }
}
```

Response Body (succes) :

```
{
    "status" : 200,
    "message"    : "Data Artikel Berhasil Diperbarui"
}
```

Response Body (failed) :

```
{
    "status"     : 400,
    "message"    : "Data Product Knowledge Tidak Berhasil Ditambahkan""data": {
        "role" : "USER",
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYWhyaXphbHNob2Z5YW5heml6QGdtYWlsLmNvbSIsImlhdCI6MTY5OTY3MDE0NSwiZXhwIjoxNjk5NjcxNTg1fQ.-X6w9Wipej5jf8JvIm7xt5z7TyQowSNtqWhFBjON0Zw"
    },
    "message": "Login Berhasil!",
    "status": 200
}
```

**DELETE Artikel**

Endpoint : DELETE /api/v1/admin/article/{id}

Path : id_article

Authorization Type Bearer Token : "USER_TOKEN"

Response Body (succes) :

```
{
    "status" : 200,
    "message"    : "Data Product Knowledge Berhasil Dihapus"
}
```

Response Body (failed) :

`{
    "status" : 400,
    "message"    : "Data Product Knowledge Tidak Berhasil Dihapus"
}`