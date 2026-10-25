import PropTypes from 'prop-types';
import './BookFilter.css';

// Daftar konfigurasi opsi tombol penyaringan status buku (value teknis dan label tampilan pengguna)
const FILTER_BUTTONS = [
  { value: 'semua', label: 'Semua' },
  { value: 'milik', label: 'Milik' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

/**
 * Komponen Reusable: BookFilter
 * Bertanggung jawab menyediakan antarmuka pencarian teks real-time dan pemilihan kategori status buku.
 * Komponen ini bersifat stateless terhadap data murni, menerima nilai saat ini dan fungsi callback dari komponen induk.
 *
 * @param {Object} props - Properti komponen
 * @param {string} props.searchTerm - Kata kunci teks pencarian yang sedang aktif
 * @param {Function} props.onSearchChange - Callback untuk mengubah nilai kata kunci pencarian di state induk
 * @param {string} props.statusFilter - Kategori status yang sedang dipilih ('semua' | 'milik' | 'baca' | 'beli')
 * @param {Function} props.onStatusChange - Callback untuk mengubah kategori status terpilih di state induk
 */
export default function BookFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    // Kontainer pembungkus utama seluruh elemen filter dan pencarian
    <div className="book-filter-container">
      {/* Bagian 1: Kotak Pencarian Teks (Judul / Penulis) */}
      <div className="search-box">
        <label htmlFor="search-input" className="filter-label">
          Cari Buku:
        </label>
        <div className="search-input-wrapper">
          {/* Input teks terkontrol: memicu callback onSearchChange saat ada ketikan baru */}
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Cari berdasarkan judul atau penulis..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {/* Tombol Clear: hanya muncul jika input pencarian sedang terisi teks untuk memudahkan reset cepat */}
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Hapus pencarian"
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Bagian 2: Tombol-tombol Pemilihan Kategori Status */}
      <div className="status-filter-box">
        <span className="filter-label">Filter Status:</span>
        {/* Grup tombol filter dengan atribut aksesibilitas role="group" */}
        <div className="filter-buttons" role="group" aria-label="Filter status buku">
          {/* Iterasi setiap konfigurasi tombol filter */}
          {FILTER_BUTTONS.map((item) => {
            // Evaluasi apakah tombol ini merupakan filter yang sedang aktif terpilih
            const isActive = statusFilter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                className={`filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => onStatusChange(item.value)}
                aria-pressed={isActive}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Spesifikasi kontrak tipe data properti komponen BookFilter
BookFilter.propTypes = {
  // String nilai teks pencarian (wajib diisi oleh induk)
  searchTerm: PropTypes.string.isRequired,
  // Fungsi penangan perubahan teks pencarian (wajib diisi oleh induk)
  onSearchChange: PropTypes.func.isRequired,
  // String kategori status yang aktif (wajib diisi oleh induk)
  statusFilter: PropTypes.string.isRequired,
  // Fungsi penangan perubahan filter status (wajib diisi oleh induk)
  onStatusChange: PropTypes.func.isRequired,
};

