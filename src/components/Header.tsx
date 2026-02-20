import React from 'react';
import { Search, Library } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    count: number;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, count }) => {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 md:flex-row">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 p-2.5 shadow-lg shadow-orange-500/20">
                        <Library className="h-6 w-6 text-black" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-white md:text-2xl">
                            CLUB <span className="text-amber-400">LECTURA</span>
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                            Biblioteca Digital
                        </p>
                    </div>
                </div>

                <div className="relative w-full max-w-xl md:w-[400px]">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                        type="text"
                        placeholder="Buscar por título, autor o nombre..."
                        className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 text-sm text-white placeholder:text-white/30 focus:border-amber-400/50 focus:outline-none focus:ring-4 focus:ring-amber-400/10 transition-all duration-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/5 px-2 py-1 text-[10px] font-bold text-white/40">
                        {count} LIBROS
                    </div>
                </div>
            </div>
        </header>
    );
};
