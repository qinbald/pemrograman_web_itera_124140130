# library.py
# Berisi class Library, yaitu pengelola koleksi item
# perpustakaan (menambah, menampilkan, dan mencari).

class Library:
    """Class pengelola koleksi perpustakaan.

    Atribut:
        __koleksi : list berisi semua item (private)
        _nama     : nama perpustakaan (protected)
    """

    def __init__(self, nama_perpustakaan):
        # Protected attribute: boleh dibaca subclass
        self._nama = nama_perpustakaan

        # Private attribute: hanya bisa diakses dari dalam class
        # Library. Dari luar cukup memakai property di bawah.
        # Inilah penerapan encapsulation pada class ini.
        self.__koleksi = []

    # PROPERTY DECORATOR
    # Memberi akses baca ke jumlah item tanpa membuka
    # list aslinya. Jadi isi __koleksi tidak bisa diubah
    # langsung dari luar class.
    @property
    def jumlah_item(self):
        # Cukup kembalikan panjang list
        return len(self.__koleksi)

    @property
    def nama(self):
        # Getter nama perpustakaan
        return self._nama

    # METHOD: tambah_item
    # Menambahkan satu item baru ke koleksi.
    def tambah_item(self, item_baru, tampilkan_pesan=True):
        """Menambahkan item ke koleksi perpustakaan."""
        # Periksa dulu apakah id sudah dipakai.
        # Kalau dipakai, jangan tambahkan supaya id tetap unik.
        if self.cari_item(item_baru.id_item) != None:
            if tampilkan_pesan:
                print("Gagal menambah: id " + item_baru.id_item + " sudah dipakai.")
            return False

        # Simpan item ke list private
        self.__koleksi.append(item_baru)
        if tampilkan_pesan:
            print("Berhasil menambah: " + item_baru.judul)
        return True

    # METHOD: tampilkan_katalog
    # Menampilkan semua item beserta status pinjamnya.
    def tampilkan_katalog(self):
        """Menampilkan daftar semua item yang tersedia."""
        print("=== KATALOG " + self._nama + " ===")

        # Kalau koleksi masih kosong, beri tahu
        if len(self.__koleksi) == 0:
            print("Belum ada item di perpustakaan.")
            return

        # Perulangan konvensional untuk semua item.
        # POLYMORPHISM: kita hanya memanggil item.get_detail(),
        # padahal aslinya bisa Book atau Magazine. Setiap objek
        # menjalankan versinya sendiri, jadi hasil cetaknya
        # menyesuaikan jenis item.
        for item in self.__koleksi:
            # Ambil teks detail dari objek tersebut
            teks_detail = item.get_detail()

            # Tentukan status untuk ditampilkan
            if item.is_dipinjam == True:
                status = "SEDANG DIPINJAM"
            else:
                status = "TERSEDIA"

            # Cetak satu baris hasil
            print(teks_detail + " -> " + status)

        print("Total item: " + str(self.jumlah_item))
        print()

    # METHOD: cari_item
    # Mencari item berdasarkan id ATAU judul.
    # Pencarian judul tidak membedakan huruf besar/kecil.
    def cari_item(self, kata_kunci):
        """Mencari item berdasarkan id atau judul.

        Mengembalikan objek item kalau ditemukan,
        atau None kalau tidak ada.
        """
        # Ubah kata kunci judul ke huruf kecil supaya
        # pencarian tidak sensitif huruf besar/kecil
        kata_kunci_kecil = kata_kunci.lower()

        for item in self.__koleksi:
            # Cek kecocokan id lebih dulu (harus sama persis)
            if item.id_item == kata_kunci:
                return item

            # Lalu cek kecocokan judul
            judul_kecil = item.judul.lower()
            if kata_kunci_kecil in judul_kecil:
                return item

        # Kalau loop selesai tanpa hasil
        return None

    # METHOD: tampilkan_hasil_pencarian
    # Membantu mencetak hasil pencarian dengan rapi.
    def tampilkan_hasil_pencarian(self, kata_kunci):
        """Mencari item lalu mencetak hasilnya."""
        print("=== PENCARIAN: " + kata_kunci + " ===")

        # Panggil cari_item untuk mendapatkan objeknya
        hasil = self.cari_item(kata_kunci)

        # Kalau tidak ketemu, beri tahu
        if hasil == None:
            print("Item tidak ditemukan.")
            print()
            return

        # Kalau ketemu, cetak detailnya (polymorphism juga di sini)
        print("Ditemukan: " + hasil.get_detail())

        # Tentukan teks status dulu, baru dicetak
        if hasil.is_dipinjam == True:
            status = "SEDANG DIPINJAM"
        else:
            status = "TERSEDIA"

        print("Status   : " + status)
        print()
