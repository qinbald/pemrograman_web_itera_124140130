// Latihan 3: Array dan CRUD Mahasiswa

let daftarMahasiswa = [
  { nama: "Budi Santoso", nim: "124140001", jurusan: "Teknik Informatika", nilai: 85 },
  { nama: "Siti Rahma", nim: "124140002", jurusan: "Sistem Informasi", nilai: 90 },
  { nama: "Andi Wijaya", nim: "124140003", jurusan: "Teknik Informatika", nilai: 70 },
  { nama: "Dewi Lestari", nim: "124140004", jurusan: "Teknik Elektro", nilai: 60 },
  { nama: "Eko Prasetyo", nim: "124140005", jurusan: "Sistem Informasi", nilai: 95 }
];

function tampilkanTabel(data = daftarMahasiswa) {
  console.table(data);
}

function tambahMahasiswa(mhs) {
  daftarMahasiswa.push(mhs);
}

function editMahasiswa(index, dataBaru) {
  if (daftarMahasiswa[index]) {
    daftarMahasiswa[index] = dataBaru;
  }
}

function hapusMahasiswa(index) {
  if (daftarMahasiswa[index]) {
    daftarMahasiswa.splice(index, 1);
  }
}

function cariNilaiTertinggi() {
  if (daftarMahasiswa.length === 0) return null;
  return daftarMahasiswa.reduce((max, mhs) => (mhs.nilai > max.nilai ? mhs : max));
}

function filterDiAtasRataRata() {
  if (daftarMahasiswa.length === 0) return [];
  const total = daftarMahasiswa.reduce((sum, mhs) => sum + mhs.nilai, 0);
  const rataRata = total / daftarMahasiswa.length;
  return {
    rataRata,
    data: daftarMahasiswa.filter((mhs) => mhs.nilai > rataRata)
  };
}

function urutkanNama(tipe = "asc") {
  return [...daftarMahasiswa].sort((a, b) =>
    tipe === "asc" ? a.nama.localeCompare(b.nama) : b.nama.localeCompare(a.nama)
  );
}

console.log("=== Data Awal Mahasiswa ===");
tampilkanTabel();

console.log("\n=== 1. Tambah Mahasiswa Baru ===");
tambahMahasiswa({ nama: "Rian Hidayat", nim: "124140006", jurusan: "Teknik Informatika", nilai: 88 });
tampilkanTabel();

console.log("\n=== 2. Edit Mahasiswa (Index 2 -> Andi Wijaya) ===");
editMahasiswa(2, { nama: "Andi Wijaya", nim: "124140003", jurusan: "Teknik Informatika", nilai: 78 });
tampilkanTabel();

console.log("\n=== 3. Hapus Mahasiswa (Index 3 -> Dewi Lestari) ===");
hapusMahasiswa(3);
tampilkanTabel();

console.log("\n=== 4. Cari Nilai Tertinggi ===");
console.log("Tertinggi:", cariNilaiTertinggi());

console.log("\n=== 5. Filter di Atas Rata-Rata ===");
const hasilFilter = filterDiAtasRataRata();
console.log(`Rata-rata: ${hasilFilter.rataRata.toFixed(2)}`);
tampilkanTabel(hasilFilter.data);

console.log("\n=== 6. Urut Nama A-Z ===");
tampilkanTabel(urutkanNama("asc"));

console.log("\n=== 7. Urut Nama Z-A ===");
tampilkanTabel(urutkanNama("desc"));
