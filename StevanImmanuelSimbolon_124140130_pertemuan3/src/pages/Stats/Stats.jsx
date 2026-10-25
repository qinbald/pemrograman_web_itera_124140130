import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext.jsx';
import { useBookStats } from '../../hooks/useBookStats.js';
import './Stats.css';

/**
 * Komponen Halaman: Stats
 * Menampilkan dasbor analitik dan statistik visual komprehensif mengenai koleksi buku pengguna.
 * Mengonsumsi data buku dari BookContext dan mendelegasikan perhitungan agregasi ke custom hook useBookStats.
 */
export default function Stats() {
  // Ambil data buku dari konteks global aplikasi
  const { books } = useBooks();

  // Eksekusi kalkulasi metrik agregasi (total, milik, baca, beli) via custom hook yang termemoisasi
  const stats = useBookStats(books);

  /**
   * Fungsi Helper: Menghitung Rasio Persentase
   * Menghindari kesalahan fatal pembagian dengan nol (division by zero) saat koleksi buku masih 0.
   *
   * @param {number} count - Jumlah buku dalam kategori tertentu
   * @returns {number} Nilai persentase bulat (0 - 100)
   */
  const getPercentage = (count) => {
    if (stats.total === 0) return 0;
    return Math.round((count / stats.total) * 100);
  };

  // Kalkulasi persentase masing-masing kategori status buku terhadap total koleksi
  const pctMilik = getPercentage(stats.milik);
  const pctBaca = getPercentage(stats.baca);
  const pctBeli = getPercentage(stats.beli);

  return (
    <div className="stats-page">
      {/* Header Halaman Statistik */}
      <div className="stats-header">
        <h2 className="page-heading">Statistik Koleksi Buku</h2>
        <p className="page-subheading">
          Ringkasan komprehensif seluruh buku pribadi yang tercatat di sistem.
        </p>
      </div>

      {/* Grid 4 Kartu Metrik Angka Utama */}
      <div className="stats-grid" aria-label="Ringkasan Statistik">
        {/* Kartu 1: Total Seluruh Buku */}
        <div className="stat-card card-total">
          <div className="stat-body">
            <span className="stat-title">Total Semua Buku</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>

        {/* Kartu 2: Buku yang Sudah Dimiliki */}
        <div className="stat-card card-milik">
          <div className="stat-body">
            <span className="stat-title">Buku Dimiliki</span>
            <span className="stat-value">{stats.milik}</span>
            <span className="stat-percentage">{pctMilik}% dari total</span>
          </div>
        </div>

        {/* Kartu 3: Buku yang Sedang Dibaca */}
        <div className="stat-card card-baca">
          <div className="stat-body">
            <span className="stat-title">Sedang Dibaca</span>
            <span className="stat-value">{stats.baca}</span>
            <span className="stat-percentage">{pctBaca}% dari total</span>
          </div>
        </div>

        {/* Kartu 4: Buku yang Ingin Dibeli */}
        <div className="stat-card card-beli">
          <div className="stat-body">
            <span className="stat-title">Ingin Dibeli</span>
            <span className="stat-value">{stats.beli}</span>
            <span className="stat-percentage">{pctBeli}% dari total</span>
          </div>
        </div>
      </div>

      {/* Bagian Visualisasi Bar Distribusi Status */}
      <section className="distribution-section" aria-label="Distribusi Koleksi">
        <h3 className="section-title">Distribusi Status Koleksi</h3>

        {/* Render kondisional: Jika belum ada buku sama sekali, tampilkan pemberitahuan */}
        {stats.total === 0 ? (
          <p className="empty-stats-notice">
            Belum ada data buku untuk dianalisis. Silakan tambahkan buku di halaman Home.
          </p>
        ) : (
          <div className="distribution-wrapper">
            {/* Bilah Progres Gabungan (Stacked Progress Bar) */}
            <div className="progress-bar-container" title="Distribusi Status">
              {/* Segmen 1: Persentase Buku Dimiliki */}
              <div
                className="progress-segment bar-milik"
                style={{ width: `${pctMilik}%` }}
                title={`Dimiliki: ${pctMilik}%`}
              />
              {/* Segmen 2: Persentase Buku Sedang Dibaca */}
              <div
                className="progress-segment bar-baca"
                style={{ width: `${pctBaca}%` }}
                title={`Sedang Dibaca: ${pctBaca}%`}
              />
              {/* Segmen 3: Persentase Buku Ingin Dibeli */}
              <div
                className="progress-segment bar-beli"
                style={{ width: `${pctBeli}%` }}
                title={`Ingin Dibeli: ${pctBeli}%`}
              />
            </div>

            {/* Legenda Keterangan Warna Segmen Distribusi */}
            <div className="distribution-legend">
              <div className="legend-item">
                <span className="legend-dot dot-milik"></span>
                <span>Dimiliki ({stats.milik} buku — {pctMilik}%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-baca"></span>
                <span>Sedang Dibaca ({stats.baca} buku — {pctBaca}%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-beli"></span>
                <span>Ingin Dibeli ({stats.beli} buku — {pctBeli}%)</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tombol Tautan Cepat untuk Kembali ke Halaman Utama */}
      <div className="stats-actions">
        <Link to="/" className="btn btn-primary back-link">
          ← Kembali ke Kelola Buku
        </Link>
      </div>
    </div>
  );
}

