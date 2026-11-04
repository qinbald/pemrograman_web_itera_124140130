# Inisialisasi dictionary kontak
katalog_kontak = {
    "Feldy": "081234567890",
    "Budi": "081298765432"
}

print("--- KATALOG KONTAK ---")

# 1. Menambahkan kontak baru
katalog_kontak["Siti"] = "085712345678"
print("Kontak 'Siti' berhasil ditambahkan.")

# 2. Mencari nomor telepon berdasarkan nama menggunakan .get()
nama_dicari = "Feldy"
nomor_ditemukan = katalog_kontak.get(nama_dicari, "Kontak tidak ditemukan")
print(f"\nPencarian kontak {nama_dicari}: {nomor_ditemukan}")

nama_dicari2 = "Andi"
print(f"Pencarian kontak {nama_dicari2} : {katalog_kontak.get(nama_dicari2, 'Kontak tidak ditemukan')}")

# 3. Menampilkan seluruh kontak yang tersimpan
print("\n--- DAFTAR SELURUH KONTAK ---")
for nama, nomor in katalog_kontak.items():
    print(f"- {nama}: {nomor}")
