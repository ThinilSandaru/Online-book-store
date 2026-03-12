import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Loader2, BookOpen, ArrowLeft, Package, Trash2 } from 'lucide-react';
import { getCart, deleteCartItem } from '../services/api';
import type { CartItem, CartResponse } from '../services/api';
import { useCustomerAuth } from '../context/CustomerAuthContext';

const Cart: React.FC = () => {
    const { isAuthenticated, customerToken, openAuthModal } = useCustomerAuth();
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        if (!customerToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await getCart(customerToken);
            setCart(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load cart');
        } finally {
            setIsLoading(false);
        }
    }, [customerToken]);

    useEffect(() => {
        if (!isAuthenticated || !customerToken) {
            setIsLoading(false);
            return;
        }
        fetchCart();
    }, [isAuthenticated, customerToken, fetchCart]);

    const handleDeleteItem = async (bookId: number) => {
        if (!customerToken) return;
        setDeletingId(bookId);
        setDeleteMessage(null);
        try {
            const message = await deleteCartItem(bookId, customerToken);
            setDeleteMessage(message || 'Successfully deleted.');
            setTimeout(() => setDeleteMessage(null), 2500);
            // Re-fetch cart to update totals and list
            await fetchCart();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove item');
            setTimeout(() => setError(null), 3000);
        } finally {
            setDeletingId(null);
        }
    };

    // Not logged in state
    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart Awaits</h2>
                    <p className="text-gray-500 mb-6">Please log in to view your shopping cart and continue shopping.</p>
                    <button
                        onClick={openAuthModal}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Login to View Cart
                    </button>
                </div>
            </div>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading your cart...</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
                    <p className="text-gray-500 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty cart state
    if (!cart || cart.cartList.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any books yet. Start exploring our collection!</p>
                    <Link
                        to="/user/browse"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        <BookOpen size={18} />
                        Browse Books
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Success message toast */}
            {deleteMessage && (
                <div className="fixed top-20 right-6 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2 animate-fade-in">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {deleteMessage}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <Link
                        to="/user/browse"
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                        title="Back to browsing"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
                        <p className="text-gray-500 text-sm mt-0.5">
                            {cart.totalCount} {cart.totalCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.cartList.map((item: CartItem, index: number) => (
                        <div
                            key={`${item.bookId}-${index}`}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-start gap-4">
                                {/* Book icon placeholder */}
                                <div className="w-16 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-7 h-7 text-primary/60" />
                                </div>

                                {/* Book details */}
                                <div className="flex-grow min-w-0">
                                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">{item.bookTitle}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5">{item.author}</p>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Price</span>
                                            <span className="text-sm font-semibold text-gray-700">Rs. {item.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Qty</span>
                                            <span className="inline-flex items-center justify-center bg-primary/10 text-primary font-bold text-sm px-2.5 py-0.5 rounded-full">
                                                {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Item total + delete */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <span className="text-lg font-bold text-gray-900">
                                        Rs. {item.totalBookPrice.toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteItem(item.bookId)}
                                        disabled={deletingId === item.bookId}
                                        className="flex items-center gap-1 text-xs font-medium text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Remove from cart"
                                    >
                                        {deletingId === item.bookId ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-3.5 h-3.5" />
                                        )}
                                        {deletingId === item.bookId ? 'Removing...' : 'Remove'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Total Items</span>
                                <span className="font-semibold text-gray-700">{cart.totalCount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-semibold text-gray-700">Rs. {cart.totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-semibold text-green-600">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-primary">Rs. {cart.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link
                            to="/user/checkout"
                            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={18} />
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/user/browse"
                            className="block text-center mt-3 text-sm text-gray-500 hover:text-primary font-medium transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
