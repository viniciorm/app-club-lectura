import React from 'react';
import { Book } from '@/lib/types';
import { BookCard } from './BookCard';

interface BookGridProps {
    books: Book[];
}

export const BookGrid: React.FC<BookGridProps> = ({ books }) => {
    if (books.length === 0) {
        return (
            <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4 text-white/40">
                <div className="rounded-full bg-white/5 p-8">
                    <svg className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <p className="text-lg font-medium">No se encontraron libros</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book, index) => (
                <BookCard key={`${book.title}-${index}`} book={book} />
            ))}
        </div>
    );
};
