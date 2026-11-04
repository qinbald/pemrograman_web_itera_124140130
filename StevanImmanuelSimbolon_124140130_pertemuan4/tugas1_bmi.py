print("--- PROGRAM PENGHITUNG BMI ---")

# Meminta input dari pengguna (menggunakan float karena bisa desimal)
berat_badan = float(input("Masukkan berat badan (dalam kg, contoh: 60): "))
tinggi_badan = float(input("Masukkan tinggi badan (dalam m, contoh: 1.65): "))

# Otomatis konversi jika pengguna memasukkan satuan cm (> 3 meter)
if tinggi_badan > 3:
    print(f"Catatan: Nilai {tinggi_badan:.0f} terdeteksi dalam cm, dikonversi menjadi {tinggi_badan / 100:.2f} m.")
    tinggi_badan /= 100

# Menghitung BMI
bmi = berat_badan / (tinggi_badan * tinggi_badan)

# Menentukan kategori BMI dengan if-elif-else
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    kategori = "Berat badan normal"
elif 25 <= bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Menampilkan hasil dengan 2 angka di belakang koma (.2f)
print(f"\nNilai BMI Anda adalah: {bmi:.2f}")
print(f"Status: {kategori}")
