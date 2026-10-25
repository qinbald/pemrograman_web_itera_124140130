import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../src/hooks/useLocalStorage.js';

describe('useLocalStorage custom hook', () => {
  const TEST_KEY = 'test-mybook-key';

  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  it('mengembalikan initialValue jika localStorage masih kosong', () => {
    const initialData = [{ id: '1', title: 'Buku A' }];
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, initialData));

    expect(result.current[0]).toEqual(initialData);
  });

  it('membaca data yang sudah tersimpan di localStorage', () => {
    const existingData = [{ id: '2', title: 'Buku B' }];
    window.localStorage.setItem(TEST_KEY, JSON.stringify(existingData));

    const { result } = renderHook(() => useLocalStorage(TEST_KEY, []));

    expect(result.current[0]).toEqual(existingData);
  });

  it('memperbarui state dan menyimpan data baru ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, []));

    const newData = [{ id: '3', title: 'Buku C' }];
    act(() => {
      result.current[1](newData);
    });

    expect(result.current[0]).toEqual(newData);
    expect(JSON.parse(window.localStorage.getItem(TEST_KEY))).toEqual(newData);
  });

  it('menangani data JSON korup dan fallback ke initialValue tanpa crash', () => {
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.localStorage.setItem(TEST_KEY, '{invalid-json');

    const fallbackData = [{ id: 'fallback', title: 'Default' }];
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, fallbackData));

    expect(result.current[0]).toEqual(fallbackData);
    expect(spyError).toHaveBeenCalled();
    spyError.mockRestore();
  });
});

