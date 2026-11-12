# main.py
# Skrip eksekusi untuk menguji sistem perpustakaan.
# Jalankan dengan: python main.py

# Mengambil class dari file modul yang sudah dibuat
from library_item import Book, Magazine
from library import Library

def tampilkan_judul_bagian(teks_judul):
    # Fungsi kecil untuk mempercantik tampilan terminal
    print()
    print("##################################################")
    print("# " + teks_judul)
    print("##################################################")

if __name__ == "__main__":

    # 1. MEMBUAT PERPUSTAKAAN
    tampilkan_judul_bagian("1. MEMBUAT PERPUSTAKAAN")
    perpustakaan_kampus = Library("Perpustakaan Kampus")
    print("Perpustakaan dibuat: " + perpustakaan_kampus.nama)

    # 2. MENAMBAHKAN ITEM
    # Book dan Magazine berbeda class, tetapi keduanya
    # sama-sama LibraryItem. Karena itu bisa disimpan
    # dalam satu koleksi yang sama.
    tampilkan_judul_bagian("2. MENAMBAHKAN ITEM")

    buku_satu = Book("B001", "Jerusalem: The Biography", 2011, "Simon Sebag Montefiore", 688)
    buku_dua = Book("B002", "The Borrowed", 2014, "Chan Ho-Kei", 496)
    buku_tiga = Book("B003", "Sapiens: A Brief History of Humankind", 2011, "Yuval Noah Harari", 498)

    majalah_satu = Magazine("M001", "Majalah Komputer Edisi Juli", 2023, 7, "Media Digital")
    majalah_dua = Magazine("M002", "Majalah Sains Populer", 2022, 12, "Sains Nusantara")

    perpustakaan_kampus.tambah_item(buku_satu)
    perpustakaan_kampus.tambah_item(buku_dua)
    perpustakaan_kampus.tambah_item(buku_tiga)
    perpustakaan_kampus.tambah_item(majalah_satu)
    perpustakaan_kampus.tambah_item(majalah_dua)

    # Uji coba menambah item dengan id yang sudah dipakai.
    # Ini seharusnya gagal karena id harus unik.
    print()
    print("-- Uji coba id ganda --")
    buku_id_ganda = Book("B001", "Buku Duplikat", 2024, "Penulis Lain", 100)
    perpustakaan_kampus.tambah_item(buku_id_ganda)

    # 3. MENAMPILKAN KATALOG
    # Di sini terlihat polymorphism: satu perulangan
    # memanggil get_detail() milik Book dan Magazine
    # sekaligus, dan hasilnya menyesuaikan jenis item.
    tampilkan_judul_bagian("3. KATALOG PERPUSTAKAAN")
    perpustakaan_kampus.tampilkan_katalog()

    # 4. MENCARI ITEM
    tampilkan_judul_bagian("4. PENCARIAN ITEM")

    # Cari memakai id
    perpustakaan_kampus.tampilkan_hasil_pencarian("B002")

    # Cari memakai judul (tidak sensitif huruf besar/kecil)
    perpustakaan_kampus.tampilkan_hasil_pencarian("borrowed")

    # Cari memakai potongan judul lain
    perpustakaan_kampus.tampilkan_hasil_pencarian("SAPIENS")

    # Cari judul yang tidak ada
    perpustakaan_kampus.tampilkan_hasil_pencarian("Fisika Kuantum")

    # 5. DEMONSTRASI STATUS KETERSEDIAAN
    tampilkan_judul_bagian("5. STATUS KETERSEDIAAN ITEM")

    # Pinjam satu buku
    print("-- Meminjam buku B001 --")
    buku_satu.pinjam()

    # Coba pinjam buku yang sama lagi, seharusnya gagal
    print("-- Meminjam buku B001 lagi --")
    buku_satu.pinjam()

    print()

    # Coba kembalikan buku yang tidak dipinjam, seharusnya gagal
    print("-- Mengembalikan majalah M001 --")
    majalah_satu.kembalikan()

    print()

    # Katalog setelah ada perubahan status
    print("-- Katalog setelah perubahan status --")
    perpustakaan_kampus.tampilkan_katalog()

    # 6. HITUNG DENDA
    # Book dan Magazine punya tarif denda berbeda,
    # tetapi method-nya sama: hitung_denda().
    tampilkan_judul_bagian("6. HITUNG DENDA KETERLAMBATAN")

    hari_terlambat = 5
    print("Hari terlambat: " + str(hari_terlambat))
    print()

    # Denda buku Rp 1.000 per hari
    denda_buku = buku_satu.hitung_denda(hari_terlambat)
    print("Denda buku '" + buku_satu.judul + "': Rp " + str(denda_buku))

    # Denda majalah Rp 500 per hari
    denda_majalah = majalah_satu.hitung_denda(hari_terlambat)
    print("Denda majalah '" + majalah_satu.judul + "': Rp " + str(denda_majalah))

    # 7. PEMERIKSAAN SEDERHANA
    tampilkan_judul_bagian("7. PEMERIKSAAN HASIL")

    # Semua item harus berjumlah 5 (id ganda ditolak)
    assert perpustakaan_kampus.jumlah_item == 5
    # Status buku B001 harus sedang dipinjam
    assert buku_satu.is_dipinjam == True
    # Majalah M001 harus tetap tersedia
    assert majalah_satu.is_dipinjam == False
    # Pencarian id harus mengembalikan objek yang benar
    assert perpustakaan_kampus.cari_item("B002") == buku_dua
    # Pencarian judul harus tidak sensitif huruf besar/kecil
    assert perpustakaan_kampus.cari_item("JERUSALEM") == buku_satu
    assert perpustakaan_kampus.cari_item("sapiens") == buku_tiga
    # Denda sesuai tarif masing-masing
    assert denda_buku == 5000
    assert denda_majalah == 2500

    print("Semua pemeriksaan lolos.")
    print("Program selesai.")
