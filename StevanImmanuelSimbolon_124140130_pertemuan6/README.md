## Identitas Praktikan

| Keterangan      | Isi                       |
| --------------- | ------------------------- |
| Nama Lengkap    | Stevan Immanuel Simbolon  |
| NIM             | 124140130                 |
| Kelas Praktikum | RB                        |
| Mata Kuliah     | Pengembangan Aplikasi Web |

---

## Deskripsi Singkat Aplikasi

Aplikasi ini merupakan **RESTful API CRUD** untuk manajemen data **Mahasiswa** dan **Matakuliah** yang dibangun menggunakan **Pyramid Framework**, **SQLAlchemy ORM**, **Alembic** untuk migrasi skema database, dan **PostgreSQL** sebagai database relasional.

Fitur utama yang tersedia:
- **Manajemen Mahasiswa (`/api/mahasiswa`)**: Melihat seluruh daftar mahasiswa, melihat detail berdasarkan ID, menambahkan mahasiswa baru dengan validasi field wajib & format tanggal ISO (`YYYY-MM-DD`), mengubah data secara parsial, serta menghapus data.
- **Manajemen Matakuliah (`/api/matakuliah`)**: Melihat seluruh daftar mata kuliah, melihat detail berdasarkan ID, menambahkan mata kuliah baru dengan validasi field wajib & nilai bilangan bulat positif (`sks > 0`, `semester > 0`), mengubah data secara parsial, serta menghapus data.

---

## Langkah Instalasi & Menjalankan Aplikasi

Pastikan **Python 3** dan **PostgreSQL** sudah terpasang di sistem Anda.

### 1. Buat & Aktifkan Virtual Environment
```powershell
cd StevanImmanuelSimbolon_124140130_pertemuan6
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Instal Dependensi Proyek
```powershell
python -m pip install --upgrade pip setuptools
pip install -e ".[testing]"
pip install psycopg2-binary
```

### 3. Setup Database PostgreSQL & Konfigurasi `development.ini`
Masuk ke `psql` sebagai superuser `postgres`, lalu buat user dan database:
```sql
CREATE USER pyramid_user WITH PASSWORD 'pyramid_pass';
CREATE DATABASE pyramid_mahasiswa OWNER pyramid_user;
```
Pastikan baris `sqlalchemy.url` di `development.ini` sudah mengarah ke database tersebut:
```ini
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa
```

### 4. Migrasi Database (Alembic) & Seeding Data Awal
```powershell
alembic -c development.ini upgrade head
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

### 5. Jalankan Server Development
```powershell
pserve development.ini --reload
```
Server akan berjalan di `http://localhost:6543`.

---

## Bukti Pengujian (Screenshot)

Berikut adalah dokumentasi tangkapan layar yang memperlihatkan proses menjalankan server aplikasi serta hasil pengujian menyeluruh terhadap seluruh layanan (*endpoint*) untuk data **Mahasiswa** dan **Matakuliah**.

### A. Menjalankan Server Aplikasi (`pserve`)

Tangkapan layar berikut menunjukkan server web lokal Pyramid (`waitress`) berhasil dijalankan pada alamat `http://127.0.0.1:6543` dan siap melayani permintaan dari klien.

![Menjalankan Server Pyramid](img/cURL-1.png)

---

### B. Pengujian Layanan Data Mahasiswa (`/api/mahasiswa`)

Pengujian ini membuktikan bahwa seluruh operasi pengelolaan data mahasiswa berjalan sesuai rancangan, meliputi penampilan daftar dan rincian data, penambahan data baru, penolakan data tidak lengkap, pembaruan data, penghapusan data, serta pemeriksaan status data tidak ditemukan.

1. **Menampilkan Daftar Mahasiswa, Detail Mahasiswa, Penambahan Data Baru (`200 OK`), dan Validasi Data Tanpa NIM (`400 Bad Request`)**  
   ![Pengujian Mahasiswa Bagian 1](img/cek-1.png)

2. **Pembaruan Data Mahasiswa (`200 OK`), Penghapusan Data (`200 OK`), Verifikasi Data Terhapus (`404 Not Found`), serta Awal Pengambilan Daftar Matakuliah (`200 OK`)**  
   ![Pengujian Mahasiswa Bagian 2](img/cek-2.png)

---

### C. Pengujian Layanan Data Matakuliah (`/api/matakuliah`)

Pengujian ini membuktikan bahwa seluruh operasi pengelolaan data mata kuliah bekerja dengan baik, termasuk validasi isian wajib, penolakan nilai SKS nol atau negatif, pembaruan data, penghapusan data, dan pemeriksaan status tidak ditemukan pasca-penghapusan.

1. **Menampilkan Daftar dan Detail Matakuliah (`200 OK`), Penambahan Matakuliah Baru (`200 OK`), Validasi Isian Tidak Lengkap (`400 Bad Request`), dan Validasi SKS Nol (`400 Bad Request`)**  
   ![Pengujian Matakuliah Bagian 1](img/cek-3.png)

2. **Pembaruan Data Matakuliah (`200 OK`), Validasi SKS Negatif (`400 Bad Request`), Penghapusan Matakuliah (`200 OK`), dan Verifikasi Data Terhapus (`404 Not Found`)**  
   ![Pengujian Matakuliah Bagian 2](img/cek-4.png)
