/**
 * Konfigurasi Master: Daftar Opsi Status Buku
 * Digunakan secara terpusat oleh komponen BookForm, BookFilter, dan BookList untuk menjamin konsistensi nilai status.
 * Menyediakan pasangan value teknis, label teks ramah pengguna, dan kelas CSS badge untuk styling.
 */
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Dimiliki', badgeClass: 'badge-milik' },
  { value: 'baca', label: 'Sedang Dibaca', badgeClass: 'badge-baca' },
  { value: 'beli', label: 'Ingin Dibeli', badgeClass: 'badge-beli' },
];

/**
 * Fungsi Validasi Domain: validateBook
 * Memeriksa kelayakan data input buku sebelum diproses atau disimpan ke dalam penyimpanan data.
 * Memastikan bahwa field wajib tidak kosong (setelah pembersihan spasi) dan opsi status terdaftar dalam whitelist.
 *
 * @param {Object} params - Objek data buku yang akan divalidasi
 * @param {string} params.title - Nilai input judul buku
 * @param {string} params.author - Nilai input nama penulis buku
 * @param {string} params.status - Nilai pilihan status buku
 * @returns {{ isValid: boolean, errors: { title?: string, author?: string, status?: string } }} Hasil evaluasi validitas dan daftar pesan kesalahan
 */
export function validateBook({ title, author, status }) {
  // Objek penampung pesan kesalahan; jika kosong berarti valid
  const errors = {};

  // Sanitasi awal: hilangkan spasi di awal dan di akhir string (trimming)
  const cleanTitle = (title || '').trim();
  const cleanAuthor = (author || '').trim();
  const cleanStatus = (status || '').trim();

  // Validasi Aturan 1: Judul buku wajib diisi dan tidak boleh hanya berisi whitespace
  if (!cleanTitle) {
    errors.title = 'Judul buku wajib diisi.';
  }

  // Validasi Aturan 2: Nama penulis wajib diisi dan tidak boleh hanya berisi whitespace
  if (!cleanAuthor) {
    errors.author = 'Nama penulis wajib diisi.';
  }

  // Validasi Aturan 3: Status wajib cocok dengan salah satu value yang didefinisikan pada STATUS_OPTIONS
  const validStatuses = STATUS_OPTIONS.map((opt) => opt.value);
  if (!validStatuses.includes(cleanStatus)) {
    errors.status = 'Pilih salah satu status yang valid (milik, baca, atau beli).';
  }

  // Objek dikembalikan dengan flag isValid (true jika tidak ada error sama sekali)
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Fungsi Pemfilter Data: filterBooks
 * Melakukan penyaringan multi-kriteria terhadap array buku berdasarkan kategori status dan kata kunci teks pencarian.
 *
 * @param {Array<Object>} [books=[]] - Koleksi data buku sumber
 * @param {string} [statusFilter='semua'] - Kategori status yang disaring ('semua' mengabaikan filter status)
 * @param {string} [searchTerm=''] - Kata kunci string untuk mencari kecocokan pada judul atau penulis
 * @returns {Array<Object>} Array baru berisi daftar buku yang memenuhi seluruh kriteria filter
 */
export function filterBooks(books = [], statusFilter = 'semua', searchTerm = '') {
  // Normalisasi kata kunci pencarian menjadi huruf kecil dan tanpa spasi pinggir untuk pencarian case-insensitive
  const cleanTerm = (searchTerm || '').trim().toLowerCase();

  return books.filter((book) => {
    // Kriteria 1: Cocokkan status. Jika bernilai 'semua', maka seluruh buku lolos kriteria ini
    const matchStatus =
      statusFilter === 'semua' || book.status === statusFilter;

    // Kriteria 2: Cocokkan kata kunci teks. Jika tidak ada kata kunci pencarian, loloskan; jika ada, cari substring pada judul ATAU nama penulis
    const matchSearch =
      !cleanTerm ||
      book.title.toLowerCase().includes(cleanTerm) ||
      book.author.toLowerCase().includes(cleanTerm);

    // Buku harus memenuhi kedua kriteria (status DAN pencarian) secara bersamaan
    return matchStatus && matchSearch;
  });
}

/**
 * Fungsi Generator Identitas: generateId
 * Menghasilkan string ID unik tanpa memerlukan pustaka pihak ketiga (seperti uuid).
 * Menggabungkan milidetik saat ini (Date.now()) dengan string pseudo-acak berbasis radix 36.
 *
 * @returns {string} String pengenal unik (contoh: "1729000000000-k8f3a9z")
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

