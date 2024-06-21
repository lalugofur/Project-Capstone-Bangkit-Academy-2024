# Project-Capstone-Bangkit-Academy-2024
## API Documentation

### Register User
Endpoint: POST /register

Description: Mendaftarkan pengguna baru dengan email, password, dan username.

#### Request Body:
json
{
  "email": "",
  "password": "",
  "username": ""
}


#### Response:

Success (201 Created):
json
{
  "message": "Pengguna berhasil didaftarkan",
  "user": {
      "uid": "",
      "email": "",
      "emailVerified": ,
      "disabled": ,
      "metadata": {
          "lastSignInTime": ,
          "creationTime": "",
          "lastRefreshTime":       },
      "tokensValidAfterTime": "",
      "providerData": [
          {
              "uid": "",
              "email": "",
              "providerId": ""
          }
      ]
  }
}


Error (400 Bad Request):
json
{
  "errors": [
    {
      "msg": "Email tidak valid",
      "param": "email",
      "location": "body"
    }
  ]
}


### Login User
Endpoint: POST /login

Description: Login pengguna dengan email dan password.

#### Request Body:
json
{
  "email": "admin@gmail.com",
  "password": "password123"
}


#### Response:

Success (200 OK):
json
{
  "kind": "#VerifyPasswordResponse",
  "localId": "",
  "email": "admin@gmail.com",
  "displayName": "",
  "idToken": "",
  "registered": true
}


Error (400 Bad Request):
json
{
  "errors": [
    {
      "msg": "Email atau password salah",
      "param": "email",
      "location": "body"
    }
  ]
}


### Get Cat Breeds
Endpoint: GET /cat-breeds

Description: Mengambil daftar ras kucing.

#### Response:

Success (200 OK):
json
[
  {
      "Definisi": "Kucing Abyssinian, juga dikenal sebagai Abys, memiliki kemiripan yang mencolok dengan kucing yang digambarkan dalam mural Mesir kuno. Mereka memiliki mata berbentuk almond, telinga yang tajam, dan tubuh yang ramping. Beberapa orang percaya bahwa Abyssinian adalah keturunan langsung dari kucing purba yang dihormati ini, sementara yang lain berpendapat bahwa mereka berasal dari tempat yang sekarang disebut Etiopia dan melakukan perjalanan bersama tentara Inggris ke Inggris, menurut Abyssinian Cat Club. Semua kucing Abyssinian memiliki bulu agouti, yang berarti setiap helai bulunya memiliki berbagai warna: pita gelap, pita terang, dan ujung gelap. Hal ini membuat bulu halus mereka tampak seperti garam dan merica.",
      "gambar": "https://storage.googleapis.com/pawpal/cat%20breeds/Abyssinian_118.jpg",
      "id_ras": 1,
      "list_penyakit": "Aortic thromboembolism, Atopic dermatitis (atopy), Diabetes mellitus,  Increased osmotic fragility of erythrocytes, Pyruvate kinase deficiency, Feline infectious peritonitis (FIP), Mycobacterium avium complex infection, Urinary tract infections (UTI), Acquired myasthenia gravis, Patellar luxation, Acquired myasthenia gravis, Progressive retinal atrophy (PRA), Renal amyloidosis, Dystocia, Pyometra (cystic endometrial hyperplasia–pyometra complex)",
      "nama_ras": "Abyssinian"
  }
]


### Get Cat Breeds by ID
Endpoint: GET /cat-breeds/:id

Description: Mengambil detail ras kucing berdasarkan ID.

#### Response:

Success (200 OK):
json
{
  "Definisi": "Kucing Abyssinian, juga dikenal sebagai Abys, memiliki kemiripan yang mencolok dengan kucing yang digambarkan dalam mural Mesir kuno. Mereka memiliki mata berbentuk almond, telinga yang tajam, dan tubuh yang ramping. Beberapa orang percaya bahwa Abyssinian adalah keturunan langsung dari kucing purba yang dihormati ini, sementara yang lain berpendapat bahwa mereka berasal dari tempat yang sekarang disebut Etiopia dan melakukan perjalanan bersama tentara Inggris ke Inggris, menurut Abyssinian Cat Club. Semua kucing Abyssinian memiliki bulu agouti, yang berarti setiap helai bulunya memiliki berbagai warna: pita gelap, pita terang, dan ujung gelap. Hal ini membuat bulu halus mereka tampak seperti garam dan merica.",
  "gambar": "https://storage.googleapis.com/pawpal/cat%20breeds/Abyssinian_118.jpg",
  "id_ras": 1,
  "list_penyakit": "Aortic thromboembolism, Atopic dermatitis (atopy), Diabetes mellitus,  Increased osmotic fragility of erythrocytes, Pyruvate kinase deficiency, Feline infectious peritonitis (FIP), Mycobacterium avium complex infection, Urinary tract infections (UTI), Acquired myasthenia gravis, Patellar luxation, Acquired myasthenia gravis, Progressive retinal atrophy (PRA), Renal amyloidosis, Dystocia, Pyometra (cystic endometrial hyperplasia–pyometra complex)",
  "nama_ras": "Abyssinian"
}


### Get Symptoms
Endpoint: GET /symptoms

Description: Mengambil daftar gejala.

#### Response:

Success (200 OK):
```json
[
  {
      "definisi_penyakit": "Pada kondisi ini ventrikel yang mengalami hipertrofi menyebabkan gagal jantung kongestif dan disritmia. Insidensinya dilaporkan sebesar 1,6-5,2% pada kucing, namun jarang terjadi pada anjing. Kemungkinan besar kondisi tersebut diturunkan, meskipun faktor pengubah dapat menyebabkan ekspresi kondisi yang bervariasi.",
      "gejala": "Sesak napas, kelelahan, batuk kronis",
      "id_penyakit": 1,
      "nama_penyakit": "Hypertrophic cardiomyopathy",
      "penanganan": "Pemberian obat untuk mengurangi beban jantung, diet rendah sodium, operasi jika diperlukan"
  },
  {
      "definisi_penyakit": "Bekuan darah yang menempel di aorta ekor, terutama pada kucing tetapi kadang-kadang pada anjing, menyebabkan tanda-tanda paresis atau kelumpuhan tungkai belakang, ekstremitas dingin, dan nyeri. Hal ini sering dikaitkan dengan penyakit jantung pada kucing, dan banyak kasus mungkin muncul bersamaan dengan gagal jantung.",
      "gejala": "Kelemahan atau kelumpuhan tungkai belakang, kaki dingin"
  }
