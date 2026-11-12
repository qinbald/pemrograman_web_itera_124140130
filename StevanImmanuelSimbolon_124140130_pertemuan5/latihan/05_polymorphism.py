# LATIHAN POLYMORPHISM - MULTI-SALUR NOTIFIKASI
# Materi: 3 class berbeda, method kirim() yang sama

# CLASS 1: NOTIFIKASI EMAIL
class NotifikasiEmail:

    # Constructor: menyimpan nama pengirim email
    def __init__(self, nama_pengirim):
        # Atribut: alamat email pengirim
        self.nama_pengirim = nama_pengirim

    # Method kirim: cara mengirim lewat email
    def kirim(self, pesan, penerima):
        # Cetak teks pengiriman email
        print("[EMAIL] Dari:", self.nama_pengirim)
        print("[EMAIL] Kepada:", penerima)
        print("[EMAIL] Pesan:", pesan)
        print("[EMAIL] Status: terkirim lewat server email")
        print()

# CLASS 2: NOTIFIKASI SMS
class NotifikasiSMS:

    # Constructor: menyimpan nama operator SMS
    def __init__(self, nama_operator):
        # Atribut: nama operator penyedia SMS
        self.nama_operator = nama_operator

    # Method kirim: cara mengirim lewat SMS
    def kirim(self, pesan, penerima):
        # Cetak teks pengiriman SMS
        print("[SMS] Operator:", self.nama_operator)
        print("[SMS] Kepada nomor:", penerima)
        print("[SMS] Pesan:", pesan)
        print("[SMS] Status: terkirim lewat jaringan seluler")
        print()

# CLASS 3: NOTIFIKASI WHATSAPP
class NotifikasiWhatsApp:

    # Constructor: menyimpan nama bisnis WhatsApp
    def __init__(self, nama_bisnis):
        # Atribut: nama akun bisnis WhatsApp
        self.nama_bisnis = nama_bisnis

    # Method kirim: cara mengirim lewat WhatsApp
    def kirim(self, pesan, penerima):
        # Cetak teks pengiriman WhatsApp
        print("[WHATSAPP] Dari bisnis:", self.nama_bisnis)
        print("[WHATSAPP] Kepada:", penerima)
        print("[WHATSAPP] Pesan:", pesan)
        print("[WHATSAPP] Status: terkirim lewat aplikasi WhatsApp")
        print()

# FUNGSI BROADCAST PENGUMUMAN
# Fungsi ini di luar class. Tugasnya mengirim pesan
# yang sama ke banyak channel sekaligus.
def broadcast_pengumuman(daftar_channel, pesan):
    # Siapkan penghitung berapa channel yang berhasil dikirimi
    jumlah_terkirim = 0

    # Ulangi setiap channel di dalam daftar
    # INILAH INTI POLYMORPHISM:
    # kita tidak perlu tahu objeknya Email, SMS, atau WhatsApp.
    # Yang penting objek itu punya method bernama kirim().
    # Jadi satu baris pemanggilan yang sama bisa bekerja
    # untuk objek yang berbeda-beda bentuk.
    for channel in daftar_channel:
        # Panggil method kirim() milik objek tersebut
        channel.kirim(pesan, "semua pelanggan")
        # Tambah hitungan karena satu channel sudah dikirimi
        jumlah_terkirim = jumlah_terkirim + 1

    # Kembalikan jumlah channel yang sudah diproses
    return jumlah_terkirim

# BAGIAN PROGRAM UTAMA
# Bagian ini hanya contoh untuk mencoba kode di atas.
if __name__ == "__main__":

    # Membuat objek dari masing-masing class
    channel_email = NotifikasiEmail("toko@email.com")
    channel_sms = NotifikasiSMS("Telkomsel")
    channel_whatsapp = NotifikasiWhatsApp("Toko Online Sejahtera")

    # Mengumpulkan objek berbeda ke dalam satu list
    # Ketiga objek ini bentuknya berbeda, tapi sama-sama
    # punya method kirim().
    daftar_channel = [channel_email, channel_sms, channel_whatsapp]

    # Teks pengumuman yang akan dikirim
    pesan_pengumuman = "Diskon 50% semua produk hari ini!"

    # Kirim pengumuman ke semua channel
    print("=== MULAI BROADCAST PENGUMUMAN ===")
    print()
    jumlah = broadcast_pengumuman(daftar_channel, pesan_pengumuman)

    # Cetak ringkasan
    print("=== SELESAI ===")
    print("Total channel yang dikirimi:", jumlah)

    # Pemeriksaan sederhana supaya hasil pasti benar
    assert jumlah == 3
    print("Semua pemeriksaan lolos.")
