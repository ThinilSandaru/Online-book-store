import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getUserInventory, type InventoryBook } from '../services/api';
import { Search, Loader2, AlertCircle, BookOpen } from 'lucide-react';

const BrowseBooks: React.FC = () => {
    const [books, setBooks] = useState<InventoryBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getUserInventory();
                setBooks(data);
            } catch (err) {
                console.error('Failed to fetch books:', err);
                setError(err instanceof Error ? err.message : 'Failed to load books');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-xl text-center max-w-md">
                    <AlertCircle className="mx-auto mb-4" size={40} />
                    <p className="font-semibold text-lg">Failed to load books</p>
                    <p className="text-sm mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
                        <p className="text-gray-600 mt-1">Found {filteredBooks.length} books for you</p>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search books, authors..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <BookOpen className="mx-auto mb-4 text-gray-300" size={64} />
                        <h3 className="text-xl font-medium text-gray-900">No books found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search to find what you're looking for.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseBooks;
