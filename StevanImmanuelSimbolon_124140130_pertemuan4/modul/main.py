import password_gen as pg

print("--- GENERATOR PASSWORD ACAK ---")

# Uji fungsi dengan panjang default (8)
pass_default = pg.buat_password_acak()
print(f"Password acak (8 karakter) : {pass_default}")

# Uji fungsi dengan panjang spesifik (misal 12 karakter)
pass_12 = pg.buat_password_acak(12)
print(f"Password acak (12 karakter): {pass_12}")
