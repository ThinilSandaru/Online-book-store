import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import booksData from '../data/books.json';
import type { Book } from '../types';
import { Search, Filter } from 'lucide-react';

const BrowseBooks: React.FC = () => {
    const books: Book[] = booksData as Book[];
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];

    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
                        <p className="text-gray-600 mt-1">Found {filteredBooks.length} books for you</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search books, authors..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <select
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white w-full sm:w-48 cursor-pointer"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-medium text-gray-900">No books found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                            className="mt-4 text-primary font-medium hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseBooks;
