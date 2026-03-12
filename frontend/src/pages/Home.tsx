import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BookCard from '../components/BookCard';
import { getUserInventory, type InventoryBook } from '../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
    const [books, setBooks] = useState<InventoryBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getUserInventory();
                setBooks(data);
            } catch (err) {
                console.error('Failed to fetch featured books:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const featuredBooks = books.slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50">
            <Hero />
            <Features />

            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Books</h2>
                        <p className="text-gray-600">Handpicked selections just for you</p>
                    </div>
                    <Link to="/user/browse" className="hidden md:flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
                        View All <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    </div>
                ) : featuredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <p>No books available right now. Check back soon!</p>
                    </div>
                )}

                <div className="mt-8 text-center md:hidden">
                    <Link to="/user/browse" className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
                        View All <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-primary py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
                    <p className="text-blue-100 mb-8 max-w-lg mx-auto">
                        Stay updated with new releases, special offers, and literary news.
                    </p>
                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow"
                        />
                        <button className="bg-dark hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
