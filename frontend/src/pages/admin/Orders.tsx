import React, { useEffect, useState, useCallback } from 'react';
import {
    ShoppingBag,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Search,
    RefreshCw,
    User as UserIcon,
    Package,
    CreditCard
} from 'lucide-react';
import { getDashboardOrders, updateOrderStatus } from '../../services/api';
import type { DashboardOrder } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Orders: React.FC = () => {
    const { token, role } = useAuth();
    const [orders, setOrders] = useState<DashboardOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [expandedOrders, setExpandedOrders] = useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');

    const fetchOrders = useCallback(async () => {
        if (!token || !role) return;
        setIsLoading(true);
        setError(null);
        try {
            const data = await getDashboardOrders(token, role);
            setOrders(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    }, [token, role]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        if (!token || !role) return;
        setUpdatingId(orderId);
        try {
            await updateOrderStatus(token, role, orderId, newStatus);
            // Optimistically update the UI or refetch
            setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to update status');
        } finally {
            setUpdatingId(null);
        }
    };

    const toggleExpand = (orderId: number) => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
        }
        setExpandedOrders(newExpanded);
    };

    const filteredOrders = orders.filter(order =>
        order.orderId.toString().includes(searchTerm) ||
        order.userId.toString().includes(searchTerm)
    );

    const getStatusStyles = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PENDING':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'OUT_FOR_DELIVERY':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'DELIVERED':
                return 'bg-green-100 text-green-700 border-green-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (isLoading && orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading orders details...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Orders</h2>
                    <p className="text-gray-500">View and track customer orders for the bookstore</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or User ID..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[280px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={fetchOrders}
                        className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
                        title="Refresh Orders"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
                    <AlertCircle size={20} />
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {filteredOrders.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center text-gray-400">
                    <ShoppingBag className="mx-auto mb-4 opacity-20" size={64} />
                    <h3 className="text-xl font-semibold text-gray-600">
                        {searchTerm ? "No matching orders found" : "No Orders Yet"}
                    </h3>
                    <p className="mt-2 max-w-sm mx-auto">
                        {searchTerm ? "Try a different search term or clear the search." : "When customers place orders, they will appear here for you to manage."}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div key={order.orderId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg">Order #{order.orderId}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(order.orderStatus)}`}>
                                                {order.orderStatus.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <UserIcon size={14} />
                                                User ID: {order.userId}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <CreditCard size={14} />
                                                {order.paymentStatus}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 justify-between sm:justify-end">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Total Amount</p>
                                        <p className="text-xl font-black text-gray-900">Rs. {order.totalAmount.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <select
                                            className="bg-gray-50 border border-gray-200 text-sm rounded-lg focus:ring-primary focus:border-primary block p-2 outline-none font-semibold text-gray-700"
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                            disabled={updatingId === order.orderId}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                                            <option value="DELIVERED">Delivered</option>
                                        </select>

                                        <button
                                            onClick={() => toggleExpand(order.orderId)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                                        >
                                            {expandedOrders.has(order.orderId) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {expandedOrders.has(order.orderId) && (
                                <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-6 animate-fade-in">
                                    <h4 className="text-sm font-bold text-gray-700 mb-4 px-2 uppercase tracking-wide">Order Items</h4>
                                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                                                <tr>
                                                    <th className="px-4 py-3">Book Details</th>
                                                    <th className="px-4 py-3 text-center">Quantity</th>
                                                    <th className="px-4 py-3 text-right">Unit Price</th>
                                                    <th className="px-4 py-3 text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {order.items.map((item, idx) => (
                                                    <tr key={`${order.orderId}-${idx}`} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3">
                                                            <div>
                                                                <p className="font-bold text-gray-900">{item.bookTitle}</p>
                                                                <p className="text-xs text-gray-400">ID: {item.bookId}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-center font-bold text-gray-700">
                                                            {item.quantity}
                                                        </td>
                                                        <td className="px-4 py-3 text-right text-gray-600">
                                                            Rs. {item.price.toLocaleString()}
                                                        </td>
                                                        <td className="px-4 py-3 text-right font-black text-gray-900">
                                                            Rs. {(item.price * item.quantity).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="bg-gray-50/80">
                                                <tr>
                                                    <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-600">Subtotal</td>
                                                    <td className="px-4 py-3 text-right font-black text-primary text-base">
                                                        Rs. {order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
