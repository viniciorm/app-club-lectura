import React from 'react';
import { Book } from '@/lib/types';
import { ExternalLink, BookOpen } from 'lucide-react';

interface BookCardProps {
    book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-2xl hover:shadow-white/5">
            <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-white/10 p-2 text-white">
                    <BookOpen className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium text-white/40">{book.date.split(' ')[0]}</span>
            </div>

            <div className="space-y-2">
                <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-amber-400">
                    {book.title}
                </h3>
                <p className="text-sm font-medium text-white/60">
                    {book.author}
                </p>
                <p className="mt-2 text-xs italic text-white/30 line-clamp-1">
                    {book.originalName}
                </p>
            </div>

            <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-amber-400 hover:scale-[1.05] active:scale-95"
            >
                Leer Libro 📖
                <ExternalLink className="h-4 w-4" />
            </a>
        </div>
    );
};
