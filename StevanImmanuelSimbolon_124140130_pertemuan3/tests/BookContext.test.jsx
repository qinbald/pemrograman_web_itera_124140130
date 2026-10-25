import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import PropTypes from 'prop-types';
import { BookProvider, useBooks } from '../src/context/BookContext.jsx';

describe('BookContext & BookProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>;
  wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  it('menyediakan daftar buku awal dari default/localStorage', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    expect(Array.isArray(result.current.books)).toBe(true);
    expect(result.current.books.length).toBeGreaterThan(0);
  });

  it('dapat menambahkan buku baru ke dalam state dan storage', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    const initialLength = result.current.books.length;

    act(() => {
      result.current.addBook({
        title: 'Buku Pengujian',
        author: 'Tester',
        status: 'beli',
      });
    });

    expect(result.current.books.length).toBe(initialLength + 1);
    expect(result.current.books[0].title).toBe('Buku Pengujian');
    expect(result.current.books[0].status).toBe('beli');
  });

  it('dapat mengedit data buku yang ada', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    const targetId = result.current.books[0].id;

    act(() => {
      result.current.updateBook(targetId, {
        title: 'Judul Baru Diperbarui',
        author: 'Penulis Diperbarui',
        status: 'baca',
      });
    });

    const updated = result.current.books.find((b) => b.id === targetId);
    expect(updated.title).toBe('Judul Baru Diperbarui');
    expect(updated.author).toBe('Penulis Diperbarui');
    expect(updated.status).toBe('baca');
  });

  it('dapat menghapus buku dari koleksi', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    const targetId = result.current.books[0].id;
    const initialLength = result.current.books.length;

    act(() => {
      result.current.deleteBook(targetId);
    });

    expect(result.current.books.length).toBe(initialLength - 1);
    expect(result.current.books.some((b) => b.id === targetId)).toBe(false);
  });
});

