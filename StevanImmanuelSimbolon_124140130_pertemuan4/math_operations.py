# ===================================================
# File: math_operations.py
# Deskripsi: Modul Matematika dan Suhu
# ===================================================

# Variabel konstanta
PI = 3.14159

# Fungsi 1: Bangun Datar - Persegi
def luas_persegi(sisi):
    """Menghitung luas persegi dari sisi yang diberikan."""
    return sisi * sisi

def keliling_persegi(sisi):
    """Menghitung keliling persegi dari sisi yang diberikan."""
    return 4 * sisi

# Fungsi 2: Bangun Datar - Persegi Panjang
def luas_persegi_panjang(panjang, lebar):
    """Menghitung luas persegi panjang."""
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    """Menghitung keliling persegi panjang."""
    return 2 * (panjang + lebar)

# Fungsi 3: Bangun Datar - Lingkaran
def luas_lingkaran(jari_jari):
    """Menghitung luas lingkaran menggunakan konstanta PI."""
    return PI * (jari_jari * jari_jari)

def keliling_lingkaran(jari_jari):
    """Menghitung keliling lingkaran menggunakan konstanta PI."""
    return 2 * PI * jari_jari

# Fungsi 4 & 5: Konversi Suhu
def konversi_celcius_ke_fahrenheit(celcius):
    """Mengonversi suhu dari Celcius ke derajat Fahrenheit."""
    return (celcius * 9/5) + 32

def konversi_celcius_ke_kelvin(celcius):
    """Mengonversi suhu dari Celcius ke derajat Kelvin."""
    return celcius + 273.15
