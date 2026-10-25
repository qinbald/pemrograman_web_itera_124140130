import { useState, useEffect } from 'react';

/**
 * Custom Hook: useLocalStorage
 * Mengabstraksi Web Storage API (localStorage) agar terintegrasi mulus dengan siklus hidup reaktif React.
 * Menyediakan fungsionalitas persistensi data sisi klien yang tetap tersimpan meskipun browser direfresh atau ditutup.
 *
 * @template T
 * @param {string} key - Kunci unik pengenal data di dalam localStorage browser
 * @param {T} initialValue - Nilai default yang digunakan jika kunci belum pernah tersimpan sebelumnya
 * @returns {[T, Function]} Tuple berisi nilai state saat ini dan fungsi setter pembaru state
 */
export function useLocalStorage(key, initialValue) {
  // Inisialisasi state secara malas (Lazy Initial State) dengan meneruskan fungsi callback.
  // Teknik ini menjamin pembacaan disk I/O localStorage yang lambat hanya dijalankan tepat 1 kali pada render awal (mounting).
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Pengecekan defensif untuk memastikan kode sedang dieksekusi di lingkungan browser yang memiliki objek window
      if (typeof window === 'undefined') {
        return initialValue;
      }
      // Ambil string mentah dari localStorage berdasarkan kunci yang diberikan
      const item = window.localStorage.getItem(key);
      // Jika data ditemukan (tidak bernilai null), deserialisasi string JSON menjadi objek JavaScript; jika tidak ada, gunakan initialValue
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Tangkap dan log kesalahan jika terjadi kegagalan parsing JSON atau akses storage diblokir oleh browser
      console.error(`Gagal membaca key "${key}" dari localStorage:`, error);
      return initialValue;
    }
  });

  // Efek samping (useEffect) untuk menyinkronkan setiap mutasi pada state storedValue kembali ke localStorage
  useEffect(() => {
    try {
      // Pastikan objek window tersedia sebelum mengakses localStorage
      if (typeof window !== 'undefined') {
        // Serialisasi objek state menjadi string JSON dan simpan ke localStorage
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      // Tangkap kemungkinan error kuota penyimpanan terlampaui (QuotaExceededError) atau mode private browsing
      console.error(`Gagal menulis key "${key}" ke localStorage:`, error);
    }
  }, [key, storedValue]); // Efek dipicu ulang hanya jika kunci identifikasi atau isi data mengalami perubahan

  return [storedValue, setStoredValue];
}

export default useLocalStorage;

