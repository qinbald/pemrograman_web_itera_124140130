import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validateBook, STATUS_OPTIONS } from '../../utils/bookHelpers.js';
import './BookForm.css';

/**
 * Komponen Form Reusable: BookForm
 * Bertujuan mengelola formulir input data buku baik untuk mode penambahan baru maupun pembaruan data yang sudah ada (edit).
 * Mengimplementasikan pola Controlled Component di mana seluruh nilai input diikat langsung ke state lokal React.
 *
 * @param {Object} props - Properti komponen
 * @param {Function} props.onSubmit - Callback fungsi induk untuk memproses data buku yang valid (tambah/update)
 * @param {Object|null} props.editingBook - Objek buku yang sedang diedit; bernilai null jika form berada pada mode tambah
 * @param {Function|null} props.onCancelEdit - Callback fungsi induk untuk membatalkan mode edit dan mereset form
 */
export default function BookForm({ onSubmit, editingBook, onCancelEdit }) {
  // State lokal penampung nilai form (controlled inputs)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik',
  });

  // State lokal penampung pesan kesalahan validasi per field (key: nama field, value: string pesan error)
  const [errors, setErrors] = useState({});

  // State lokal penampung string pesan notifikasi keberhasilan setelah proses submit
  const [successMessage, setSuccessMessage] = useState('');

  // Efek samping (side effect) untuk menyinkronkan isi formulir saat mode edit diaktifkan atau dibatalkan oleh komponen induk
  useEffect(() => {
    if (editingBook) {
      // Masuk ke mode edit: isi formulir dengan data buku yang dipilih
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        status: editingBook.status,
      });
      // Bersihkan pesan error dan notifikasi lama agar form bersih saat mulai mengedit
      setErrors({});
      setSuccessMessage('');
    } else {
      // Keluar dari mode edit: kembalikan semua field formulir ke nilai default awal
      setFormData({
        title: '',
        author: '',
        status: 'milik',
      });
    }
  }, [editingBook]);

  // Handler event perubahan input (onChange) untuk field teks dan dropdown
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Perbarui state form secara immutable menggunakan computed property name
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus pesan kesalahan pada field tersebut secara real-time saat pengguna mulai mengetik perbaikan
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handler event pengiriman form (onSubmit)
  const handleSubmit = (e) => {
    // Mencegah perilaku default browser berupa reload halaman secara penuh
    e.preventDefault();

    // Jalankan validasi domain eksplisit terhadap nilai input form saat ini
    const validation = validateBook(formData);
    if (!validation.isValid) {
      // Hentikan proses jika tidak valid dan simpan objek error ke state untuk ditampilkan ke UI
      setErrors(validation.errors);
      setSuccessMessage('');
      return;
    }

    // Eksekusi callback onSubmit yang diteruskan dari komponen induk (Home) dengan membawa data bersih
    onSubmit({
      title: formData.title,
      author: formData.author,
      status: formData.status,
    });

    // Bersihkan seluruh error validasi dan tampilkan notifikasi keberhasilan sesuai mode operasi
    setErrors({});
    setSuccessMessage(
      editingBook
        ? 'Perubahan data buku berhasil disimpan!'
        : 'Buku baru berhasil ditambahkan ke koleksi!'
    );

    // Kosongkan kembali form jika operasi yang dilakukan adalah penambahan buku baru
    if (!editingBook) {
      setFormData({
        title: '',
        author: '',
        status: 'milik',
      });
    }

    // Set timer pembersihan notifikasi sukses otomatis setelah 3000 milidetik (3 detik)
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000);

    // Cleanup timer timeout untuk mencegah kebocoran memori jika komponen unmount sebelum timer selesai
    return () => clearTimeout(timer);
  };

  // Handler saat tombol Batal diklik pada mode edit
  const handleCancel = () => {
    // Bersihkan status kesalahan dan notifikasi
    setErrors({});
    setSuccessMessage('');
    // Panggil callback pembatalan pada komponen induk agar state editingBook kembali direset ke null
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    // Form utama dengan penonaktifan validasi bawaan HTML5 (noValidate) agar seluruh validasi dikendalikan oleh fungsi JavaScript
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      {/* Judul formulir: menampilkan judul dinamis sesuai kondisi apakah sedang dalam mode edit atau mode penambahan baru */}
      <h3 className="form-title">
        {editingBook ? 'Edit Data Buku' : 'Tambah Buku Baru'}
      </h3>

      {/* Banner notifikasi sukses: dirender secara kondisional hanya saat state successMessage memiliki isi teks */}
      {successMessage && (
        <div className="feedback-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Kontainer input: Judul Buku (Wajib diisi) */}
      <div className="form-group">
        <label htmlFor="book-title" className="form-label">
          Judul Buku <span className="required-star">*</span>
        </label>
        <input
          id="book-title"
          name="title"
          type="text"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          placeholder="Contoh: Laskar Pelangi"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {/* Pesan error validasi judul: hanya dirender jika terdapat error pada state errors.title */}
        {errors.title && (
          <span id="title-error" className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      {/* Kontainer input: Nama Penulis Buku (Wajib diisi) */}
      <div className="form-group">
        <label htmlFor="book-author" className="form-label">
          Penulis <span className="required-star">*</span>
        </label>
        <input
          id="book-author"
          name="author"
          type="text"
          className={`form-input ${errors.author ? 'input-error' : ''}`}
          placeholder="Contoh: Andrea Hirata"
          value={formData.author}
          onChange={handleChange}
          aria-invalid={!!errors.author}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {/* Pesan error validasi penulis: hanya dirender jika terdapat error pada state errors.author */}
        {errors.author && (
          <span id="author-error" className="error-message" role="alert">
            {errors.author}
          </span>
        )}
      </div>

      {/* Kontainer input: Dropdown Status Buku (Pilihan terkontrol: milik, baca, beli) */}
      <div className="form-group">
        <label htmlFor="book-status" className="form-label">
          Status Buku <span className="required-star">*</span>
        </label>
        <select
          id="book-status"
          name="status"
          className={`form-select ${errors.status ? 'input-error' : ''}`}
          value={formData.status}
          onChange={handleChange}
          aria-invalid={!!errors.status}
          aria-describedby={errors.status ? 'status-error' : undefined}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Pesan error validasi status jika opsi status tidak sesuai daftar */}
        {errors.status && (
          <span id="status-error" className="error-message" role="alert">
            {errors.status}
          </span>
        )}
      </div>

      {/* Kontainer tombol aksi: Submit form dan Batal edit (muncul khusus pada mode edit) */}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>

        {/* Tombol batal hanya ditampilkan jika pengguna sedang berada dalam mode edit buku */}
        {editingBook && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

// Deklarasi spesifikasi tipe data properti (PropTypes) untuk menjamin keabsahan data saat proses pengembangan
BookForm.propTypes = {
  // Fungsi penangan submit wajib disediakan oleh komponen pemanggil
  onSubmit: PropTypes.func.isRequired,
  // Objek buku aktif yang sedang diedit; opsional tetapi jika ada harus sesuai skema objek
  editingBook: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  // Fungsi pembatalan mode edit; opsional
  onCancelEdit: PropTypes.func,
};

// Nilai default untuk properti opsional
BookForm.defaultProps = {
  editingBook: null,
  onCancelEdit: null,
};

