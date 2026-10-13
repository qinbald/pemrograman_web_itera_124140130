// Latihan 1: JavaScript Dasar

// 1. Data Diri
const nama = "Stevan Immanuel Simbolon";
const kotaAsal = "Bandar Lampung";
let umur = 21;

console.log("=== 1. Data Diri ===");
console.log(`Nama: ${nama}, Umur: ${umur} tahun, Kota asal: ${kotaAsal}`);

// 2. Pengecekan Kelulusan
function cekKelulusan(nilai) {
  return nilai >= 70
    ? "Lulus karena nilai lebih besar atau sama dengan 70."
    : "Belum lulus karena nilai masih di bawah 70.";
}

console.log("\n=== 2. Pengecekan Kelulusan ===");
console.log(`Nilai 75: ${cekKelulusan(75)}`);
console.log(`Nilai 60: ${cekKelulusan(60)}`);

// 3. Kategori Umur
function cekKategoriUmur(u) {
  if (u < 12) return "Anak";
  if (u <= 17) return "Remaja";
  if (u <= 59) return "Dewasa";
  return "Lansia";
}

console.log("\n=== 3. Kategori Umur ===");
[8, 15, 21, 65].forEach((u) => {
  console.log(`Umur ${u}: ${cekKategoriUmur(u)}`);
});

// 4. Konversi Angka Hari
function konversiHari(angka) {
  switch (angka) {
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    case 7: return "Sunday";
    default: return "Angka harus dari 1 sampai 7.";
  }
}

console.log("\n=== 4. Konversi Angka Hari ===");
console.log(`Hari ke-1: ${konversiHari(1)}`);
console.log(`Hari ke-7: ${konversiHari(7)}`);
console.log(`Hari ke-9: ${konversiHari(9)}`);

// 5. Kalkulator Grade
function hitungGrade(nilai) {
  return nilai >= 85 ? "A" : nilai >= 70 ? "B" : nilai >= 60 ? "C" : "D";
}

console.log("\n=== 5. Kalkulator Grade ===");
[90, 75, 65, 50].forEach((n) => {
  console.log(`Nilai ${n}: Grade ${hitungGrade(n)}`);
});
