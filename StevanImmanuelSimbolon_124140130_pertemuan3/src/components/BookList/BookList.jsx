import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../utils/bookHelpers.js';
import './BookList.css';

/**
 * Komponen Presentasional & Interaktif: BookList
 * Bertanggung jawab merender daftar koleksi buku dalam bentuk grid kartu (card layout).
 * Menyediakan tombol aksi langsung untuk memicu proses edit (mengisi form) dan hapus (menghapus dari storage).
 *
 * @param {Object} props - Properti komponen
 * @param {Array<Object>} props.books - Array objek buku yang telah difilter untuk ditampilkan
 * @param {Function} props.onEdit - Callback fungsi saat pengguna memilih sebuah buku untuk diedit
 * @param {Function} props.onDelete - Callback fungsi saat pengguna mengonfirmasi penghapusan sebuah buku
 * @param {boolean} props.hasFilterOrSearch - Penanda boolean apakah filter kategori aktif atau kolom pencarian terisi
 */
export default function BookList({
  books,
  onEdit,
  onDelete,
  hasFilterOrSearch,
}) {
  // Handler untuk menangani interaksi klik tombol hapus dengan konfirmasi dialog browser eksplisit
  const handleDeleteClick = (book) => {
    // Memunculkan kotak dialog konfirmasi modal bawaan browser agar tindakan destruktif tidak terjadi secara tidak sengaja
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus buku "${book.title}" dari koleksi?`
    );
    // Jika pengguna menekan tombol "OK" / Setuju, panggil fungsi callback onDelete dengan meneruskan ID buku target
    if (isConfirmed) {
      onDelete(book.id);
    }
  };

  // Fungsi pembantu (helper) untuk memetakan kode status teknis ke elemen badge UI yang sesuai kelas tematiknya
  const getStatusBadge = (statusValue) => {
    // Cari konfigurasi status dari konstanta STATUS_OPTIONS berdasarkan nilai string status
    const found = STATUS_OPTIONS.find((opt) => opt.value === statusValue);
    if (found) {
      return (
        <span className={`status-badge ${found.badgeClass}`}>
          {found.label}
        </span>
      );
    }
    // Fallback jika status tidak dikenal dalam daftar konfigurasi
    return <span className="status-badge badge-default">{statusValue}</span>;
  };

  // Kondisi Render Kosong (Empty State): dieksekusi jika panjang array books bernilai 0
  if (books.length === 0) {
    return (
      <div className="empty-book-list" role="status">
        {/* Judul empty state: dibedakan antara akibat pencarian tidak cocok vs memang database kosong */}
        <p className="empty-title">
          {hasFilterOrSearch
            ? 'Buku Tidak Ditemukan'
            : 'Koleksi Buku Masih Kosong'}
        </p>
        {/* Pesan instruksi pemandu bagi pengguna sesuai kondisi */}
        <p className="empty-desc">
          {hasFilterOrSearch
            ? 'Coba ganti kata kunci pencarian atau sesuaikan opsi filter status.'
            : 'Mulai tambahkan buku pertama Anda menggunakan form di atas.'}
        </p>
      </div>
    );
  }

  return (
    // Kontainer grid daftar buku dengan penanda semantik ARIA
    <div className="book-list-grid" aria-label="Daftar koleksi buku">
      {/* Iterasi setiap item buku untuk merender kartu artikel semantik */}
      {books.map((book) => (
        <article key={book.id} className="book-card" data-testid="book-item">
          {/* Header kartu buku: Judul Buku dan Badge Label Status */}
          <div className="book-card-header">
            <h4 className="book-card-title">{book.title}</h4>
            {getStatusBadge(book.status)}
          </div>

          {/* Metadata nama penulis buku */}
          <p className="book-card-author">
            <span className="author-label">PENULIS:</span> {book.author}
          </p>

          {/* Kontainer tombol aksi interaktif (Edit dan Hapus) */}
          <div className="book-card-actions">
            {/* Tombol Edit: memanggil callback onEdit dengan membawa objek buku lengkap */}
            <button
              type="button"
              className="action-btn edit-btn"
              onClick={() => onEdit(book)}
              aria-label={`Edit buku ${book.title}`}
            >
              Edit
            </button>
            {/* Tombol Hapus: memicu handler dialog konfirmasi sebelum penghapusan */}
            <button
              type="button"
              className="action-btn delete-btn"
              onClick={() => handleDeleteClick(book)}
              aria-label={`Hapus buku ${book.title}`}
            >
              Hapus
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

// Validasi tipe data props komponen BookList menggunakan PropTypes
BookList.propTypes = {
  // Array koleksi buku dengan bentuk objek data spesifik
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  // Callback saat tombol edit ditekan (wajib ada)
  onEdit: PropTypes.func.isRequired,
  // Callback saat konfirmasi hapus disetujui (wajib ada)
  onDelete: PropTypes.func.isRequired,
  // Indikator boolean status penyaringan aktif (opsional, default: false)
  hasFilterOrSearch: PropTypes.bool,
};

BookList.defaultProps = {
  hasFilterOrSearch: false,
};

