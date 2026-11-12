# LATIHAN INHERITANCE - ARMADA TRUK EKSPEDISI
# Materi: parent class, subclass, super(), method overriding

# PARENT CLASS: KENDARAAN
# Class ini adalah class dasar (induk).
class Kendaraan:

    # Constructor milik class induk
    def __init__(self, merek, model):
        # Atribut 1: merek kendaraan
        self.merek = merek
        # Atribut 2: model kendaraan
        self.model = model

    # Method deskripsi milik class induk
    def deskripsi(self):
        # Kembalikan teks sederhana tentang kendaraan
        return self.merek + " " + self.model

# SUBCLASS: TRUK
# Truk adalah anak dari Kendaraan, jadi Truk otomatis
# punya atribut merek dan model serta method deskripsi.
class Truk(Kendaraan):

    # Constructor milik Truk
    def __init__(self, merek, model, kapasitas_maksimal_ton):
        # super() artinya: "panggil constructor milik induk".
        # Jadi kita tidak perlu menulis ulang self.merek dan
        # self.model, cukup minta induk yang mengurus.
        super().__init__(merek, model)

        # Atribut baru khusus Truk: batas maksimal muatan
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        # Atribut baru khusus Truk: muatan sekarang, awalnya 0
        self.muatan_saat_ini = 0

    # Method untuk memuat barang ke truk
    def muat_barang(self, berat_ton):
        # Hitung dulu berapa total muatan kalau barang ini dimuat
        total_muatan_baru = self.muatan_saat_ini + berat_ton

        # Periksa apakah total muatan masih di bawah atau sama
        # dengan kapasitas maksimal
        if total_muatan_baru <= self.kapasitas_maksimal_ton:
            # Muatan masih aman, simpan muatan baru
            self.muatan_saat_ini = total_muatan_baru
            # Beri tahu berhasil
            print("Berhasil memuat", berat_ton, "ton.")
            print("Muatan sekarang:", self.muatan_saat_ini, "ton.")
            return True
        else:
            # Muatan akan melebihi kapasitas, jadi batalkan
            print("Gagal memuat", berat_ton, "ton. Muatan akan melebihi kapasitas.")
            print("Kapasitas maksimal:", self.kapasitas_maksimal_ton, "ton.")
            return False

    # Method deskripsi di-override (ditulis ulang)
    # Namanya sama dengan method di induk, tetapi isinya
    # disesuaikan untuk Truk.
    def deskripsi(self):
        # Kita tetap ambil deskripsi dasar dari induk lewat super()
        deskripsi_dasar = super().deskripsi()

        # Lalu tambahkan informasi khusus truk
        return (deskripsi_dasar
                + " (Truk, kapasitas maksimal "
                + str(self.kapasitas_maksimal_ton) + " ton)")

# BAGIAN PROGRAM UTAMA
# Bagian ini hanya contoh untuk mencoba class di atas.
if __name__ == "__main__":

    # Membuat satu objek truk
    truk_pengangkut = Truk("Hino", "Dutro", 5)

    # Memanggil method deskripsi yang sudah di-override
    print("Deskripsi truk:")
    print(truk_pengangkut.deskripsi())
    print()

    # Mencoba memuat barang
    truk_pengangkut.muat_barang(2)
    print()
    truk_pengangkut.muat_barang(2)
    print()
    # Yang ini harus gagal karena 2 + 2 + 2 = 6 ton, lebih dari 5
    truk_pengangkut.muat_barang(2)
    print()

    # Cek tipe objek: Truk juga dianggap Kendaraan
    print("Apakah truk juga Kendaraan?", isinstance(truk_pengangkut, Kendaraan))

    # Pemeriksaan sederhana supaya hasil pasti benar
    assert truk_pengangkut.muatan_saat_ini == 4
    assert isinstance(truk_pengangkut, Kendaraan) == True
    print("Semua pemeriksaan lolos.")
