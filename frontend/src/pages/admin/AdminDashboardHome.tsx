import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertCircle, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInventory, type InventoryBook } from '../../services/api';
import AdminBookCard from '../../components/admin/AdminBookCard';

const AdminDashboardHome: React.FC = () => {
    const { token, role } = useAuth();
    const [books, setBooks] = useState<InventoryBook[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            if (!token) return;
            try {
                setIsLoading(true);
                setError(null);
                const data = await getInventory(token, role as 'owner' | 'admin');
                setBooks(data);
            } catch (err) {
                console.error('Failed to fetch inventory:', err);
                setError(err instanceof Error ? err.message : 'Failed to load inventory');
            } finally {
                setIsLoading(false);
            }
        };

        fetchInventory();
    }, [token]);

    const totalCopies = books.reduce((acc, b) => acc + b.copyCount, 0);
    const lowStockCount = books.filter(b => b.copyCount < 5).length;
    const totalValue = books.reduce((acc, b) => acc + (b.price * b.copyCount), 0);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
                <AlertCircle className="mx-auto mb-3" size={32} />
                <p className="font-semibold">Failed to load inventory</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Inventory Value</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">Rs. {totalValue.toLocaleString()}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Inventory</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalCopies} Copies</h3>
                        <p className="text-sm text-gray-500 mt-1">{books.length} Unique Titles</p>
                    </div>
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Package size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Low Stock Alerts</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{lowStockCount} Products</h3>
                    </div>
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg">
                        <AlertCircle size={24} />
                    </div>
                </div>
            </div>

            {/* Books Grid */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Current Inventory</h2>
                    <Link to="/admin/portal/add-book" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
                        <Plus size={18} />
                        <span>Add New Book</span>
                    </Link>
                </div>

                {books.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
                        <Package className="mx-auto mb-3 text-gray-400" size={48} />
                        <p className="font-semibold text-lg">No books in inventory</p>
                        <p className="text-sm mt-1">Add your first book to get started.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <AdminBookCard
                                key={book.id}
                                book={book}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardHome;
