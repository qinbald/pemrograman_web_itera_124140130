// Latihan 4: API Fetch, Validasi, dan Simulasi LocalStorage

// Fallback storage untuk environment Node.js / CLI
const storage = typeof localStorage !== "undefined"
  ? localStorage
  : {
      _data: {},
      getItem(key) { return this._data[key] ?? null; },
      setItem(key, val) { this._data[key] = String(val); },
      removeItem(key) { delete this._data[key]; }
    };

// --- 1. Mode Warna (Theme Preference) ---
console.log("=== 1. Pengaturan Mode Warna ===");
function setModeWarna(mode) {
  storage.setItem("modeWarna", mode);
  console.log(`Mode warna disimpan: ${mode}`);
}
setModeWarna("dark");
console.log(`Mode saat ini: ${storage.getItem("modeWarna")}`);

// --- 2. Data Mahasiswa dengan Validasi & Storage ---
console.log("\n=== 2. Validasi & Data Mahasiswa ===");
let daftarMahasiswa = JSON.parse(storage.getItem("dataMahasiswa") || "[]");

function simpanMahasiswa() {
  storage.setItem("dataMahasiswa", JSON.stringify(daftarMahasiswa));
}

function tambahMahasiswaDenganValidasi(nama, nim, jurusan) {
  nama = (nama || "").trim();
  nim = (nim || "").trim();
  jurusan = (jurusan || "").trim();

  const errors = [];
  if (nama.length < 3) errors.push("Nama minimal 3 karakter.");
  if (nim.length < 5) errors.push("NIM minimal 5 karakter.");
  if (jurusan.length === 0) errors.push("Jurusan harus diisi.");

  if (errors.length > 0) {
    console.log(`Gagal menambah [${nama || "Kosong"}]: ${errors.join(" ")}`);
    return false;
  }

  daftarMahasiswa.push({ nama, nim, jurusan });
  simpanMahasiswa();
  console.log(`Berhasil menambahkan mahasiswa: ${nama} (${nim}) - ${jurusan}`);
  return true;
}

tambahMahasiswaDenganValidasi("Al", "123", ""); // Gagal
tambahMahasiswaDenganValidasi("Stevan Immanuel", "124140130", "Teknik Informatika");
tambahMahasiswaDenganValidasi("Budi Santoso", "124140001", "Sistem Informasi");
console.table(JSON.parse(storage.getItem("dataMahasiswa")));

// --- 3. Todo List ---
console.log("\n=== 3. Todo List ===");
let daftarTodo = JSON.parse(storage.getItem("daftarTodo") || "[]");

function simpanTodo() {
  storage.setItem("daftarTodo", JSON.stringify(daftarTodo));
}

function tambahTodo(teks) {
  const t = (teks || "").trim();
  if (!t) return;
  daftarTodo.push({ teks: t, selesai: false });
  simpanTodo();
}

function toggleTodo(index) {
  if (daftarTodo[index]) {
    daftarTodo[index].selesai = !daftarTodo[index].selesai;
    simpanTodo();
  }
}

function hapusTodo(index) {
  if (daftarTodo[index]) {
    daftarTodo.splice(index, 1);
    simpanTodo();
  }
}

tambahTodo("Mengerjakan tugas praktikum");
tambahTodo("Membaca dokumentasi JavaScript");
toggleTodo(0); // Tandai selesai
console.table(daftarTodo);
hapusTodo(1);
console.log("Setelah hapus todo index 1:");
console.table(daftarTodo);

// --- 4. Fetch Post dari API & Pagination ---
console.log("\n=== 4. Fetch API Posts & Filter/Pagination ===");
const URL_POST = "https://jsonplaceholder.typicode.com/posts";

async function ambilDanFilterPost(kataKunci = "", halaman = 1, limit = 5) {
  try {
    const res = await fetch(URL_POST);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();

    const hasilFilter = data.filter((p) =>
      p.title.toLowerCase().includes(kataKunci.toLowerCase())
    );

    const totalHalaman = Math.max(1, Math.ceil(hasilFilter.length / limit));
    const start = (halaman - 1) * limit;
    const items = hasilFilter.slice(start, start + limit);

    console.log(`Kata kunci: "${kataKunci}" | Halaman ${halaman}/${totalHalaman} (Total hasil: ${hasilFilter.length})`);
    console.table(
      items.map((item) => ({
        id: item.id,
        title: item.title.slice(0, 40) + (item.title.length > 40 ? "..." : "")
      }))
    );
  } catch (err) {
    console.error("Gagal mengambil API:", err.message);
  }
}

ambilDanFilterPost("qui", 1, 5);
