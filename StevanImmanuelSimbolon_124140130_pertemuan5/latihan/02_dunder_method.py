
# LATIHAN DUNDER METHOD - CLASS BUKU
# Materi: instance method, dunder __str__ dan __len__
#         (contoh kasus: kartu buku dan len(buku))

# CLASS BUKU
# Class ini menyimpan data satu buah buku.
class Buku:

    # Constructor: dijalankan saat objek Buku dibuat
    def __init__(self, judul, penulis, harga_asli, jumlah_halaman):
        # Atribut 1: judul buku
        self.judul = judul
        # Atribut 2: nama penulis buku
        self.penulis = penulis
        # Atribut 3: harga sebelum diskon
        self.harga_asli = harga_asli
        # Atribut 4: banyaknya halaman buku
        self.jumlah_halaman = jumlah_halaman

    # INSTANCE METHOD: hitung_harga_diskon
    # Menghitung harga setelah dipotong diskon.
    # Parameter "persen" adalah besar diskon dalam persen.
    def hitung_harga_diskon(self, persen):
        # Langkah 1: hitung nilai diskon dalam rupiah
        # Caranya: harga asli dikali persen, lalu dibagi 100
        nilai_diskon = self.harga_asli * persen
        nilai_diskon = nilai_diskon / 100

        # Langkah 2: kurangi harga asli dengan nilai diskon
        harga_setelah_diskon = self.harga_asli - nilai_diskon

        # Langkah 3: kembalikan hasil akhir
        return harga_setelah_diskon

    # DUNDER METHOD: __str__
    # Dipanggil otomatis saat kita memakai print(buku)
    # atau str(buku). Isinya "kartu buku".
    def __str__(self):
        # Susun teks kartu buku baris demi baris
        kartu_buku = ""
        kartu_buku = kartu_buku + "==============================\n"
        kartu_buku = kartu_buku + "      KARTU BUKU\n"
        kartu_buku = kartu_buku + "==============================\n"
        kartu_buku = kartu_buku + "Judul          : " + self.judul + "\n"
        kartu_buku = kartu_buku + "Penulis        : " + self.penulis + "\n"
        kartu_buku = kartu_buku + "Harga Asli     : Rp " + str(self.harga_asli) + "\n"
        kartu_buku = kartu_buku + "Jumlah Halaman : " + str(self.jumlah_halaman) + " halaman\n"
        kartu_buku = kartu_buku + "=============================="
        # Kembalikan teks kartu buku
        return kartu_buku

    # DUNDER METHOD: __len__
    # Dipanggil otomatis saat kita memakai len(buku).
    # Kita buat ia mengembalikan jumlah halaman.
    def __len__(self):
        # Kembalikan nilai jumlah halaman buku
        return self.jumlah_halaman

# BAGIAN PROGRAM UTAMA
# Bagian ini hanya contoh untuk mencoba class Buku.
if __name__ == "__main__":

    # Membuat satu objek buku
    buku_python = Buku("Belajar Python dari Nol", "Andi Wijaya", 100000, 250)

    # Memanggil __str__ lewat print(), jadi kartu buku tercetak
    print(buku_python)
    print()

    # Memanggil instance method hitung_harga_diskon
    # Contoh diskon 20 persen
    harga_diskon = buku_python.hitung_harga_diskon(20)
    print("Harga setelah diskon 20%: Rp", harga_diskon)
    print()

    # Memanggil __len__ lewat fungsi bawaan len()
    jumlah_halaman = len(buku_python)
    print("Jumlah halaman buku:", jumlah_halaman)

    # Pemeriksaan sederhana supaya hasil pasti benar
    assert harga_diskon == 80000
    assert len(buku_python) == 250
    print("Semua pemeriksaan lolos.")
