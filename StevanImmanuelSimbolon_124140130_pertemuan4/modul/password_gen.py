import random
import string

def buat_password_acak(panjang=8):
    """Menghasilkan kombinasi karakter acak (huruf dan angka) sesuai panjang."""
    karakter_tersedia = string.ascii_letters + string.digits
    
    # Memilih karakter secara acak sebanyak parameter panjang
    password_list = [random.choice(karakter_tersedia) for _ in range(panjang)]
    
    return "".join(password_list)
