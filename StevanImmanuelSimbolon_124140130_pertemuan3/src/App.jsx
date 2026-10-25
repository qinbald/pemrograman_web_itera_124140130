import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext.jsx';
import Home from './pages/Home/Home.jsx';
import Stats from './pages/Stats/Stats.jsx';
import './App.css';

/**
 * Komponen Induk Aplikasi: App
 * Mengintegrasikan lapisan State Management global (BookProvider) dan Client-Side Routing (BrowserRouter).
 * Mengatur kerangka tata letak universal: Header navigasi atas, kontainer rute dinamis, dan Footer bawah.
 */
export default function App() {
  return (
    // Lapisan 1: BookProvider membungkus seluruh aplikasi agar state koleksi buku dapat diakses di rute manapun
    <BookProvider>
      {/* Lapisan 2: BrowserRouter mengaktifkan navigasi SPA (Single Page Application) berbasis HTML5 History API */}
      <BrowserRouter>
        <div className="app-container">
          {/* Header Universal Aplikasi */}
          <header className="app-header">
            <div className="header-content">
              {/* Tautan Logo Aplikasi menuju halaman beranda */}
              <Link to="/" className="app-logo">
                <span className="logo-text">MYBOOK</span>
              </Link>

              {/* Bilah Navigasi Menu Utama */}
              <nav className="app-nav" aria-label="Navigasi Utama">
                {/* NavLink Beranda: 'end' memastikan status aktif hanya menyala saat URL tepat '/' */}
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  Beranda
                </NavLink>

                {/* NavLink Statistik: aktif saat pengguna berada pada URL '/stats' */}
                <NavLink
                  to="/stats"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  Statistik
                </NavLink>
              </nav>
            </div>
          </header>

          {/* Area Konten Utama Aplikasi */}
          <main className="app-main">
            <div className="main-content-wrapper">
              {/* Definisi Rute-Rute Halaman Aplikasi */}
              <Routes>
                {/* Rute 1: Halaman Beranda (Kelola Buku) */}
                <Route path="/" element={<Home />} />

                {/* Rute 2: Halaman Statistik Koleksi Buku */}
                <Route path="/stats" element={<Stats />} />

                {/* Rute 3: Fallback Wildcard untuk URL yang tidak terdaftar (Halaman 404) */}
                <Route
                  path="*"
                  element={
                    <div className="not-found-container">
                      <h2>404 — Halaman Tidak Ditemukan</h2>
                      <p>Halaman yang Anda cari tidak tersedia.</p>
                      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
                        Kembali ke Beranda
                      </Link>
                    </div>
                  }
                />
              </Routes>
            </div>
          </main>

          {/* Footer Universal Aplikasi dengan tahun dinamis */}
          <footer className="app-footer">
            <p>© {new Date().getFullYear()} MyBook — Manajemen Buku Pribadi</p>
          </footer>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}

