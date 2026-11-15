# main.py
# Skrip eksekusi sistem manajemen perpustakaan.
# Mendukung mode interaktif (CLI menu) dan mode demonstrasi otomatis.
# Jalankan dengan: python main.py
# Atau langsung demo dengan: python main.py --demo

import sys
from library_item import Book, Magazine
from library import Library

def tampilkan_judul_bagian(teks_judul):
    """Fungsi helper untuk mencetak header bagian di terminal."""
    print()
    print("--------------------------------------------------")
    print(teks_judul)
    print("--------------------------------------------------")

def inisialisasi_data_awal(perpustakaan, tampilkan_pesan=True):
    """Mengisi perpustakaan dengan beberapa data awal untuk pengujian."""
    buku_satu = Book("B001", "Jerusalem: The Biography", 2011, "Simon Sebag Montefiore", 688)
    buku_dua = Book("B002", "The Borrowed", 2014, "Chan Ho-Kei", 496)
    buku_tiga = Book("B003", "Sapiens: A Brief History of Humankind", 2011, "Yuval Noah Harari", 498)

    majalah_satu = Magazine("M001", "Majalah Komputer Edisi Juli", 2023, 7, "Media Digital")
    majalah_dua = Magazine("M002", "Majalah Sains Populer", 2022, 12, "Sains Nusantara")

    perpustakaan.tambah_item(buku_satu, tampilkan_pesan=tampilkan_pesan)
    perpustakaan.tambah_item(buku_dua, tampilkan_pesan=tampilkan_pesan)
    perpustakaan.tambah_item(buku_tiga, tampilkan_pesan=tampilkan_pesan)
    perpustakaan.tambah_item(majalah_satu, tampilkan_pesan=tampilkan_pesan)
    perpustakaan.tambah_item(majalah_dua, tampilkan_pesan=tampilkan_pesan)

    return buku_satu, buku_dua, buku_tiga, majalah_satu, majalah_dua

def jalankan_demonstrasi_otomatis():
    """Menjalankan seluruh alur demonstrasi fitur dan pengujian otomatis (assert)."""
    print("Menjalankan demonstrasi otomatis sistem perpustakaan...")

    # 1. MEMBUAT PERPUSTAKAAN
    tampilkan_judul_bagian("1. MEMBUAT PERPUSTAKAAN")
    perpustakaan_kampus = Library("Perpustakaan Kampus")
    print("Perpustakaan dibuat: " + perpustakaan_kampus.nama)

    # 2. MENAMBAHKAN ITEM
    tampilkan_judul_bagian("2. MENAMBAHKAN ITEM")
    buku_satu, buku_dua, buku_tiga, majalah_satu, majalah_dua = inisialisasi_data_awal(perpustakaan_kampus, tampilkan_pesan=True)

    # Uji coba menambah item dengan id ganda
    print()
    print("-- Uji coba id ganda --")
    buku_id_ganda = Book("B001", "Buku Duplikat", 2024, "Penulis Lain", 100)
    perpustakaan_kampus.tambah_item(buku_id_ganda)

    # 3. MENAMPILKAN KATALOG
    tampilkan_judul_bagian("3. KATALOG PERPUSTAKAAN")
    perpustakaan_kampus.tampilkan_katalog()

    # 4. MENCARI ITEM
    tampilkan_judul_bagian("4. PENCARIAN ITEM")
    perpustakaan_kampus.tampilkan_hasil_pencarian("B002")
    perpustakaan_kampus.tampilkan_hasil_pencarian("borrowed")
    perpustakaan_kampus.tampilkan_hasil_pencarian("SAPIENS")
    perpustakaan_kampus.tampilkan_hasil_pencarian("Fisika Kuantum")

    # 5. DEMONSTRASI STATUS KETERSEDIAAN
    tampilkan_judul_bagian("5. STATUS KETERSEDIAAN ITEM")
    print("-- Meminjam buku B001 --")
    buku_satu.pinjam()

    print("-- Meminjam buku B001 lagi --")
    buku_satu.pinjam()
    print()

    print("-- Mengembalikan majalah M001 --")
    majalah_satu.kembalikan()
    print()

    print("-- Katalog setelah perubahan status --")
    perpustakaan_kampus.tampilkan_katalog()

    # 6. HITUNG DENDA
    tampilkan_judul_bagian("6. HITUNG DENDA KETERLAMBATAN")
    hari_terlambat = 5
    print("Hari terlambat: " + str(hari_terlambat))
    print()

    denda_buku = buku_satu.hitung_denda(hari_terlambat)
    print("Denda buku '" + buku_satu.judul + "': Rp " + str(denda_buku))

    denda_majalah = majalah_satu.hitung_denda(hari_terlambat)
    print("Denda majalah '" + majalah_satu.judul + "': Rp " + str(denda_majalah))

    # 7. PEMERIKSAAN OTOMATIS
    tampilkan_judul_bagian("7. PEMERIKSAAN HASIL")
    assert perpustakaan_kampus.jumlah_item == 5
    assert buku_satu.is_dipinjam == True
    assert majalah_satu.is_dipinjam == False
    assert perpustakaan_kampus.cari_item("B002") == buku_dua
    assert perpustakaan_kampus.cari_item("JERUSALEM") == buku_satu
    assert perpustakaan_kampus.cari_item("sapiens") == buku_tiga
    assert denda_buku == 5000
    assert denda_majalah == 2500

    print("Semua pemeriksaan lolos.")
    print("Program selesai.")

def aksi_tambah_buku(perpustakaan):
    """Sub-menu interaktif untuk menambahkan buku baru."""
    print("\n--- Tambah Buku Baru ---")
    id_item = input("Masukkan ID Buku (contoh: B004): ").strip()
    if not id_item:
        print("Peringatan: ID Buku tidak boleh kosong.")
        return

    judul = input("Masukkan Judul Buku: ").strip()
    if not judul:
        print("Peringatan: Judul Buku tidak boleh kosong.")
        return

    try:
        tahun_terbit = int(input("Masukkan Tahun Terbit: ").strip())
        halaman = int(input("Masukkan Jumlah Halaman: ").strip())
    except ValueError:
        print("Gagal: Tahun terbit dan jumlah halaman harus berupa angka.")
        return

    penulis = input("Masukkan Nama Penulis: ").strip()
    buku_baru = Book(id_item, judul, tahun_terbit, penulis, halaman)
    perpustakaan.tambah_item(buku_baru)

def aksi_tambah_majalah(perpustakaan):
    """Sub-menu interaktif untuk menambahkan majalah baru."""
    print("\n--- Tambah Majalah Baru ---")
    id_item = input("Masukkan ID Majalah (contoh: M003): ").strip()
    if not id_item:
        print("Peringatan: ID Majalah tidak boleh kosong.")
        return

    judul = input("Masukkan Judul Majalah: ").strip()
    if not judul:
        print("Peringatan: Judul Majalah tidak boleh kosong.")
        return

    try:
        tahun_terbit = int(input("Masukkan Tahun Terbit: ").strip())
        nomor_edisi = int(input("Masukkan Nomor Edisi: ").strip())
    except ValueError:
        print("Gagal: Tahun terbit dan nomor edisi harus berupa angka.")
        return

    penerbit = input("Masukkan Nama Penerbit: ").strip()
    majalah_baru = Magazine(id_item, judul, tahun_terbit, nomor_edisi, penerbit)
    perpustakaan.tambah_item(majalah_baru)

def aksi_cari_item(perpustakaan):
    """Sub-menu interaktif untuk mencari item."""
    print("\n--- Cari Item ---")
    kata_kunci = input("Masukkan ID atau kata kunci judul: ").strip()
    if not kata_kunci:
        print("Peringatan: Kata kunci pencarian tidak boleh kosong.")
        return
    perpustakaan.tampilkan_hasil_pencarian(kata_kunci)

def aksi_pinjam_item(perpustakaan):
    """Sub-menu interaktif untuk meminjam item."""
    print("\n--- Pinjam Item ---")
    kata_kunci = input("Masukkan ID atau judul item yang ingin dipinjam: ").strip()
    if not kata_kunci:
        print("Peringatan: Masukan tidak boleh kosong.")
        return

    item = perpustakaan.cari_item(kata_kunci)
    if item is None:
        print("Item '" + kata_kunci + "' tidak ditemukan.")
    else:
        item.pinjam()

def aksi_kembalikan_item(perpustakaan):
    """Sub-menu interaktif untuk mengembalikan item."""
    print("\n--- Kembalikan Item ---")
    kata_kunci = input("Masukkan ID atau judul item yang ingin dikembalikan: ").strip()
    if not kata_kunci:
        print("Peringatan: Masukan tidak boleh kosong.")
        return

    item = perpustakaan.cari_item(kata_kunci)
    if item is None:
        print("Item '" + kata_kunci + "' tidak ditemukan.")
    else:
        item.kembalikan()

def aksi_hitung_denda(perpustakaan):
    """Sub-menu interaktif untuk menghitung denda keterlambatan."""
    print("\n--- Hitung Denda Keterlambatan ---")
    kata_kunci = input("Masukkan ID atau judul item: ").strip()
    if not kata_kunci:
        print("Peringatan: Masukan tidak boleh kosong.")
        return

    item = perpustakaan.cari_item(kata_kunci)
    if item is None:
        print("Item '" + kata_kunci + "' tidak ditemukan.")
        return

    try:
        hari = int(input("Masukkan jumlah hari keterlambatan: ").strip())
        if hari < 0:
            print("Jumlah hari keterlambatan tidak boleh negatif.")
            return
    except ValueError:
        print("Gagal: Jumlah hari harus berupa angka bulat.")
        return

    denda = item.hitung_denda(hari)
    print("Item   : " + item.get_detail())
    print("Denda  : Rp " + str(denda) + " (untuk " + str(hari) + " hari keterlambatan)")

def menu_interaktif():
    """Loop utama untuk menjalankan program dalam mode interaktif (CLI menu)."""
    perpustakaan = Library("Perpustakaan Kampus")
    inisialisasi_data_awal(perpustakaan, tampilkan_pesan=False)

    while True:
        print()
        print("--------------------------------------------------")
        print("    SISTEM MANAJEMEN PERPUSTAKAAN (OOP PYTHON)    ")
        print("--------------------------------------------------")
        print("1. Tampilkan Seluruh Katalog")
        print("2. Cari Item (Berdasarkan ID / Judul)")
        print("3. Tambah Buku Baru")
        print("4. Tambah Majalah Baru")
        print("5. Pinjam Item")
        print("6. Kembalikan Item")
        print("7. Hitung Denda Keterlambatan")
        print("8. Jalankan Demo Otomatis & Pemeriksaan (Assert)")
        print("0. Keluar")
        print("--------------------------------------------------")

        pilihan = input("Pilih menu [0-8]: ").strip()

        if pilihan == "1":
            print()
            perpustakaan.tampilkan_katalog()
        elif pilihan == "2":
            aksi_cari_item(perpustakaan)
        elif pilihan == "3":
            aksi_tambah_buku(perpustakaan)
        elif pilihan == "4":
            aksi_tambah_majalah(perpustakaan)
        elif pilihan == "5":
            aksi_pinjam_item(perpustakaan)
        elif pilihan == "6":
            aksi_kembalikan_item(perpustakaan)
        elif pilihan == "7":
            aksi_hitung_denda(perpustakaan)
        elif pilihan == "8":
            jalankan_demonstrasi_otomatis()
        elif pilihan == "0":
            print("\nTerima kasih telah menggunakan Sistem Perpustakaan. Sampai jumpa!")
            break
        else:
            print("\nPilihan tidak valid. Silakan masukkan angka 0 sampai 8.")

if __name__ == "__main__":
    # Jika dijalankan dengan argumen --demo atau -d, jalankan demonstrasi otomatis langsung
    if len(sys.argv) > 1 and sys.argv[1].lower() in ("--demo", "-d", "demo"):
        jalankan_demonstrasi_otomatis()
    else:
        menu_interaktif()
