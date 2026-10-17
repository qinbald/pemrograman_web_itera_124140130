// ==========================================
// LATIHAN 2: DESTRUCTURING, REST, & SPREAD
// ==========================================

// ------------------------------------------
// 1. Destructure Object Nested Minimal 3 Level
// ------------------------------------------
console.log("=== BAGIAN 1: NESTED DESTRUCTURING 3 LEVEL ===");

const dataKampus = {
  nama: "Institut Teknologi Sumatera",
  fakultas: {
    namaFakultas: "Fakultas Teknologi Industri dan Kebumian",
    prodi: {
      namaProdi: "Teknik Informatika",
      jenjang: "S1",
      koordinator: "Bapak Koordinator"
    }
  }
};

// Destructuring 3 level: dataKampus -> fakultas -> prodi
const {
  nama: kampus,
  fakultas: {
    namaFakultas,
    prodi: { namaProdi, jenjang, koordinator }
  }
} = dataKampus;

console.log("Kampus:", kampus);
console.log("Fakultas:", namaFakultas);
console.log("Prodi:", namaProdi, `(${jenjang})`);
console.log("Koordinator:", koordinator);

// ------------------------------------------
// 2. Function Rest Parameters & Statistik (min, max, average)
// ------------------------------------------
console.log("\n=== BAGIAN 2: REST PARAMETERS & STATISTIK ===");

function hitungStatistik(...angka) {
  if (angka.length === 0) {
    return { min: null, max: null, average: null };
  }
  const min = Math.min(...angka);
  const max = Math.max(...angka);
  const total = angka.reduce((acc, curr) => acc + curr, 0);
  const average = total / angka.length;

  return { min, max, average };
}

const stats = hitungStatistik(80, 95, 60, 75, 90, 85);
console.log("Input data nilai: 80, 95, 60, 75, 90, 85");
console.log("Statistik:", stats);

// ------------------------------------------
// 3. Merge 3 Objects dengan Spread & Override Properties
// ------------------------------------------
console.log("\n=== BAGIAN 3: SPREAD OPERATOR MERGE & OVERRIDE ===");

const dataPribadi = {
  id: 1,
  nama: "Stevan",
  status: "Mahasiswa Reguler"
};

const kontak = {
  email: "stevan@itera.ac.id",
  kota: "Lampung Selatan"
};

const akademik = {
  semester: 5,
  status: "Asisten Praktikum", // override properti status dari dataPribadi
  ipk: 3.8
};

// Menggabungkan 3 object & override status
const dataGabungan = {
  ...dataPribadi,
  ...kontak,
  ...akademik,
  kota: "Bandar Lampung" // override properti kota dari kontak
};

console.log("Objek gabungan:", dataGabungan);

// ------------------------------------------
// 4. Destructuring dalam Loop for...of
// ------------------------------------------
console.log("\n=== BAGIAN 4: DESTRUCTURING DALAM FOR...OF ===");

const daftarTugas = [
  { id: "T1", matkul: "Pemrograman Web", deadline: "2026-10-20" },
  { id: "T2", matkul: "Basis Data", deadline: "2026-10-22" },
  { id: "T3", matkul: "Struktur Data", deadline: "2026-10-25" }
];

for (const { id, matkul, deadline } of daftarTugas) {
  console.log(`[${id}] Matkul: ${matkul} - Deadline: ${deadline}`);
}
