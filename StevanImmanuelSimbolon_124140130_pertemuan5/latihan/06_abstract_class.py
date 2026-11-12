# LATIHAN ABSTRACT CLASS - FILE STORAGE SERVICE
# Materi: abstract base class ABC, @abstractmethod, pass

# Kita mengambil dua hal dari modul abc:
# ABC  -> class dasar supaya class kita jadi "abstract"
# abstractmethod -> penanda bahwa method WAJIB dibuat
#                   ulang oleh class turunannya
from abc import ABC, abstractmethod

# ABSTRACT BASE CLASS: FILESTORAGE
# Class ini adalah "cetak biru" atau "kontrak".
# Ia tidak bisa dipakai langsung untuk membuat objek.
class FileStorage(ABC):

    # @abstractmethod artinya: method ini hanya rancangan.
    # Setiap class anak WAJIB menulis ulang method ini.
    # Kalau tidak ditulis ulang, class anak tidak bisa
    # dipakai untuk membuat objek.
    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        # Tanda "pass" artinya: di sini belum ada isi kode.
        # Kita sengaja mengosongkan isinya karena class induk
        # hanya memberi contoh bentuk method, bukan isi aslinya.
        # Isi aslinya nanti ditulis di class turunan.
        pass

    # Method abstrak kedua dengan nama download_file.
    # Penjelasannya sama seperti di atas.
    @abstractmethod
    def download_file(self, nama_file):
        # "pass" berarti isi method dikosongkan dulu.
        # Class turunan yang akan mengisi.
        pass

# CLASS TURUNAN 1: LOCALDISKSTORAGE
# Menyimpan file di hard disk komputer sendiri.
class LocalDiskStorage(FileStorage):

    # Menulis ulang (override) method upload_file
    def upload_file(self, nama_file, data_bytes):
        # Hitung ukuran data dalam kilobyte sederhana
        ukuran_data = len(data_bytes)
        # Cetak proses upload ke hard disk
        print("[LocalDisk] Mengunggah file:", nama_file)
        print("[LocalDisk] Ukuran data:", ukuran_data, "byte")
        print("[LocalDisk] Disimpan ke folder /data lokal")
        print()

    # Menulis ulang (override) method download_file
    def download_file(self, nama_file):
        # Cetak proses download dari hard disk
        print("[LocalDisk] Mengunduh file:", nama_file)
        print("[LocalDisk] Membaca dari folder /data lokal")
        print()

# CLASS TURUNAN 2: CLOUDSTORAGE
# Menyimpan file di server cloud (internet).
class CloudStorage(FileStorage):

    # Menulis ulang (override) method upload_file
    def upload_file(self, nama_file, data_bytes):
        # Hitung ukuran data dalam kilobyte sederhana
        ukuran_data = len(data_bytes)
        # Cetak proses upload ke cloud
        print("[Cloud] Mengunggah file:", nama_file)
        print("[Cloud] Ukuran data:", ukuran_data, "byte")
        print("[Cloud] Dikirim ke server cloud lewat internet")
        print()

    # Menulis ulang (override) method download_file
    def download_file(self, nama_file):
        # Cetak proses download dari cloud
        print("[Cloud] Mengunduh file:", nama_file)
        print("[Cloud] Mengambil dari server cloud lewat internet")
        print()

# BAGIAN PROGRAM UTAMA
# Bagian ini hanya contoh untuk mencoba class di atas.
if __name__ == "__main__":

    print("=== UJI COBA LOCAL DISK STORAGE ===")
    # Membuat objek dari class LocalDiskStorage
    penyimpanan_lokal = LocalDiskStorage()
    # Memanggil method yang sudah ditulis ulang
    penyimpanan_lokal.upload_file("foto_produk.jpg", b"isidatafoto")
    penyimpanan_lokal.download_file("foto_produk.jpg")

    print("=== UJI COBA CLOUD STORAGE ===")
    # Membuat objek dari class CloudStorage
    penyimpanan_awan = CloudStorage()
    # Memanggil method yang sudah ditulis ulang
    penyimpanan_awan.upload_file("video_promo.mp4", b"isidataevideo")
    penyimpanan_awan.download_file("video_promo.mp4")

    # PEMBUKTIAN ERROR
    # Class abstract TIDAK BISA dibuat objeknya langsung.
    # Kita bungkus dengan try-except supaya program
    # tidak berhenti mendadak.
    print("=== UJI COBA MEMBUAT OBJEK DARI CLASS ABSTRACT ===")
    try:
        # Baris ini sengaja salah. Python akan menolak
        # karena FileStorage masih punya method abstrak
        # yang belum ditulis ulang.
        # Komentar "type: ignore" hanya meredam peringatan
        # editor, bukan mengubah jalan program.
        penyimpanan_abstract = FileStorage()  # type: ignore[abstract]
        # Baris di bawah tidak akan pernah dijalankan
        print("Objek berhasil dibuat:", penyimpanan_abstract)
    except TypeError as pesan_error:
        # Tampilkan pesan error dari Python
        print("Gagal membuat objek abstract.")
        print("Pesan error:", pesan_error)

    print()

    # Pemeriksaan sederhana: kedua objek tetap dianggap
    # bagian dari FileStorage, jadi kode ini tidak error.
    assert isinstance(penyimpanan_lokal, FileStorage)
    assert isinstance(penyimpanan_awan, FileStorage)
    print("Semua pemeriksaan lolos.")
