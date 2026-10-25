import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { generateId } from '../utils/bookHelpers.js';

// Kunci identifikasi unik penyimpanan data koleksi buku pada Web Storage (localStorage) browser
const STORAGE_KEY = 'mybook-books';

// Data bawaan (mock initial seed) yang digunakan secara otomatis hanya ketika localStorage masih kosong pada pertama kali buka
const INITIAL_BOOKS = [
  {
    id: 'buku-1',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    status: 'milik',
    createdAt: '2025-01-10T10:00:00.000Z',
  },
  {
    id: 'buku-2',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt & David Thomas',
    status: 'baca',
    createdAt: '2025-02-15T12:00:00.000Z',
  },
  {
    id: 'buku-3',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    status: 'beli',
    createdAt: '2025-03-01T08:30:00.000Z',
  },
];

// Inisialisasi React Context untuk data buku dengan nilai awal null
export const BookContext = createContext(null);

/**
 * Komponen Penyedia (Provider): BookProvider
 * Berfungsi sebagai sumber kebenaran tunggal (Single Source of Truth) untuk state data buku di seluruh aplikasi.
 * Mencegah problem prop drilling dengan menyediakan state global dan fungsi-fungsi mutasi CRUD ke seluruh komponen anak.
 *
 * @param {Object} props - Properti komponen
 * @param {React.ReactNode} props.children - Komponen-komponen anak yang dibungkus oleh Provider
 */
export function BookProvider({ children }) {
  // State utama daftar buku: menggunakan custom hook useLocalStorage agar otomatis tersimpan di storage browser
  const [books, setBooks] = useLocalStorage(STORAGE_KEY, INITIAL_BOOKS);

  // State penunjuk buku yang sedang berada dalam mode edit; bernilai null jika tidak ada buku yang sedang diedit
  const [editingBook, setEditingBook] = useState(null);

  /**
   * Fungsi Mutasi: Menambah Buku Baru
   * Membentuk objek buku lengkap dengan ID acak unik, pembersihan spasi teks (trim), dan penanda waktu pembuatan (createdAt).
   * Menempatkan buku baru di posisi paling atas (indeks 0) array state secara immutable.
   *
   * @param {Object} bookData - Data buku dari form ({ title, author, status })
   */
  const addBook = (bookData) => {
    const newBook = {
      id: generateId(),
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      status: bookData.status,
      createdAt: new Date().toISOString(),
    };
    // Menggunakan fungsi pembaruan fungsional untuk menjamin integritas state sebelumnya
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  /**
   * Fungsi Mutasi: Memperbarui Data Buku
   * Mencari buku berdasarkan ID lalu memodifikasi atribut judul, penulis, dan status secara immutable.
   * Secara otomatis mereset pointer editingBook kembali ke null jika buku yang diperbarui adalah buku yang sedang aktif diedit.
   *
   * @param {string} id - ID unik buku yang akan diperbarui
   * @param {Object} updatedData - Nilai field terbaru ({ title, author, status })
   */
  const updateBook = (id, updatedData) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              title: updatedData.title.trim(),
              author: updatedData.author.trim(),
              status: updatedData.status,
            }
          : book
      )
    );
    // Reset status edit jika buku yang sedang diedit selesai disimpan
    if (editingBook && editingBook.id === id) {
      setEditingBook(null);
    }
  };

  /**
   * Fungsi Mutasi: Menghapus Buku
   * Menyaring keluar (membuang) buku dengan ID yang ditentukan dari array state secara immutable.
   * Mereset pointer editingBook ke null jika buku yang sedang aktif diedit ikut terhapus.
   *
   * @param {string} id - ID unik buku yang akan dihapus
   */
  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    if (editingBook && editingBook.id === id) {
      setEditingBook(null);
    }
  };

  // Objek nilai context yang diekspos ke seluruh komponen konsumen
  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
    editingBook,
    setEditingBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

// Validasi properti children pada BookProvider
BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom Consumer Hook: useBooks
 * Mempermudah komponen konsumen untuk mengakses data dan fungsi manipulasi buku dari BookContext.
 * Dilengkapi pengecekan perlindungan: melempar error eksplisit jika dipanggil di luar cakupan <BookProvider>.
 *
 * @returns {Object} Objek konteks buku ({ books, addBook, updateBook, deleteBook, editingBook, setEditingBook })
 */
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam <BookProvider>');
  }
  return context;
}

