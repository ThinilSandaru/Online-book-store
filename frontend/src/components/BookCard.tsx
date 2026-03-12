import React, { useState } from 'react';
import { ShoppingCart, BookOpen, Plus, Minus, Loader2, Check } from 'lucide-react';
import type { InventoryBook } from '../services/api';
import { addToCart } from '../services/api';
import { useCustomerAuth } from '../context/CustomerAuthContext';

interface BookCardProps {
    book: InventoryBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const { isAuthenticated, customerToken, openAuthModal } = useCustomerAuth();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);
    const [cartError, setCartError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const inStock = book.copyCount > 0;

    const handleIncrement = () => {
        if (quantity < book.copyCount) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated || !customerToken) {
            openAuthModal();
            return;
        }

        setIsAdding(true);
        setCartError(null);
        setSuccessMessage(null);

        try {
            const message = await addToCart(book.id, quantity, customerToken);
            setAddedSuccess(true);
            setSuccessMessage(message || 'Successfully added');
            setTimeout(() => {
                setAddedSuccess(false);
                setSuccessMessage(null);
                setQuantity(1);
            }, 2500);
        } catch (err) {
            setCartError(err instanceof Error ? err.message : 'Failed to add');
            setTimeout(() => setCartError(null), 3000);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                {book.imageUrl ? (
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <BookOpen size={48} />
                        <span className="text-sm mt-2">No Image</span>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={book.title}>
                    {book.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-1">{book.author}</p>

                <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">Rs. {book.price.toLocaleString()}</span>
                    </div>

                    {inStock ? (
                        <>
                            {/* Quantity selector */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 font-bold text-gray-900 text-sm min-w-[2rem] text-center select-none">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={handleIncrement}
                                        disabled={quantity >= book.copyCount}
                                        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAdding || addedSuccess}
                                    className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md disabled:cursor-not-allowed ${addedSuccess
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary hover:bg-primary-dark text-white'
                                        }`}
                                    title="Add to Cart"
                                >
                                    {isAdding ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : addedSuccess ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <ShoppingCart className="w-4 h-4" />
                                    )}
                                    <span>{addedSuccess ? 'Added!' : 'Add'}</span>
                                </button>
                            </div>

                            {successMessage && (
                                <p className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg text-center">{successMessage}</p>
                            )}

                            {cartError && (
                                <p className="text-xs text-red-500 font-medium">{cartError}</p>
                            )}

                            {book.copyCount < 5 && (
                                <p className="text-xs text-red-500 font-medium">Only {book.copyCount} left in stock!</p>
                            )}
                        </>
                    ) : (
                        <div className="bg-red-50 text-red-600 text-xs font-semibold text-center py-2 rounded-lg">
                            Out of Stock
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
