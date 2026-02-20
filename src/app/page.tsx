'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Book } from '@/lib/types';
import { fetchBooks } from '@/lib/books';
import { fuzzySearch } from '@/lib/utils';
import { Header } from '@/components/Header';
import { BookGrid } from '@/components/BookGrid';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Failed to load books:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return fuzzySearch(searchQuery, books, ['title', 'author', 'originalName']);
  }, [searchQuery, books]);

  return (
    <main className="min-h-screen pt-32 pb-12">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.05)_0%,rgba(0,0,0,0)_50%)]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_100%_100%,rgba(245,158,11,0.05)_0%,rgba(0,0,0,0)_50%)]" />

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        count={filteredBooks.length}
      />

      <div className="container mx-auto max-w-7xl px-6">
        {loading ? (
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
            <p className="font-medium text-white/40 animate-pulse tracking-widest uppercase text-xs">
              Cargando biblioteca...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {searchQuery && (
              <p className="text-sm font-medium text-white/40">
                Mostrando {filteredBooks.length} resultados para "{searchQuery}"
              </p>
            )}
            <BookGrid books={filteredBooks} />
          </div>
        )}
      </div>

      <footer className="mt-20 border-t border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-medium text-white/20">
            © 2026 Club de Lectura Digital • {books.length} libros disponibles
          </p>
        </div>
      </footer>
    </main>
  );
}
