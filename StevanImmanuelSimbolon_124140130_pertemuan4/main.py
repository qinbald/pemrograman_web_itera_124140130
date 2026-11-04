# ===================================================
# File: main.py
# Deskripsi: Program Utama Pemanggil Modul
# ===================================================

# Cara 1: Mengimpor seluruh modul dengan alias (as)
import math_operations as math_ops

# Cara 2: Mengimpor fungsi spesifik secara langsung
from math_operations import konversi_celcius_ke_fahrenheit, konversi_celcius_ke_kelvin

print("--- UJI COBA MODUL MATEMATIKA ---")

# Menguji fungsi persegi
sisi = 5
print(f"Luas persegi (sisi {sisi})     : {math_ops.luas_persegi(sisi)}")
print(f"Keliling persegi (sisi {sisi}) : {math_ops.keliling_persegi(sisi)}")

# Menguji fungsi persegi panjang
panjang = 10
lebar = 4
print(f"\nLuas persegi panjang (p={panjang}, l={lebar})     : {math_ops.luas_persegi_panjang(panjang, lebar)}")
print(f"Keliling persegi panjang (p={panjang}, l={lebar}) : {math_ops.keliling_persegi_panjang(panjang, lebar)}")

# Menguji fungsi lingkaran
jari2 = 7
print(f"\nLuas lingkaran (r={jari2})     : {math_ops.luas_lingkaran(jari2):.2f}")
print(f"Keliling lingkaran (r={jari2}) : {math_ops.keliling_lingkaran(jari2):.2f}")

print("\n--- UJI COBA MODUL SUHU ---")

suhu_celcius = 25
print(f"Suhu awal: {suhu_celcius} Celcius")

# Memanggil fungsi yang diimpor secara spesifik tanpa prefiks math_ops
suhu_f = konversi_celcius_ke_fahrenheit(suhu_celcius)
suhu_k = konversi_celcius_ke_kelvin(suhu_celcius)

print(f"Konversi ke Fahrenheit : {suhu_f} F")
print(f"Konversi ke Kelvin     : {suhu_k} K")
