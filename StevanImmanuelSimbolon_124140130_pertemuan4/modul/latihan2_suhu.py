print("--- KALKULATOR KONVERSI SUHU ---")
celsius = float(input("Masukkan temperatur dalam derajat Celcius: "))

fahrenheit = celsius * 9/5 + 32
kelvin = celsius + 273.15

# Mencetak hasil dengan f-string, 2 angka di belakang koma
print(f"\nHasil Konversi Suhu untuk {celsius:.2f}°C:")
print(f"Fahrenheit : {fahrenheit:.2f}°F")
print(f"Kelvin     : {kelvin:.2f} K")
