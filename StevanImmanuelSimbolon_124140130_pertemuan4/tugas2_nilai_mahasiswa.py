# 1. Membuat list berisi minimal 5 dictionary data mahasiswa
# Menggunakan nama Anda sebagai data pertama
data_mahasiswa = [
    {"nama": "Stevius", "nim": "124140130", "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 80},
    {"nama": "Rebecca", "nim": "124140083", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 85},
    {"nama": "Abidin", "nim": "124140003", "nilai_uts": 60, "nilai_uas": 55, "nilai_tugas": 65},
    {"nama": "Octavius", "nim": "124140004", "nilai_uts": 95, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Magna", "nim": "124140005", "nilai_uts": 45, "nilai_uas": 50, "nilai_tugas": 40}
]

# Variabel bantuan untuk mencari nilai tertinggi dan terendah
nama_tertinggi = ""
nama_terendah = ""
nilai_maksimal = 0       # Set ke angka terendah yang mungkin
nilai_minimal = 100      # Set ke angka tertinggi yang mungkin

# Membuat header tabel yang rapi
print("-" * 60)
print(f"{'Nama':<10} | {'NIM':<12} | {'Nilai Akhir':<12} | {'Grade':<5}")
print("-" * 60)

# 2. Perulangan untuk menghitung nilai tiap mahasiswa
for mhs in data_mahasiswa:
    
    # Hitung nilai akhir (30% UTS + 40% UAS + 30% Tugas)
    nilai_akhir = (0.30 * mhs["nilai_uts"]) + (0.40 * mhs["nilai_uas"]) + (0.30 * mhs["nilai_tugas"])
    
    # Tentukan Grade dengan percabangan
    if nilai_akhir >= 80:
        grade = "A"
    elif 70 <= nilai_akhir < 80:
        grade = "B"
    elif 60 <= nilai_akhir < 70:
        grade = "C"
    elif 50 <= nilai_akhir < 60:
        grade = "D"
    else:
        grade = "E"
        
    # Cetak baris data ke dalam tabel
    print(f"{mhs['nama']:<10} | {mhs['nim']:<12} | {nilai_akhir:<12.2f} | {grade:<5}")
    
    # 3. Mengecek nilai tertinggi
    if nilai_akhir > nilai_maksimal:
        nilai_maksimal = nilai_akhir
        nama_tertinggi = mhs["nama"]
        
    # Mengecek nilai terendah
    if nilai_akhir < nilai_minimal:
        nilai_minimal = nilai_akhir
        nama_terendah = mhs["nama"]

print("-" * 60)

# Menampilkan informasi tertinggi dan terendah
print(f"\nMahasiswa dengan nilai tertinggi: {nama_tertinggi} ({nilai_maksimal:.2f})")
print(f"Mahasiswa dengan nilai terendah : {nama_terendah} ({nilai_minimal:.2f})")
