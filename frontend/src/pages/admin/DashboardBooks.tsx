import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import booksData from '../../data/books.json';
import type { Book } from '../../types';

const DashboardBooks: React.FC = () => {
    const [books] = useState<Book[]>(booksData as Book[]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
                    <p className="text-gray-500">View and manage your book inventory</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus size={20} />
                    <span>Add New Book</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Books Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Book Detail</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredBooks.map((book) => (
                            <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={book.imageUrl} alt="" className="w-12 h-16 object-cover rounded shadow-sm" />
                                        <div>
                                            <div className="font-bold text-gray-900">{book.title}</div>
                                            <div className="text-sm text-gray-500">{book.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                        {book.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    Rs. {book.price.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <span className={`w-2 h-2 rounded-full ${book.stockCount > 10 ? 'bg-green-500' : book.stockCount > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                        <span className="text-gray-700">{book.stockCount} copies</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Edit2 size={18} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardBooks;
