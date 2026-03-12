import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    BookOpen,
    Loader2,
    Package,
    CreditCard,
    Truck,
    CheckCircle2,
    ShieldCheck,
    Lock,
    AlertCircle,
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getCart, checkout, createPaymentIntent } from '../services/api';
import type { CartItem, CartResponse } from '../services/api';
import { useCustomerAuth } from '../context/CustomerAuthContext';

type PaymentMethod = 'cod' | 'card' | null;

const stripePromise = loadStripe('pk_test_51T9EeUAcwGOUxu55RSxGCra9rge0horW2l941YVnWjrqdTDlx4Mj3lqS24P7JKIjP4RcVWqozcDGWLGT6sTPbAch00HvZwsPW5');

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '16px',
            color: '#1f2937',
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            '::placeholder': {
                color: '#9ca3af',
            },
            iconColor: '#6b7280',
        },
        invalid: {
            color: '#ef4444',
            iconColor: '#ef4444',
        },
    },
    hidePostalCode: true,
};

// ==================== Inner form that uses Stripe hooks ====================
interface CheckoutFormProps {
    cart: CartResponse;
    customerToken: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cart, customerToken }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardComplete, setCardComplete] = useState(false);

    const handleConfirmOrder = async () => {
        if (!cart) return;
        setIsSubmitting(true);
        setError(null);

        try {
            if (paymentMethod === 'cod') {
                await checkout('COD', cart.cartId, customerToken);
                setOrderPlaced(true);
            } else if (paymentMethod === 'card') {
                if (!stripe || !elements) {
                    setError('Stripe has not loaded yet. Please try again.');
                    setIsSubmitting(false);
                    return;
                }

                const cardElement = elements.getElement(CardElement);
                if (!cardElement) {
                    setError('Card element not found. Please refresh and try again.');
                    setIsSubmitting(false);
                    return;
                }

                // Step 1: Create payment intent on backend
                const clientSecret = await createPaymentIntent(cart.totalPrice, cart.cartId, customerToken);

                // Step 2: Confirm payment with Stripe
                const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: cardElement,
                    },
                });

                if (stripeError) {
                    setError(stripeError.message || 'Payment failed. Please try again.');
                    setIsSubmitting(false);
                    return;
                }

                if (paymentIntent?.status === 'succeeded') {
                    // Step 3: Notify backend of successful payment
                    await checkout('PAID', cart.cartId, customerToken);
                    setOrderPlaced(true);
                } else {
                    setError('Payment was not completed. Please try again.');
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ========== Order placed success ==========
    if (orderPlaced) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 className="w-14 h-14 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-2">
                        Your order has been placed successfully.
                    </p>
                    <p className="text-sm text-gray-400 mb-8">
                        {paymentMethod === 'cod'
                            ? 'You will pay when your order is delivered.'
                            : 'Your card has been charged.'}
                    </p>
                    <button
                        onClick={() => navigate('/user')}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // ========== Main checkout UI ==========
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Link
                    to="/user/cart"
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Back to cart"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Review your order and choose a payment method</p>
                </div>
            </div>

            {/* Error banner */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-800">Payment Error</p>
                        <p className="text-sm text-red-600 mt-0.5">{error}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column — Items + Payment */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Items */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Package size={18} className="text-primary" />
                                Order Items
                                <span className="ml-auto text-sm font-normal text-gray-500">
                                    {cart.totalCount} {cart.totalCount === 1 ? 'item' : 'items'}
                                </span>
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {cart.cartList.map((item: CartItem, index: number) => (
                                <div
                                    key={`${item.bookId}-${index}`}
                                    className="px-6 py-4 flex items-center gap-4"
                                >
                                    <div className="w-12 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BookOpen className="w-5 h-5 text-primary/60" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">{item.bookTitle}</h3>
                                        <p className="text-xs text-gray-500">{item.author}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="text-xs text-gray-400">
                                            {item.quantity} × Rs. {item.price.toLocaleString()}
                                        </span>
                                        <p className="text-sm font-bold text-gray-900">
                                            Rs. {item.totalBookPrice.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Payment Method Selection */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <CreditCard size={18} className="text-primary" />
                                Payment Method
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* COD Option */}
                            <button
                                onClick={() => setPaymentMethod('cod')}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'cod'
                                    ? 'border-primary bg-primary/5 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cod' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                                        }`}
                                >
                                    <Truck size={22} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                                </div>
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'cod' ? 'border-primary' : 'border-gray-300'
                                        }`}
                                >
                                    {paymentMethod === 'cod' && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    )}
                                </div>
                            </button>

                            {/* Card Option */}
                            <button
                                onClick={() => setPaymentMethod('card')}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'card'
                                    ? 'border-primary bg-primary/5 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                                        }`}
                                >
                                    <CreditCard size={22} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-900">Card Payment</p>
                                    <p className="text-sm text-gray-500">Pay with your credit or debit card</p>
                                </div>
                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'
                                        }`}
                                >
                                    {paymentMethod === 'card' && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                                    )}
                                </div>
                            </button>

                            {/* Stripe Card Element */}
                            {paymentMethod === 'card' && (
                                <div className="mt-4 p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4 animate-fade-in">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ShieldCheck size={16} className="text-green-500" />
                                        <span className="text-xs text-gray-500 font-medium">
                                            Secured by Stripe — your card details are never stored on our servers
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Card Details
                                        </label>
                                        <div className="bg-white px-4 py-3 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
                                            <CardElement
                                                options={CARD_ELEMENT_OPTIONS}
                                                onChange={(e) => {
                                                    setCardComplete(e.complete);
                                                    if (e.error) {
                                                        setError(e.error.message);
                                                    } else {
                                                        setError(null);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-1">
                                        <Lock size={12} className="text-gray-400" />
                                        <span className="text-xs text-gray-400">
                                            For testing, use card number 4242 4242 4242 4242
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right column — Summary + Confirm */}
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
                                <span className="font-semibold text-gray-700">
                                    Rs. {cart.totalPrice.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-semibold text-green-600">Free</span>
                            </div>
                            {paymentMethod && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Payment</span>
                                    <span className="font-semibold text-gray-700">
                                        {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-base font-bold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-primary">
                                    Rs. {cart.totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmOrder}
                            disabled={!paymentMethod || isSubmitting || (paymentMethod === 'card' && (!stripe || !cardComplete))}
                            className={`w-full font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${!paymentMethod || (paymentMethod === 'card' && (!stripe || !cardComplete))
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                : 'bg-primary hover:bg-primary-dark text-white'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Processing…
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={18} />
                                    {!paymentMethod
                                        ? 'Select a Payment Method'
                                        : paymentMethod === 'card' && !cardComplete
                                            ? 'Enter Card Details'
                                            : 'Confirm Order'}
                                </>
                            )}
                        </button>

                        <Link
                            to="/user/cart"
                            className="block text-center mt-3 text-sm text-gray-500 hover:text-primary font-medium transition-colors"
                        >
                            Back to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==================== Outer wrapper component ====================
const Checkout: React.FC = () => {
    const { isAuthenticated, customerToken, openAuthModal } = useCustomerAuth();

    const [cart, setCart] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        if (!customerToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await getCart(customerToken);
            setCart(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load order details');
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

    // Not logged in
    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                    <p className="text-gray-500 mb-6">Please log in to proceed with your checkout.</p>
                    <button
                        onClick={openAuthModal}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    // Loading
    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading your order…</p>
            </div>
        );
    }

    // Error
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
                        onClick={fetchCart}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty cart
    if (!cart || cart.cartList.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Nothing to Checkout</h2>
                    <p className="text-gray-500 mb-6">Your cart is empty. Add some books first!</p>
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

    // Main checkout — wrapped with Stripe Elements provider
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm cart={cart} customerToken={customerToken!} />
        </Elements>
    );
};

export default Checkout;
