import { useMemo } from 'react';

/**
 * Custom Hook: useBookStats
 * Berfungsi mengekstraksi dan menghitung metrik agregasi statistik dari seluruh koleksi buku.
 * Mengisolasi logika komputasi bisnis dari komponen tampilan (Separation of Concerns).
 *
 * @param {Array<Object>} [books=[]] - Array seluruh koleksi buku yang tersimpan
 * @returns {{ total: number, milik: number, baca: number, beli: number }} Objek rekapitulasi jumlah buku per kategori
 */
export function useBookStats(books = []) {
  // Gunakan useMemo untuk memoisasi hasil komputasi; kalkulasi hanya diulang jika referensi array books berubah
  const stats = useMemo(() => {
    // Struktur data awal akumulator metrik statistik
    const initial = { total: 0, milik: 0, baca: 0, beli: 0 };

    // Validasi defensif: kembalikan nilai 0 jika input bukan berupa array valid
    if (!Array.isArray(books)) {
      return initial;
    }

    // Melakukan proses reduksi agregasi linear satu putaran (single-pass O(n)) terhadap seluruh elemen buku
    return books.reduce((acc, book) => {
      // Inkrementasi total keseluruhan buku
      acc.total += 1;

      // Inkrementasi counter spesifik berdasarkan status buku
      if (book.status === 'milik') {
        acc.milik += 1;
      } else if (book.status === 'baca') {
        acc.baca += 1;
      } else if (book.status === 'beli') {
        acc.beli += 1;
      }

      return acc;
    }, initial);
  }, [books]); // Dependensi: hanya hitung ulang jika referensi state array books mengalami perubahan

  return stats;
}

export default useBookStats;

