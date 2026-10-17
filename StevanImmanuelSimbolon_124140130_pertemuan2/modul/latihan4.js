// ==========================================
// LATIHAN 4: MODERN ARRAY METHODS
// ==========================================

// ------------------------------------------
// 1. Implementasi Fungsi groupBy Menggunakan reduce()
// ------------------------------------------
console.log("=== BAGIAN 1: GROUPBY DENGAN REDUCE ===");

function groupBy(array, property) {
  return array.reduce((groups, item) => {
    const key = item[property];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}

const mahasiswaList = [
  { nama: "Stevan", jurusan: "Informatika", semester: 5 },
  { nama: "Budi", jurusan: "Sistem Informasi", semester: 3 },
  { nama: "Citra", jurusan: "Informatika", semester: 5 },
  { nama: "Dewi", jurusan: "Teknik Elektro", semester: 3 },
  { nama: "Eko", jurusan: "Informatika", semester: 3 }
];

const dikelompokkanJurusan = groupBy(mahasiswaList, "jurusan");
console.log("Hasil groupBy per Jurusan:", dikelompokkanJurusan);

// ------------------------------------------
// 2. Fungsi Menghitung Rata-rata dari Array of Objects
// ------------------------------------------
console.log("\n=== BAGIAN 2: HITUNG RATA-RATA DARI ARRAY OF OBJECTS ===");

function hitungRataRata(dataArray, propName) {
  if (!dataArray || dataArray.length === 0) return 0;
  const total = dataArray.reduce((acc, curr) => acc + (curr[propName] ?? 0), 0);
  return total / dataArray.length;
}

const daftarNilai = [
  { matkul: "Pemrograman Web", nilai: 88 },
  { matkul: "Struktur Data", nilai: 75 },
  { matkul: "Basis Data", nilai: 92 },
  { matkul: "Jaringan Komputer", nilai: 85 }
];

const rataRataNilai = hitungRataRata(daftarNilai, "nilai");
console.log("Daftar Nilai:", daftarNilai);
console.log("Rata-rata Nilai Matkul:", rataRataNilai.toFixed(2));

// ------------------------------------------
// 3. Transform Array Bersarang Menjadi Flat
// ------------------------------------------
console.log("\n=== BAGIAN 3: TRANSFORM ARRAY BERSARANG MENJADI FLAT ===");

// Nested array bertingkat (multi-level nesting)
const nestedAngka = [1, [2, 3], [4, [5, 6, [7, 8]]]];
const flatSemua = nestedAngka.flat(Infinity);
console.log("Array asli bersarang:", JSON.stringify(nestedAngka));
console.log("Array flat (flat Infinity):", flatSemua);

// Transform array of objects dengan properti array menggunakan flatMap()
const departemen = [
  { tim: "Frontend", anggota: ["Andi", "Budi"] },
  { tim: "Backend", anggota: ["Citra", "Dono"] },
  { tim: "DevOps", anggota: ["Eko"] }
];
const seluruhAnggota = departemen.flatMap(d => d.anggota);
console.log("Semua anggota tim (flatMap):", seluruhAnggota);

// ------------------------------------------
// 4. Gabungkan filter, map, dan reduce untuk Analisis Data Kompleks
// ------------------------------------------
console.log("\n=== BAGIAN 4: PIPELINE FILTER -> MAP -> REDUCE ===");

const transaksiPenjualan = [
  { id: 1, produk: "Laptop", kategori: "Elektronik", harga: 12000000, terjual: 3, diskon: 0.1 },
  { id: 2, produk: "Meja Kerja", kategori: "Furnitur", harga: 1500000, terjual: 5, diskon: 0.05 },
  { id: 3, produk: "Mouse Gaming", kategori: "Elektronik", harga: 500000, terjual: 10, diskon: 0.2 },
  { id: 4, produk: "Keyboard Mekanikal", kategori: "Elektronik", harga: 900000, terjual: 4, diskon: 0.15 },
  { id: 5, produk: "Kursi Ergonomis", kategori: "Furnitur", harga: 2500000, terjual: 2, diskon: 0.1 }
];

// Analisis: Hitung total omzet bersih kategori 'Elektronik' setelah dipotong diskon
const totalOmzetElektronik = transaksiPenjualan
  // 1. FILTER: Ambil hanya produk berkategori Elektronik
  .filter(item => item.kategori === "Elektronik")
  // 2. MAP: Hitung subtotal tiap produk setelah diskon
  .map(item => {
    const hargaSetelahDiskon = item.harga * (1 - item.diskon);
    const subtotal = hargaSetelahDiskon * item.terjual;
    return {
      produk: item.produk,
      subtotal
    };
  })
  // 3. REDUCE: Akumulasikan seluruh subtotal
  .reduce((total, item) => total + item.subtotal, 0);

console.log(
  "Total Omzet Bersih Kategori Elektronik:",
  `Rp${totalOmzetElektronik.toLocaleString("id-ID")}`
);
