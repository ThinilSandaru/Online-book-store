import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Minus, Plus, Search } from 'lucide-react';
import booksData from '../data/books.json';
import type { Book } from '../types';

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const book = (booksData as Book[]).find(b => b.id === id);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(book?.imageUrl);

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Book not found</h2>
                    <p className="text-gray-600 mt-2">The book you are looking for does not exist.</p>
                    <Link to="/browse" className="mt-4 inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                        Browse Books
                    </Link>
                </div>
            </div>
        );
    }

    // Initialize activeImage if it wasn't set (e.g. on first render)
    if (!activeImage) setActiveImage(book.imageUrl);

    const discountPercentage = book.originalPrice
        ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
        : 0;

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc' && quantity < book.stockCount) {
            setQuantity(prev => prev + 1);
        } else if (type === 'dec' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8">
                    <ol className="list-reset flex">
                        <li><Link to="/" className="text-gray-500 hover:text-primary">Home</Link></li>
                        <li><span className="mx-2">|</span></li>
                        <li><Link to="/browse" className="text-gray-500 hover:text-primary">Browse Books</Link></li>
                        <li><span className="mx-2">|</span></li>
                        <li className="text-gray-900 truncate">{book.title}</li>
                    </ol>
                </nav>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

                        {/* Image Section */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
                                <button
                                    onClick={() => setActiveImage(book.imageUrl)}
                                    className={`w-20 h-20 md:w-24 md:h-32 rounded-lg border-2 overflow-hidden ${activeImage === book.imageUrl ? 'border-primary' : 'border-transparent'}`}
                                >
                                    <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                                </button>
                                {book.thumbnails?.map((thumb, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(thumb)}
                                        className={`w-20 h-20 md:w-24 md:h-32 rounded-lg border-2 overflow-hidden ${activeImage === thumb ? 'border-primary' : 'border-transparent'}`}
                                    >
                                        <img src={thumb} alt={`${book.title} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            <div className="relative flex-grow order-1 md:order-2 bg-gray-50 rounded-lg flex items-center justify-center p-4">
                                <img src={activeImage} alt={book.title} className="max-h-[500px] object-contain shadow-lg" />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                                    <Search className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{book.title}</h1>
                                <div className="flex items-baseline space-x-4">
                                    <span className="text-3xl font-bold text-primary">Rs.{book.price.toLocaleString()}</span>
                                    {book.originalPrice && (
                                        <span className="text-lg text-gray-400 line-through">Rs.{book.originalPrice.toLocaleString()}</span>
                                    )}
                                    {discountPercentage > 0 && (
                                        <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                                            Sale!
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-b border-gray-100 py-6 space-y-4">
                                <div className="flex">
                                    <span className="w-32 text-gray-500">Language :</span>
                                    <span className="font-medium text-gray-900">{book.language}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-500">Author :</span>
                                    <span className="font-medium text-gray-900 text-primary cursor-pointer hover:underline">{book.author}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-500">Publisher :</span>
                                    <span className="font-medium text-gray-900 text-primary cursor-pointer hover:underline">{book.publisher}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-500">ISBN :</span>
                                    <span className="font-medium text-gray-900">{book.isbn}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-500">Page Count :</span>
                                    <span className="font-medium text-gray-900">{book.pageCount}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 text-gray-500">Availability :</span>
                                    <span className={`font-medium ${book.stockCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {book.stockCount > 0 ? `In Stock (${book.stockCount} copies)` : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>

                            <div className="py-2">
                                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                                    {book.description}
                                </p>
                            </div>

                            <div className="flex items-center space-x-6 pt-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => handleQuantityChange('dec')}
                                        className="p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-l-lg transition-colors"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-4 font-bold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange('inc')}
                                        className="p-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-r-lg transition-colors"
                                        disabled={quantity >= book.stockCount}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>

                                <span className="text-gray-500 font-medium text-sm">Quantity</span>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    <span>Add to Cart</span>
                                </button>
                                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-red-500 transition-colors">
                                    <Heart className="h-6 w-6" />
                                </button>
                                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-colors">
                                    <Share2 className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
