import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import type { Book } from '../types';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const discountPercentage = book.originalPrice
        ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        {discountPercentage}% OFF
                    </span>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Quick view or wishlist button could go here */}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">
                    {book.category}
                </div>
                <Link to={`/book/${book.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 hover:text-primary transition-colors">
                        {book.title}
                    </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-3 line-clamp-1">{book.author}</p>

                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-1">(4.8)</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <span className="text-lg font-bold text-gray-900">Rs. {book.price.toLocaleString()}</span>
                        {book.originalPrice && (
                            <span className="text-xs text-gray-400 line-through ml-2">
                                Rs. {book.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <button
                        className={`p-2 rounded-full transition-colors ${book.stockCount > 0
                            ? 'bg-blue-50 text-primary hover:bg-primary hover:text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        disabled={book.stockCount === 0}
                        title={book.stockCount > 0 ? "Add to Cart" : "Out of Stock"}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
                {book.stockCount < 5 && book.stockCount > 0 && (
                    <p className="text-xs text-red-500 mt-2 font-medium">Only {book.stockCount} left in stock!</p>
                )}
            </div>
        </div>
    );
};

export default BookCard;
