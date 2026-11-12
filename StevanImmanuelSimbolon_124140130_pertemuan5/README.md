# Pertemuan 5 — Object-Oriented Programming (OOP) di Python

## Identitas Mahasiswa

| Keterangan      | Isi                       |
| --------------- | ------------------------- |
| Nama Lengkap    | Stevan Immanuel Simbolon  |
| NIM             | 124140130                 |
| Kelas Praktikum | RB                        |
| Mata Kuliah     | Pengembangan Aplikasi Web |

## Struktur Folder

```
StevanImmanuelSimbolon_124140130_pertemuan5/
├── latihan/
│   ├── 01_class_object.py
│   ├── 02_dunder_method.py
│   ├── 03_inheritance.py
│   ├── 04_encapsulation.py
│   ├── 05_polymorphism.py
│   └── 06_abstract_class.py
├── tugas_perpustakaan/
│   ├── library_item.py
│   ├── library.py
│   └── main.py
├── img/
├── README.md
└── .gitignore
```

## Daftar Latihan

| File                   | Materi                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `01_class_object.py`   | Class, object, constructor, 3 entitas toko online          |
| `02_dunder_method.py`  | Instance method, dunder `__str__` dan `__len__`            |
| `03_inheritance.py`    | Pewarisan class, `super()`, method overriding              |
| `04_encapsulation.py`  | Atribut private, `@property`, getter, setter, `ValueError` |
| `05_polymorphism.py`   | Method sama pada class berbeda                             |
| `06_abstract_class.py` | `ABC`, `@abstractmethod`, `pass`                           |

Setiap file latihan punya blok `if __name__ == "__main__"` berisi contoh
pemakaian dan `assert` sederhana sebagai pemeriksaan hasil.

---

# Tugas — Sistem Manajemen Perpustakaan Sederhana

## Deskripsi Program

Program ini adalah simulasi sistem perpustakaan sederhana yang dibuat dengan
Python dan menerapkan empat pilar OOP.

### Alur Program

1. `main.py` membuat objek `Library` (perpustakaan).
2. Objek `Book` dan `Magazine` dibuat, lalu dimasukkan ke perpustakaan
   lewat `tambah_item()`. Id yang sudah dipakai akan ditolak.
3. `tampilkan_katalog()` mencetak semua item beserta status ketersediaannya.
4. `cari_item()` / `tampilkan_hasil_pencarian()` mencari item berdasarkan
   `id_item` atau potongan judul. Pencarian judul tidak membedakan huruf
   besar dan kecil.
5. `pinjam()` dan `kembalikan()` mengubah status item.
6. `hitung_denda()` menghitung denda keterlambatan sesuai tarif tiap jenis item.
7. Di akhir, `assert` memeriksa apakah hasil sesuai harapan.

### Penerapan 4 Pilar OOP

**1. Class dan Object**

Setiap entitas dibuat sebagai class: `LibraryItem`, `Book`, `Magazine`,
dan `Library`. Objek nyata dibuat dari class tersebut di `main.py`,
misalnya `buku_satu = Book("B001", "Jerusalem: The Biography", 2011, ...)`.

**2. Inheritance (Pewarisan)**

`Book` dan `Magazine` mewarisi `LibraryItem`. Constructor keduanya memanggil
`super().__init__(...)` sehingga atribut dasar (`_id_item`, `_judul`,
`_tahun_terbit`, `__sedang_dipinjam`) tidak perlu ditulis ulang. Method
`pinjam()` dan `kembalikan()` juga diwarisi tanpa duplikasi kode.

**3. Encapsulation (Pembungkusan)**

- **Protected** (satu garis bawah): `_id_item`, `_judul`, `_tahun_terbit`,
  `_penulis`, `_nomor_edisi`, `_nama`. Boleh dibaca subclass, tetapi
  tidak untuk diubah bebas dari luar.
- **Private** (dua garis bawah): `__sedang_dipinjam` di `LibraryItem` dan
  `__koleksi` di `Library`. Keduanya hanya bisa diakses dari dalam class
  masing-masing.
- **Property decorator**: `is_dipinjam`, `id_item`, `judul`, `jumlah_item`,
  dan `nama`. Akses baca seperti atribut biasa (`item.is_dipinjam`),
  tanpa membuka data aslinya untuk ditulis dari luar.

**4. Polymorphism**

`Library.tampilkan_katalog()` menjalankan satu perulangan yang sama:
`item.get_detail()`. Objek di dalamnya bisa `Book` atau `Magazine`, dan
setiap objek menjalankan versi method-nya sendiri. Hal yang sama terjadi
pada `hitung_denda()`: satu pemanggilan, tarif berbeda (buku Rp 1.000/hari,
majalah Rp 500/hari).

**5. Abstract Class**

`LibraryItem(ABC)` punya dua `@abstractmethod`: `get_detail()` dan
`hitung_denda()`. Keduanya wajib diimplementasikan subclass. Karena itu
`LibraryItem()` tidak bisa dibuat objeknya secara langsung.

## Struktur Berkas Tugas

```
tugas_perpustakaan/
├── library_item.py   abstract class LibraryItem + Book + Magazine
├── library.py        class Library (kelola koleksi)
└── main.py           skrip eksekusi dan pengujian
```

## Panduan Menjalankan Program

Latihan:

```bash
cd latihan
python 01_class_object.py
```

Tugas:

```bash
cd tugas_perpustakaan
python main.py
```

Tidak ada library tambahan yang perlu dipasang. Program hanya memakai
modul bawaan Python (`abc`).

## Fitur yang Didemonstrasikan

| Fitur                     | Method / Bagian                                 | Lokasi di `main.py` |
| ------------------------- | ----------------------------------------------- | ------------------- |
| Menambah item             | `Library.tambah_item()`                         | bagian 2            |
| Menolak id ganda          | `Library.cari_item()` di dalam `tambah_item()`  | bagian 2            |
| Menampilkan katalog       | `Library.tampilkan_katalog()`                   | bagian 3, 5         |
| Mencari berdasarkan id    | `Library.tampilkan_hasil_pencarian("B002")`     | bagian 4            |
| Mencari berdasarkan judul | `Library.tampilkan_hasil_pencarian("borrowed")` | bagian 4            |
| Status ketersediaan       | `pinjam()` / `kembalikan()`                     | bagian 5            |
| Hitung denda              | `hitung_denda()`                                | bagian 6            |
| Pemeriksaan otomatis      | `assert`                                        | bagian 7            |

## Contoh Keluaran

```
=== KATALOG Perpustakaan Kampus ===
[BUKU] B001 | Jerusalem: The Biography (2011) | Penulis: Simon Sebag Montefiore | Halaman: 688 -> SEDANG DIPINJAM
[BUKU] B002 | The Borrowed (2014) | Penulis: Chan Ho-Kei | Halaman: 496 -> TERSEDIA
[BUKU] B003 | Sapiens: A Brief History of Humankind (2011) | Penulis: Yuval Noah Harari | Halaman: 498 -> TERSEDIA
[MAJALAH] M001 | Majalah Komputer Edisi Juli (2023) | Edisi: 7 | Penerbit: Media Digital -> TERSEDIA
[MAJALAH] M002 | Majalah Sains Populer (2022) | Edisi: 12 | Penerbit: Sains Nusantara -> TERSEDIA
Total item: 5
```

## Screenshot Output

Letakkan tangkapan layar terminal di folder `img/`, lalu ganti tabel di
bawah ini dengan gambar.

| Tangkapan Layar                      | Menampilkan                                 |
| ------------------------------------ | ------------------------------------------- |
| `img/tugas_perpustakaan_tambah.png`  | Proses menambah item dan penolakan id ganda |
| `img/tugas_perpustakaan_katalog.png` | Katalog perpustakaan beserta status item    |
| `img/tugas_perpustakaan_cari.png`    | Hasil pencarian berdasarkan id dan judul    |
