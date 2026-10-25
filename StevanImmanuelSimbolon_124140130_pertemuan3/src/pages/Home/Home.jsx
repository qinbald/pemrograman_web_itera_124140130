import { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { filterBooks } from '../../utils/bookHelpers.js';
import BookForm from '../../components/BookForm/BookForm.jsx';
import BookFilter from '../../components/BookFilter/BookFilter.jsx';
import BookList from '../../components/BookList/BookList.jsx';
import './Home.css';

/**
 * Komponen Halaman: Home
 * Halaman utama aplikasi yang mengorkestrasi tiga komponen inti: BookForm, BookFilter, dan BookList.
 * Berperan mengoordinasikan interaksi antara state global (dari BookContext) dengan state antarmuka lokal (pencarian & filter).
 */
export default function Home() {
  // Konsumsi data state dan fungsi aksi CRUD dari context global buku
  const {
    books,
    addBook,
    updateBook,
    deleteBook,
    editingBook,
    setEditingBook,
  } = useBooks();

  // State lokal penampung kata kunci pencarian teks pada input pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // State lokal penampung kategori filter status yang sedang dipilih pengguna
  const [statusFilter, setStatusFilter] = useState('semua');

  // Menjalankan penyaringan terhadap daftar buku berdasarkan nilai statusFilter dan searchTerm yang aktif
  const filteredBooks = filterBooks(books, statusFilter, searchTerm);

  // Evaluasi boolean untuk mengecek apakah saat ini ada penyaringan atau pencarian yang sedang aktif
  const hasFilterOrSearch = searchTerm.trim() !== '' || statusFilter !== 'semua';

  // Handler callback saat form input disubmit: membedakan antara aksi perbarui (edit) dan tambah baru
  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      // Jika state editingBook ada isinya, panggil fungsi pembaruan data buku
      updateBook(editingBook.id, bookData);
    } else {
      // Jika state editingBook null, masukkan sebagai data buku baru
      addBook(bookData);
    }
  };

  return (
    <div className="home-page">
      {/* Bagian Kepala Halaman (Header) */}
      <div className="home-header">
        <h2 className="page-heading">Kelola Koleksi Buku</h2>
        <p className="page-subheading">
          Catat buku yang Anda miliki, sedang dibaca, maupun rencana pembelian selanjutnya.
        </p>
      </div>

      {/* Bagian 1: Formulir Input Buku (Tambah atau Edit) */}
      <section className="home-form-section" aria-label="Form Input Buku">
        <BookForm
          onSubmit={handleFormSubmit}
          editingBook={editingBook}
          onCancelEdit={() => setEditingBook(null)}
        />
      </section>

      {/* Bagian 2: Panel Pencarian dan Filter Kategori Status */}
      <section className="home-filter-section" aria-label="Pencarian dan Filter">
        <BookFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
      </section>

      {/* Bagian 3: Daftar Koleksi Buku yang Telah Difilter */}
      <section className="home-list-section" aria-label="Daftar Buku">
        {/* Informasi Ringkasan Jumlah Buku yang Tampil */}
        <div className="list-meta-info">
          <h3 className="list-title">Daftar Buku</h3>
          <span className="list-count-badge">
            Menampilkan {filteredBooks.length} dari {books.length} buku
          </span>
        </div>

        {/* Komponen Grid Daftar Kartu Buku */}
        <BookList
          books={filteredBooks}
          onEdit={(book) => setEditingBook(book)}
          onDelete={deleteBook}
          hasFilterOrSearch={hasFilterOrSearch}
        />
      </section>
    </div>
  );
}

