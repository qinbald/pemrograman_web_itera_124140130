import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../src/components/BookForm/BookForm.jsx';

describe('Komponen BookForm', () => {
  it('menolak submit dan menampilkan pesan error ketika judul buku kosong', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    // Isi penulis tetapi biarkan judul kosong
    const authorInput = screen.getByLabelText(/Penulis/i);
    fireEvent.change(authorInput, { target: { value: 'Andrea Hirata' } });

    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i });
    fireEvent.click(submitBtn);

    // Verifikasi error ditampilkan dan submit tidak dipanggil
    expect(screen.getByText(/Judul buku wajib diisi/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('menolak submit dan menampilkan pesan error ketika penulis kosong', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    // Isi judul tetapi biarkan penulis kosong
    const titleInput = screen.getByLabelText(/Judul Buku/i);
    fireEvent.change(titleInput, { target: { value: 'Laskar Pelangi' } });

    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i });
    fireEvent.click(submitBtn);

    // Verifikasi error penulis ditampilkan
    expect(screen.getByText(/Nama penulis wajib diisi/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('memanggil onSubmit dengan data yang benar jika seluruh field valid', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);

    const titleInput = screen.getByLabelText(/Judul Buku/i);
    const authorInput = screen.getByLabelText(/Penulis/i);
    const statusSelect = screen.getByLabelText(/Status Buku/i);

    fireEvent.change(titleInput, { target: { value: 'Bumi Manusia' } });
    fireEvent.change(authorInput, { target: { value: 'Pramoedya Ananta Toer' } });
    fireEvent.change(statusSelect, { target: { value: 'baca' } });

    const submitBtn = screen.getByRole('button', { name: /Tambah Buku/i });
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      status: 'baca',
    });
  });

  it('mengisi form dengan data buku saat mode edit aktif', () => {
    const handleSubmit = vi.fn();
    const editingBook = {
      id: '123',
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      status: 'milik',
    };

    render(<BookForm onSubmit={handleSubmit} editingBook={editingBook} />);

    expect(screen.getByLabelText(/Judul Buku/i)).toHaveValue('Filosofi Teras');
    expect(screen.getByLabelText(/Penulis/i)).toHaveValue('Henry Manampiring');
    expect(screen.getByRole('button', { name: /Simpan Perubahan/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Batal/i })).toBeInTheDocument();
  });
});

