import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from '../src/components/BookList/BookList.jsx';

describe('Komponen BookList', () => {
  const sampleBooks = [
    {
      id: 'book-1',
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'milik',
    },
    {
      id: 'book-2',
      title: 'Deep Work',
      author: 'Cal Newport',
      status: 'baca',
    },
  ];

  it('merender daftar kartu buku dengan judul, penulis, dan badge status', () => {
    render(<BookList books={sampleBooks} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Atomic Habits')).toBeInTheDocument();
    expect(screen.getByText(/James Clear/i)).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();

    expect(screen.getByText('Deep Work')).toBeInTheDocument();
    expect(screen.getByText(/Cal Newport/i)).toBeInTheDocument();
    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
  });

  it('memanggil onEdit saat tombol edit diklik', () => {
    const handleEdit = vi.fn();
    render(<BookList books={sampleBooks} onEdit={handleEdit} onDelete={vi.fn()} />);

    const editBtns = screen.getAllByRole('button', { name: /Edit/i });
    fireEvent.click(editBtns[0]);

    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(sampleBooks[0]);
  });

  it('memanggil onDelete saat konfirmasi hapus disetujui', () => {
    const handleDelete = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<BookList books={sampleBooks} onEdit={vi.fn()} onDelete={handleDelete} />);

    const deleteBtns = screen.getAllByRole('button', { name: /Hapus/i });
    fireEvent.click(deleteBtns[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(handleDelete).toHaveBeenCalledWith('book-1');

    window.confirm.mockRestore();
  });

  it('tidak memanggil onDelete jika pengguna membatalkan konfirmasi', () => {
    const handleDelete = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<BookList books={sampleBooks} onEdit={vi.fn()} onDelete={handleDelete} />);

    const deleteBtns = screen.getAllByRole('button', { name: /Hapus/i });
    fireEvent.click(deleteBtns[0]);

    expect(window.confirm).toHaveBeenCalled();
    expect(handleDelete).not.toHaveBeenCalled();

    window.confirm.mockRestore();
  });

  it('menampilkan pesan kosong yang sesuai jika buku tidak ada', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(/Koleksi Buku Masih Kosong/i)).toBeInTheDocument();
  });

  it('menampilkan pesan tidak ditemukan saat filter/pencarian tidak ada hasil', () => {
    render(
      <BookList
        books={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        hasFilterOrSearch={true}
      />
    );

    expect(screen.getByText(/Buku Tidak Ditemukan/i)).toBeInTheDocument();
  });
});

