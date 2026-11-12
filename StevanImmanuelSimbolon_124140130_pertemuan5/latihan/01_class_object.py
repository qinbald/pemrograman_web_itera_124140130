# LATIHAN CLASS DAN OBJECT - SISTEM TOKO ONLINE SEDERHANA
# Materi: class, object, constructor __init__, method perilaku
#         (contoh kasus: Produk, Keranjang, Pengguna)

# CLASS PRODUK
# Class ini untuk menyimpan data sebuah barang di toko.
class Produk:

    # Constructor: dijalankan saat objek Produk dibuat
    def __init__(self, nama_produk, harga_produk, stok_produk):
        # Atribut 1: nama barang
        self.nama_produk = nama_produk
        # Atribut 2: harga satu barang
        self.harga_produk = harga_produk
        # Atribut 3: jumlah stok yang tersedia
        self.stok_produk = stok_produk

    # Method 1: menampilkan data produk ke layar
    def tampilkan_produk(self):
        # Cetak nama, harga, dan stok
        print("Nama barang :", self.nama_produk)
        print("Harga barang:", self.harga_produk)
        print("Stok barang :", self.stok_produk)

    # Method 2: menghitung harga untuk beberapa barang
    def hitung_harga(self, jumlah_beli):
        # Kalikan harga satu barang dengan jumlah beli
        total_harga = self.harga_produk * jumlah_beli
        # Kembalikan hasilnya
        return total_harga

    # Method 3: mengurangi stok barang setelah dibeli
    def kurangi_stok(self, jumlah_beli):
        # Periksa apakah stok masih cukup
        if jumlah_beli <= self.stok_produk:
            # Kurangi stok dengan jumlah beli
            self.stok_produk = self.stok_produk - jumlah_beli
            # Beri tanda berhasil
            return True
        else:
            # Stok tidak cukup, beri tanda gagal
            return False

# CLASS KERANJANG
# Class ini untuk menyimpan barang belanjaan pengguna.
class Keranjang:

    # Constructor: keranjang baru selalu kosong
    def __init__(self, nama_pemilik, kode_keranjang, batas_barang):
        # Atribut 1: nama orang pemilik keranjang
        self.nama_pemilik = nama_pemilik
        # Atribut 2: kode keranjang
        self.kode_keranjang = kode_keranjang
        # Atribut 3: batas maksimal barang yang bisa masuk
        self.batas_barang = batas_barang
        # Atribut tambahan: daftar barang yang sudah masuk
        self.daftar_barang = []
        # Atribut tambahan: daftar jumlah dari setiap barang
        self.daftar_jumlah = []

    # Method 1: menambahkan barang ke keranjang
    def tambah_barang(self, produk, jumlah_beli):
        # Periksa apakah keranjang masih muat
        if len(self.daftar_barang) >= self.batas_barang:
            # Beri tahu kalau keranjang penuh
            print("Keranjang sudah penuh.")
            return False

        # Coba kurangi stok barang
        stok_cukup = produk.kurangi_stok(jumlah_beli)

        # Kalau stok tidak cukup, batalkan
        if stok_cukup == False:
            # Beri tahu kalau stok habis
            print("Stok", produk.nama_produk, "tidak cukup.")
            return False

        # Simpan barang ke daftar barang
        self.daftar_barang.append(produk)
        # Simpan jumlahnya ke daftar jumlah
        self.daftar_jumlah.append(jumlah_beli)
        # Beri tahu berhasil
        print(produk.nama_produk, "masuk keranjang.")
        return True

    # Method 2: menghitung total semua belanjaan
    def hitung_total(self):
        # Mulai dari angka nol
        total = 0
        # Ulangi semua barang yang ada di keranjang
        for posisi in range(len(self.daftar_barang)):
            # Ambil satu barang
            produk = self.daftar_barang[posisi]
            # Ambil jumlah belinya
            jumlah = self.daftar_jumlah[posisi]
            # Tambahkan harga barang ke total
            total = total + produk.hitung_harga(jumlah)
        # Kembalikan total belanja
        return total

    # Method 3: menampilkan semua isi keranjang
    def tampilkan_keranjang(self):
        # Cetak nama pemilik
        print("Pemilik :", self.nama_pemilik)
        # Cetak kode keranjang
        print("Kode    :", self.kode_keranjang)
        # Kalau kosong, tampilkan pesan
        if len(self.daftar_barang) == 0:
            print("Keranjang masih kosong.")
        else:
            # Ulangi dan cetak semua barang
            for posisi in range(len(self.daftar_barang)):
                produk = self.daftar_barang[posisi]
                jumlah = self.daftar_jumlah[posisi]
                subtotal = produk.hitung_harga(jumlah)
                print("-", produk.nama_produk, "x", jumlah, "= Rp", subtotal)

# CLASS PENGGUNA
# Class ini untuk menyimpan data orang yang berbelanja.
class Pengguna:

    # Constructor: data awal pengguna
    def __init__(self, nama_lengkap, alamat_email, saldo_dompet):
        # Atribut 1: nama lengkap pengguna
        self.nama_lengkap = nama_lengkap
        # Atribut 2: email pengguna
        self.alamat_email = alamat_email
        # Atribut 3: saldo uang di dompet
        self.saldo_dompet = saldo_dompet

    # Method 1: menampilkan data pengguna
    def tampilkan_pengguna(self):
        # Cetak nama, email, dan saldo
        print("Nama  :", self.nama_lengkap)
        print("Email :", self.alamat_email)
        print("Saldo : Rp", self.saldo_dompet)

    # Method 2: menambah saldo dompet
    def isi_dompet(self, jumlah_isi):
        # Tambahkan jumlah isi ke saldo lama
        self.saldo_dompet = self.saldo_dompet + jumlah_isi
        # Beri tahu saldo terbaru
        print("Saldo sekarang: Rp", self.saldo_dompet)

    # Method 3: membayar belanjaan
    def bayar(self, jumlah_bayar):
        # Periksa apakah saldo cukup
        if jumlah_bayar <= self.saldo_dompet:
            # Kurangi saldo
            self.saldo_dompet = self.saldo_dompet - jumlah_bayar
            # Beri tahu pembayaran berhasil
            print("Pembayaran berhasil. Sisa saldo: Rp", self.saldo_dompet)
            return True
        else:
            # Saldo tidak cukup
            print("Saldo tidak cukup.")
            return False

# BAGIAN PROGRAM UTAMA
# Bagian ini hanya contoh untuk mencoba class di atas.
if __name__ == "__main__":

    # Membuat satu barang
    barang_buku = Produk("Buku Tulis", 5000, 20)

    # Membuat satu pengguna
    pengguna_ani = Pengguna("Maximus", "Maximus@email.com", 50000)

    # Membuat satu keranjang untuk pengguna tersebut
    keranjang_ani = Keranjang("Maximus", "KERANJANG-01", 5)

    # Tampilkan data awal
    barang_buku.tampilkan_produk()
    print()
    pengguna_ani.tampilkan_pengguna()
    print()

    # Masukkan 3 buku ke keranjang
    keranjang_ani.tambah_barang(barang_buku, 3)
    # Tampilkan isi keranjang
    keranjang_ani.tampilkan_keranjang()

    # Hitung total belanja
    total_belanja = keranjang_ani.hitung_total()
    print("Total belanja: Rp", total_belanja)

    # Bayar belanjaan
    pengguna_ani.bayar(total_belanja)

    # Tampilkan sisa stok setelah dibeli
    print("Sisa stok buku:", barang_buku.stok_produk)

    # Pemeriksaan sederhana supaya hasil pasti benar
    assert barang_buku.stok_produk == 17
    assert total_belanja == 15000
    assert pengguna_ani.saldo_dompet == 35000
    print("Semua pemeriksaan lolos.")
