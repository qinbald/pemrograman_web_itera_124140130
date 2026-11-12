# LATIHAN ENCAPSULATION - PENGGAJIAN KARYAWAN
# Materi: atribut public, atribut private,
#         @property (getter) dan setter

# CLASS KARYAWAN
# Class ini menyimpan data seorang karyawan.
class Karyawan:

    # Constructor: dijalankan saat objek Karyawan dibuat
    def __init__(self, nama, jabatan, gaji_pokok):
        # Atribut public 1: nama karyawan (bisa diakses bebas)
        self.nama = nama
        # Atribut public 2: jabatan karyawan (bisa diakses bebas)
        self.jabatan = jabatan
        # Atribut private: gaji pokok
        # Dua garis bawah di depan (__) artinya atribut ini
        # tidak boleh diubah sembarangan dari luar class.
        self.__gaji_pokok = 0
        # Kita isi gaji lewat property (setter), supaya
        # aturan validasi tetap berjalan sejak awal.
        self.gaji_pokok = gaji_pokok

    # GETTER: cara membaca gaji pokok dari luar class
    # Dekorator @property membuat method ini bisa dipanggil
    # seperti atribut biasa, contoh: karyawan.gaji_pokok
    @property
    def gaji_pokok(self):
        # Kembalikan nilai gaji pokok yang tersimpan
        # di atribut private
        return self.__gaji_pokok

    # SETTER: cara mengubah gaji pokok dari luar class
    # Nama setter harus sama dengan nama getter, lalu
    # diberi @gaji_pokok.setter
    @gaji_pokok.setter
    def gaji_pokok(self, nilai_baru):
        # Langkah 1: periksa apakah nilai baru masih berupa angka
        # Kalau bukan angka, hentikan dengan pesan error
        if not isinstance(nilai_baru, (int, float)):
            raise ValueError("Gaji pokok harus berupa angka.")

        # Langkah 2: periksa apakah nilai baru kurang dari batas
        # Batas minimal gaji pokok adalah Rp 3.200.000
        if nilai_baru < 3200000:
            # Kalau di bawah batas, hentikan program dengan ValueError
            raise ValueError("Gaji pokok tidak boleh di bawah Rp 3.200.000.")

        # Langkah 3: kalau semua pemeriksaan lolos,
        # simpan nilai baru ke atribut private
        self.__gaji_pokok = nilai_baru

    # METHOD: hitung_gaji_bersih
    # Menghitung gaji setelah dipotong pajak.
    # Parameter pajak_persen adalah besar pajak dalam persen.
    def hitung_gaji_bersih(self, pajak_persen):
        # Langkah 1: hitung nilai pajak dalam rupiah
        # Caranya: gaji pokok dikali persen, lalu dibagi 100
        nilai_pajak = self.__gaji_pokok * pajak_persen
        nilai_pajak = nilai_pajak / 100

        # Langkah 2: kurangi gaji pokok dengan nilai pajak
        gaji_bersih = self.__gaji_pokok - nilai_pajak

        # Langkah 3: kembalikan hasil akhir
        return gaji_bersih

    # METHOD: tampilkan_data
    # Menampilkan data karyawan dengan print() sederhana
    def tampilkan_data(self):
        # Cetak nama
        print("Nama      :", self.nama)
        # Cetak jabatan
        print("Jabatan   :", self.jabatan)
        # Cetak gaji pokok (dibaca lewat getter)
        print("Gaji Pokok: Rp", self.gaji_pokok)

# BAGIAN PROGRAM UTAMA
# Bagian ini hanya contoh untuk mencoba class di atas.
if __name__ == "__main__":

    # Membuat satu objek karyawan dengan gaji yang valid
    karyawan_satu = Karyawan("Rina", "Staff Admin", 5000000)

    # Tampilkan data awalnya
    print("=== Data Karyawan ===")
    karyawan_satu.tampilkan_data()
    print()

    # Menghitung gaji bersih dengan pajak 10 persen
    gaji_bersih = karyawan_satu.hitung_gaji_bersih(10)
    print("Gaji bersih setelah pajak 10%: Rp", gaji_bersih)
    print()

    # UJI COBA 1: mengubah gaji pokok dengan nilai valid
    print("=== Uji ubah gaji jadi Rp 6.000.000 ===")
    # Baris di bawah otomatis memanggil setter
    karyawan_satu.gaji_pokok = 6000000
    # Cetak gaji yang sekarang (dibaca lewat getter)
    print("Gaji pokok sekarang: Rp", karyawan_satu.gaji_pokok)
    print()

    # UJI COBA 2: mengubah gaji pokok dengan nilai di bawah batas
    # Kita bungkus dengan try-except supaya program tidak berhenti
    print("=== Uji ubah gaji jadi Rp 1.000.000 ===")
    try:
        # Baris ini akan memicu ValueError dari setter
        karyawan_satu.gaji_pokok = 1000000
    except ValueError as pesan_error:
        # Tampilkan pesan error yang dikirim setter
        print("Gagal mengubah gaji:", pesan_error)

    # Cetak gaji terakhir untuk membuktikan gaji lama tidak berubah
    print("Gaji pokok tetap: Rp", karyawan_satu.gaji_pokok)

    # Pemeriksaan sederhana supaya hasil pasti benar
    assert karyawan_satu.gaji_pokok == 6000000
    assert gaji_bersih == 4500000
    print("Semua pemeriksaan lolos.")
