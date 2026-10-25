import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from '../src/components/BookFilter/BookFilter.jsx';

describe('Komponen BookFilter', () => {
  it('merender input pencarian dan tombol status filter', () => {
    render(
      <BookFilter
        searchTerm=""
        onSearchChange={vi.fn()}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText(/Cari berdasarkan judul atau penulis/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Semua' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Milik' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sedang Dibaca' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ingin Dibeli' })).toBeInTheDocument();
  });

  it('memanggil onSearchChange saat nilai input pencarian berubah', () => {
    const handleSearchChange = vi.fn();
    render(
      <BookFilter
        searchTerm=""
        onSearchChange={handleSearchChange}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(/Cari berdasarkan judul atau penulis/i);
    fireEvent.change(input, { target: { value: 'clean' } });

    expect(handleSearchChange).toHaveBeenCalledWith('clean');
  });

  it('memanggil onStatusChange dengan status yang sesuai saat tombol filter diklik', () => {
    const handleStatusChange = vi.fn();
    render(
      <BookFilter
        searchTerm=""
        onSearchChange={vi.fn()}
        statusFilter="semua"
        onStatusChange={handleStatusChange}
      />
    );

    const bacaBtn = screen.getByRole('button', { name: 'Sedang Dibaca' });
    fireEvent.click(bacaBtn);

    expect(handleStatusChange).toHaveBeenCalledWith('baca');
  });

  it('menyediakan tombol hapus kata kunci pencarian jika search input terisi', () => {
    const handleSearchChange = vi.fn();
    render(
      <BookFilter
        searchTerm="Harry Potter"
        onSearchChange={handleSearchChange}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />
    );

    const clearBtn = screen.getByRole('button', { name: /Hapus pencarian/i });
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(handleSearchChange).toHaveBeenCalledWith('');
  });
});

