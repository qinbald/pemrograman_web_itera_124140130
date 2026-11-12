# library_item.py
# Berisi abstract class LibraryItem sebagai dasar semua
# item perpustakaan, lalu dua subclass: Book dan Magazine.

# ABC dipakai supaya class kita bisa menjadi "abstract class",
# yaitu class yang tidak boleh dibuat objeknya langsung.
# abstractmethod dipakai untuk menandai method yang WAJIB
# ditulis ulang oleh setiap subclass.
from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """Abstract class dasar untuk semua item perpustakaan.

    Atribut:
        _id_item       : kode unik item (protected)
        _judul         : judul item (protected)
        _tahun_terbit  : tahun terbit (protected)
        __sedang_dipinjam : status pinjam (private)
    """

    def __init__(self, id_item, judul, tahun_terbit):
        # Protected attribute (satu garis bawah).
        # Artinya: boleh dibaca oleh subclass, tetapi
        # jangan diubah sembarangan dari luar class.
        self._id_item = id_item
        self._judul = judul
        self._tahun_terbit = tahun_terbit

        # Private attribute (dua garis bawah).
        # Hanya bisa diakses dari dalam class LibraryItem.
        # Inilah salah satu bentuk encapsulation.
        self.__sedang_dipinjam = False

    # PROPERTY DECORATOR
    # @property membuat method bisa dibaca seperti atribut.
    # Contoh pemakaian dari luar: item.is_dipinjam
    @property
    def id_item(self):
        # Getter: hanya boleh dibaca, tidak diubah dari luar
        return self._id_item

    @property
    def judul(self):
        # Getter untuk judul
        return self._judul

    @property
    def is_dipinjam(self):
        # Getter untuk status pinjam.
        # Karena memakai @property, pemakaiannya cukup
        # "item.is_dipinjam" tanpa tanda kurung.
        return self.__sedang_dipinjam

    # METHOD BIASA (bukan abstract), diwarisi semua subclass
    def pinjam(self):
        """Menandai item sebagai sedang dipinjam."""
        # Kalau sudah dipinjam, batalkan
        if self.__sedang_dipinjam == True:
            print("Gagal: " + self._judul + " sedang dipinjam.")
            return False

        # Kalau masih tersedia, ubah statusnya
        self.__sedang_dipinjam = True
        print("Berhasil meminjam: " + self._judul)
        return True

    def kembalikan(self):
        """Menandai item sebagai sudah dikembalikan."""
        # Kalau memang tidak sedang dipinjam, tidak perlu apa-apa
        if self.__sedang_dipinjam == False:
            print("Item " + self._judul + " memang tidak dipinjam.")
            return False

        # Ubah status kembali menjadi tersedia
        self.__sedang_dipinjam = False
        print("Berhasil mengembalikan: " + self._judul)
        return True

    # ABSTRACT METHOD
    # Isinya sengaja kosong (pass) karena setiap subclass
    # punya bentuk data dan aturan denda yang berbeda.
    @abstractmethod
    def get_detail(self):
        """Wajib diisi subclass: mengembalikan teks detail item."""
        pass

    @abstractmethod
    def hitung_denda(self, jumlah_hari_terlambat):
        """Wajib diisi subclass: menghitung denda keterlambatan."""
        pass

class Book(LibraryItem):
    """Buku perpustakaan, mewarisi LibraryItem.

    Atribut tambahan:
        _penulis        : nama penulis buku (protected)
        _jumlah_halaman : jumlah halaman (protected)
    """

    def __init__(self, id_item, judul, tahun_terbit, penulis, jumlah_halaman):
        # super() artinya: panggil constructor milik LibraryItem.
        # Jadi id, judul, dan tahun tidak perlu diulang di sini.
        super().__init__(id_item, judul, tahun_terbit)

        # Atribut khusus Book
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

        # Denda buku per hari terlambat
        self._denda_per_hari = 1000

    # Implementasi abstract method get_detail()
    def get_detail(self):
        # Susun teks detail dengan cara yang mudah dibaca pemula
        teks = "[BUKU] "
        teks = teks + self._id_item
        teks = teks + " | " + self._judul
        teks = teks + " (" + str(self._tahun_terbit) + ")"
        teks = teks + " | Penulis: " + self._penulis
        teks = teks + " | Halaman: " + str(self._jumlah_halaman)
        return teks

    # Implementasi abstract method hitung_denda()
    def hitung_denda(self, jumlah_hari_terlambat):
        # Denda buku = Rp 1.000 x jumlah hari terlambat
        return self._denda_per_hari * jumlah_hari_terlambat

class Magazine(LibraryItem):
    """Majalah perpustakaan, mewarisi LibraryItem.

    Atribut tambahan:
        _nomor_edisi  : nomor edisi majalah (protected)
        _penerbit     : nama penerbit (protected)
    """

    def __init__(self, id_item, judul, tahun_terbit, nomor_edisi, penerbit):
        # Panggil constructor milik LibraryItem
        super().__init__(id_item, judul, tahun_terbit)

        # Atribut khusus Magazine
        self._nomor_edisi = nomor_edisi
        self._penerbit = penerbit

        # Denda majalah lebih murah daripada buku
        self._denda_per_hari = 500

    # Implementasi abstract method get_detail()
    def get_detail(self):
        teks = "[MAJALAH] "
        teks = teks + self._id_item
        teks = teks + " | " + self._judul
        teks = teks + " (" + str(self._tahun_terbit) + ")"
        teks = teks + " | Edisi: " + str(self._nomor_edisi)
        teks = teks + " | Penerbit: " + self._penerbit
        return teks

    # Implementasi abstract method hitung_denda()
    def hitung_denda(self, jumlah_hari_terlambat):
        # Denda majalah = Rp 500 x jumlah hari terlambat
        return self._denda_per_hari * jumlah_hari_terlambat
