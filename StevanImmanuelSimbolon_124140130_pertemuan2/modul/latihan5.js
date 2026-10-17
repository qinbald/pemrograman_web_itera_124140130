// ==========================================
// LATIHAN 5: ASYNC PROGRAMMING (PROMISE & ASYNC/AWAIT)
// ==========================================

// Helper delay (Promise)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // ------------------------------------------
  // 1. Fetch Data dari Beberapa Endpoint & Gabungkan Hasilnya
  // ------------------------------------------
  console.log("=== BAGIAN 1: FETCH PARALEL (PROMISE.ALL) & MERGE ===");

  const fetchProfilPengguna = async (id) => {
    await delay(100);
    return { id, nama: "Stevan Immanuel", role: "Mahasiswa" };
  };

  const fetchNilaiAkademik = async (id) => {
    await delay(120);
    return { id, ipk: 3.85, sksSelesai: 90 };
  };

  const fetchDaftarTugas = async (id) => {
    await delay(80);
    return [
      { kode: "IF311", judul: "Praktikum Web" },
      { kode: "IF312", judul: "Tugas Basis Data" }
    ];
  };

  // Eksekusi paralel dengan Promise.all
  async function getProfilLengkap(userId) {
    const [profil, akademik, tugas] = await Promise.all([
      fetchProfilPengguna(userId),
      fetchNilaiAkademik(userId),
      fetchDaftarTugas(userId)
    ]);

    return {
      ...profil,
      akademik: { ipk: akademik.ipk, sks: akademik.sksSelesai },
      tugas
    };
  }

  const hasilMerge = await getProfilLengkap(124140130);
  console.log("Hasil gabungan data 3 endpoint:", hasilMerge);

  // ------------------------------------------
  // 2. Mekanisme Retry dengan Exponential Backoff
  // ------------------------------------------
  console.log("\n=== BAGIAN 2: RETRY DENGAN EXPONENTIAL BACKOFF ===");

  let percobaanCounter = 0;
  // Simulasi operasi async yang gagal 2 kali baru berhasil pada percobaan ke-3
  const simulasiApiTidakStabil = async () => {
    percobaanCounter++;
    if (percobaanCounter < 3) {
      throw new Error(`Koneksi timeout (percobaan ${percobaanCounter})`);
    }
    return { status: 200, pesan: "Data berhasil ditarik!" };
  };

  async function retryDenganBackoff(fnAsync, maxRetries = 3, baseDelayMs = 50) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fnAsync();
      } catch (err) {
        if (attempt === maxRetries) {
          throw new Error(`Gagal setelah ${maxRetries} percobaan. Alasan: ${err.message}`);
        }
        // Rumus backoff: baseDelay * 2^(attempt - 1)
        const waktuTunggu = baseDelayMs * Math.pow(2, attempt - 1);
        console.log(`[Percobaan ${attempt} gagal: ${err.message}] -> Menunggu ${waktuTunggu}ms...`);
        await delay(waktuTunggu);
      }
    }
  }

  const responRetry = await retryDenganBackoff(simulasiApiTidakStabil, 4, 100);
  console.log("Hasil retry:", responRetry);

  // ------------------------------------------
  // 3. Loading States untuk Operasi Async di UI
  // ------------------------------------------
  console.log("\n=== BAGIAN 3: LOADING STATES UNTUK ASYNC UI ===");

  class AsyncUiState {
    constructor() {
      this.state = { status: "idle", data: null, error: null };
    }

    async run(asyncAction) {
      // 1. Transisi ke state loading
      this.state = { status: "loading", data: null, error: null };
      console.log(`[UI State]: ${this.state.status} (tampilkan spinner)`);

      try {
        const result = await asyncAction();
        // 2. Transisi ke state success
        this.state = { status: "success", data: result, error: null };
        console.log(`[UI State]: ${this.state.status} (sembunyikan spinner, render data)`);
      } catch (error) {
        // 3. Transisi ke state error
        this.state = { status: "error", data: null, error: error.message };
        console.log(`[UI State]: ${this.state.status} (tampilkan alert error)`);
      }

      return this.state;
    }
  }

  const uiManager = new AsyncUiState();
  await uiManager.run(async () => {
    await delay(100);
    return "Data dashboard siap dimuat";
  });

  // ------------------------------------------
  // 4. Async Error Boundary
  // ------------------------------------------
  console.log("\n=== BAGIAN 4: ASYNC ERROR BOUNDARY ===");

  async function asyncErrorBoundary(asyncFunction, fallbackData = null) {
    try {
      const data = await asyncFunction();
      return { ok: true, data, error: null };
    } catch (err) {
      console.warn(`[Error Boundary Menangkap Error]: ${err.message}`);
      return { ok: false, data: fallbackData, error: err.message };
    }
  }

  const hasilGagal = await asyncErrorBoundary(async () => {
    throw new Error("Gagal mengambil konfigurasi dari server");
  }, { tema: "light", modeOffline: true });

  console.log("Boundary result (aman tanpa crash):", hasilGagal);

  // ------------------------------------------
  // 5. Pagination dengan Async/Await
  // ------------------------------------------
  console.log("\n=== BAGIAN 5: PAGINATION DENGAN ASYNC/AWAIT ===");

  const databaseSimulasi = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    judul: `Materi Pertemuan ke-${i + 1}`
  }));

  async function fetchHalaman({ page = 1, limit = 4 } = {}) {
    await delay(50); // Simulasi delay query database/API
    const totalItems = databaseSimulasi.length;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;
    const items = databaseSimulasi.slice(offset, offset + limit);

    return {
      halamanSaatIni: page,
      limit,
      totalItems,
      totalPages,
      adaHalamanBerikut: page < totalPages,
      data: items
    };
  }

  const hal1 = await fetchHalaman({ page: 1, limit: 3 });
  console.log("Halaman 1:", hal1);

  const hal2 = await fetchHalaman({ page: 2, limit: 3 });
  console.log("Halaman 2:", hal2);

  // ------------------------------------------
  // 6. Debounced Search dengan Async API Calls
  // ------------------------------------------
  console.log("\n=== BAGIAN 6: DEBOUNCED SEARCH DENGAN ASYNC API ===");

  const apiCariMahasiswa = async (keyword) => {
    await delay(50);
    const data = ["Stevan Immanuel", "Stevani Putri", "Budi Santoso", "Citra Kirana"];
    const filtered = data.filter((mhs) => mhs.toLowerCase().includes(keyword.toLowerCase()));
    console.log(`[API Call Dijalankan] Query: "${keyword}" -> Ditemukan: ${filtered.length}`);
    return filtered;
  };

  function debounceAsync(fnAsync, jedaMs = 150) {
    let timerId;
    return (param) => {
      return new Promise((resolve, reject) => {
        clearTimeout(timerId);
        timerId = setTimeout(async () => {
          try {
            const hasil = await fnAsync(param);
            resolve(hasil);
          } catch (err) {
            reject(err);
          }
        }, jedaMs);
      });
    };
  }

  const debouncedSearch = debounceAsync(apiCariMahasiswa, 150);

  // Simulasi user mengetik cepat: "S", "St", "Ste", "Stev"
  console.log("Simulasi input user cepat: S -> St -> Ste -> Stev");
  debouncedSearch("S");
  debouncedSearch("St");
  debouncedSearch("Ste");
  const hasilAkhir = await debouncedSearch("Stev");

  console.log("Hasil akhir pencarian debounced:", hasilAkhir);
}

main();
