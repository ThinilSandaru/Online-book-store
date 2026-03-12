import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Loader2,
    Package,
    BookOpen,
    Lock,
    ChevronDown,
    ChevronUp,
    CreditCard,
    Truck,
    Clock,
    CheckCircle2,
    XCircle,
    ShoppingBag,
    ArrowLeft,
} from 'lucide-react';
import { getMyOrders } from '../services/api';
import type { OrderSummary } from '../services/api';
import { useCustomerAuth } from '../context/CustomerAuthContext';

// ---------- Status badge helpers ----------

const paymentBadge = (status: string) => {
    switch (status.toUpperCase()) {
        case 'PAID':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    <CreditCard size={12} />
                    Paid
                </span>
            );
        case 'COD':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Truck size={12} />
                    COD
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                    {status}
                </span>
            );
    }
};

const orderStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
        case 'PENDING':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <Clock size={12} />
                    Pending
                </span>
            );
        case 'COMPLETED':
        case 'DELIVERED':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 size={12} />
                    {status.charAt(0) + status.slice(1).toLowerCase()}
                </span>
            );
        case 'OUT_FOR_DELIVERY':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    <Truck size={12} />
                    Out for Delivery
                </span>
            );
        case 'CANCELLED':
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                    <XCircle size={12} />
                    Cancelled
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                    {status}
                </span>
            );
    }
};

// ---------- Order Card Component ----------

const OrderCard: React.FC<{ order: OrderSummary }> = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-5 sm:p-6"
            >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Order #{order.orderId}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            {paymentBadge(order.paymentStatus)}
                            {orderStatusBadge(order.orderStatus)}
                        </div>
                        <div className="text-right ml-auto sm:ml-4">
                            <p className="text-lg font-bold text-primary">
                                Rs. {order.totalAmount.toLocaleString()}
                            </p>
                        </div>
                        <div className="text-gray-400 flex-shrink-0">
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                    </div>
                </div>
            </button>

            {/* Expanded Items List */}
            {isExpanded && (
                <div className="border-t border-gray-100 animate-fade-in">
                    <div className="px-5 sm:px-6 py-3 bg-gray-50/60">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Order Items
                        </h4>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {order.items.map((item, index) => (
                            <div
                                key={`${item.bookId}-${index}`}
                                className="px-5 sm:px-6 py-3.5 flex items-center gap-3"
                            >
                                <div className="w-9 h-11 bg-gradient-to-br from-primary/10 to-primary/5 rounded-md flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-4 h-4 text-primary/60" />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                                        {item.bookTitle}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Rs. {item.bookPrice.toLocaleString()} × {item.quantity}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-bold text-gray-900">
                                        Rs. {(item.bookPrice * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="px-5 sm:px-6 py-3 bg-gray-50/60 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">Total</span>
                        <span className="text-sm font-bold text-primary">
                            Rs. {order.totalAmount.toLocaleString()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

// ---------- Main Page Component ----------

const MyOrders: React.FC = () => {
    const { isAuthenticated, customerToken, openAuthModal } = useCustomerAuth();

    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        if (!customerToken) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await getMyOrders(customerToken);
            setOrders(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    }, [customerToken]);

    useEffect(() => {
        if (!isAuthenticated || !customerToken) {
            setIsLoading(false);
            return;
        }
        fetchOrders();
    }, [isAuthenticated, customerToken, fetchOrders]);

    // Not logged in
    if (!isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
                    <p className="text-gray-500 mb-6">Please log in to view your orders.</p>
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
                <p className="text-gray-500 font-medium">Loading your orders…</p>
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
                        onClick={fetchOrders}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty state
    if (orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 mb-6">
                        You haven't placed any orders yet. Start browsing books!
                    </p>
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

    // Main orders view
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <Link
                    to="/user"
                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                    title="Back to home"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-500 text-sm mt-0.5">
                        {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
                    </p>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
