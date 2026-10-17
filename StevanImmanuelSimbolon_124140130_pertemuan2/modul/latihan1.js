// LATIHAN 1: JAVASCRIPT NEXT GEN (ES6+)

// 1. Coba Ubah Nilai const & Tangkap Error
console.log("=== BAGIAN 1: CONST & ERROR HANDLING ===");

const PI = 3.14159;
console.log("Nilai awal PI:", PI);

try {
  // Reassignment ke variabel const memicu TypeError
  PI = 3.14;
} catch (error) {
  console.error("Error saat reassign const:", error.name, "-", error.message);
}

// Mutasi properti objek vs reassignment referensi
const user = { name: "Budi" };
user.name = "Andi"; // Boleh: mutasi properti objek
console.log("Mutasi properti objek const berhasil:", user);

try {
  user = { name: "Citra" }; // Error: reassign referensi objek
} catch (error) {
  console.error("Error reassign referensi objek:", error.name, "-", error.message);
}

// 2. Bandingkan Behavior var di Dalam & Luar Block
console.log("\n=== BAGIAN 2: SCOPE VAR VS LET/CONST ===");

if (true) {
  var angkaVar = 10; // Function/Global Scope
  let angkaLet = 20; // Block Scope
  const angkaConst = 30; // Block Scope

  console.log("Di dalam block (var):", angkaVar);
  console.log("Di dalam block (let):", angkaLet);
  console.log("Di dalam block (const):", angkaConst);
}

// var bocor ke luar block
console.log("Di luar block (var):", angkaVar);

// let & const tidak dapat diakses di luar block (ReferenceError)
try {
  console.log(angkaLet);
} catch (error) {
  console.error("Di luar block (let):", error.name, "-", error.message);
}

try {
  console.log(angkaConst);
} catch (error) {
  console.error("Di luar block (const):", error.name, "-", error.message);
}

// 3. Arrow Function dengan Berbagai Sintaks
console.log("\n=== BAGIAN 3: SINTAKS ARROW FUNCTIONS ===");

// a. Sintaks standar (banyak parameter, kurung kurawal, return eksplisit)
const tambah = (a, b) => {
  return a + b;
};

// b. Implicit return (satu baris tanpa return & kurung kurawal)
const kali = (a, b) => a * b;

// c. Satu parameter (tanpa kurung parameter)
const kuadrat = x => x * x;

// d. Tanpa parameter (wajib kurung kosong)
const sapa = () => "Halo dari arrow function!";

// e. Mengembalikan object literal (bungkus dengan kurung biasa)
const buatUser = (nama, nim) => ({ nama, nim });

// f. Callback function pada array method
const angka = [1, 2, 3, 4, 5];
const genapKaliDua = angka
  .filter(n => n % 2 === 0)
  .map(n => n * 2);

console.log("1. Tambah (standar):", tambah(5, 3));
console.log("2. Kali (implicit return):", kali(4, 5));
console.log("3. Kuadrat (1 param):", kuadrat(6));
console.log("4. Sapa (0 param):", sapa());
console.log("5. Buat User (return object):", buatUser("Stevan", "124140130"));
console.log("6. Callback array:", genapKaliDua);

// 4. Template Literals untuk Membuat HTML String
console.log("\n=== BAGIAN 4: TEMPLATE LITERALS HTML ===");

const mahasiswa = {
  nama: "Stevan Immanuel Simbolon",
  nim: "124140130",
  prodi: "Teknik Informatika",
  statusAktif: true,
  matkul: ["Pengembangan Aplikasi Web", "Struktur Data", "Basis Data"]
};

const htmlCard = `
<div class="card-mahasiswa">
  <h2>${mahasiswa.nama}</h2>
  <p><strong>NIM:</strong> ${mahasiswa.nim}</p>
  <p><strong>Program Studi:</strong> ${mahasiswa.prodi}</p>
  <p><strong>Status:</strong> ${mahasiswa.statusAktif ? "Aktif" : "Cuti"}</p>
  <div class="daftar-matkul">
    <h3>Mata Kuliah:</h3>
    <ul>
      ${mahasiswa.matkul.map(m => `<li>${m}</li>`).join("\n      ")}
    </ul>
  </div>
</div>
`.trim();

console.log(htmlCard);
