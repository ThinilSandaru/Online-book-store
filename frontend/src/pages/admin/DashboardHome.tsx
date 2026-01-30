import React, { useState } from 'react';
import { Package, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import booksData from '../../data/books.json';
import type { Book } from '../../types';
import AdminBookCard from '../../components/admin/AdminBookCard';

const DashboardHome: React.FC = () => {
    const [books] = useState<Book[]>(booksData as Book[]);

    const totalSales = 125000; // Mock data
    const lowStockCount = books.filter(b => b.stockCount < 5).length;

    const handleEdit = (id: string) => {
        console.log('Edit book', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete book', id);
    };

    const handleAddStock = (id: string) => {
        console.log('Add stock', id);
    };

    return (
        <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Sales</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">Rs. {totalSales.toLocaleString()}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Inventory</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">{books.reduce((acc, b) => acc + b.stockCount, 0)} Items</h3>
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
                    <Link to="/admin/dashboard/add-book" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
                        <Plus size={18} />
                        <span>Add New Book</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {books.map(book => (
                        <AdminBookCard
                            key={book.id}
                            book={book}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onAddStock={handleAddStock}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
