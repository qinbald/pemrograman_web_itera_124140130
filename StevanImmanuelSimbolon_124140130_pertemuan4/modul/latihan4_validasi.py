def validasi_password(password):
    """
    Mengembalikan True jika panjang password minimal 8 karakter 
    dan mengandung setidaknya satu angka.
    """
    if len(password) < 8:
        return False
    
    # Memeriksa apakah terdapat angka dalam password
    for karakter in password:
        if karakter.isdigit():
            return True
            
    return False

# Uji fungsi dengan beberapa contoh
print("Uji 'Stevan123'  :", validasi_password("Stevan123"))   # True (Valid)
print("Uji 'Itera'      :", validasi_password("Itera"))       # False (Kurang dari 8 karakter & tanpa angka)
print("Uji 'kodingterus':", validasi_password("kodingterus")) # False (Tanpa angka)
print("Uji 'admin2026'  :", validasi_password("admin2026"))   # True (Valid)
