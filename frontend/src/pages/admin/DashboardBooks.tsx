import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, ImageIcon } from 'lucide-react';
import booksData from '../../data/books.json';
import type { Book } from '../../types';
import { API_URL } from '../../services/api';

const DashboardBooks: React.FC = () => {
    const [books] = useState<Book[]>(booksData as Book[]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form fields
    const [title, setTitle] = useState('');
    const [ssn, setSsn] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetForm = () => {
        setTitle('');
        setSsn('');
        setAuthor('');
        setPrice('');
        setCopies('');
        setImage(null);
        setImagePreview(null);
        setSubmitMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('ssn', ssn);
            formData.append('author', author);
            formData.append('price', price);
            formData.append('copies', copies);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch(`${API_URL}/owner/add/new/book`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                await response.json();
                setSubmitMessage({ type: 'success', text: 'Book added successfully!' });
                setTimeout(() => {
                    resetForm();
                    setShowAddModal(false);
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => null);
                setSubmitMessage({
                    type: 'error',
                    text: errorData?.message || 'Failed to add book. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error adding book:', error);
            setSubmitMessage({
                type: 'error',
                text: 'An error occurred. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Books</h2>
                    <p className="text-gray-500">View and manage your book inventory</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
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

            {/* Add Book Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="bg-primary p-6 flex justify-between items-center sticky top-0">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Add New Book</h3>
                                <p className="text-blue-100 text-sm mt-1">Fill in the book details</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Success/Error Message */}
                            {submitMessage && (
                                <div className={`p-4 rounded-lg border ${submitMessage.type === 'success'
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-red-50 border-red-200 text-red-800'
                                    }`}>
                                    {submitMessage.text}
                                </div>
                            )}

                            {/* Book Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Book Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter book title"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* SSN */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    SSN (Serial Number) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={ssn}
                                    onChange={(e) => setSsn(e.target.value)}
                                    placeholder="Enter SSN"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Author */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Author <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Enter author name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Price and Copies Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price (Rs.) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        min="0"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                {/* Copies */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Number of Copies <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={copies}
                                        onChange={(e) => setCopies(e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Book Cover Image <span className="text-red-500">*</span>
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                                    {imagePreview ? (
                                        <div className="space-y-4">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="mx-auto max-h-48 rounded-lg shadow-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImage(null);
                                                    setImagePreview(null);
                                                }}
                                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                                            >
                                                Remove Image
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer">
                                            <div className="flex flex-col items-center space-y-3">
                                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                                                    <ImageIcon className="w-8 h-8 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Click to upload or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PNG, JPG, JPEG (MAX. 5MB)
                                                    </p>
                                                </div>
                                            </div>
                                            <input
                                                type="file"
                                                required
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Adding...</span>
                                        </span>
                                    ) : (
                                        'Add Book'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardBooks;
