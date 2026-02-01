import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, ArrowLeft, BookOpen } from 'lucide-react';
import { addNewBook } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AddBook: React.FC = () => {
    const navigate = useNavigate();
    const { token, role } = useAuth();
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
            if (!image) {
                setSubmitMessage({
                    type: 'error',
                    text: 'Please select an image for the book cover.'
                });
                setIsSubmitting(false);
                return;
            }

            if (!token || !role) {
                setSubmitMessage({
                    type: 'error',
                    text: 'Authentication details are missing. Please log in again.'
                });
                setIsSubmitting(false);
                return;
            }

            await addNewBook({
                title,
                ssn,
                author,
                price,
                copies,
                image
            }, token, role);

            setSubmitMessage({ type: 'success', text: 'Book added successfully!' });
            setTimeout(() => {
                resetForm();
                // Optionally navigate back to books list
                // navigate('/admin/dashboard/books');
            }, 2000);
        } catch (error) {
            console.error('Error adding book:', error);
            setSubmitMessage({
                type: 'error',
                text: error instanceof Error ? error.message : 'An error occurred. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Go back"
                    >
                        <ArrowLeft size={24} className="text-gray-600" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                            <BookOpen className="text-primary" size={28} />
                            <span>Add New Book</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Fill in the book details to add to inventory</p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Success/Error Message */}
                    {submitMessage && (
                        <div className={`p-4 rounded-lg border ${submitMessage.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <div className="flex items-center">
                                <div className="flex-1">{submitMessage.text}</div>
                            </div>
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* SSN and Author Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                placeholder="e.g., 978-0-7432-7356-5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Price and Copies Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (Rs.) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                    Rs.
                                </span>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    min="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                />
                            </div>
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
                                placeholder="Enter quantity"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Book Cover Image <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors bg-gray-50">
                            {imagePreview ? (
                                <div className="space-y-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mx-auto max-h-64 rounded-lg shadow-md border-2 border-gray-200"
                                    />
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImage(null);
                                                setImagePreview(null);
                                            }}
                                            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            Remove Image
                                        </button>
                                        <label className="px-4 py-2 text-sm text-primary hover:text-primary-dark font-medium hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                                            Change Image
                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/jpg"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <label className="cursor-pointer block">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                                            <ImageIcon className="w-10 h-10 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-base font-medium text-gray-700">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
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
                        <p className="text-xs text-gray-500 mt-2">
                            Recommended size: 400x600px for best results
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Clear Form
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
                                    <span>Adding Book...</span>
                                </span>
                            ) : (
                                'Add Book to Inventory'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Helper Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">📝 Tips for Adding Books</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Ensure the SSN/ISBN is unique and correctly formatted</li>
                    <li>• Use high-quality images for better presentation to customers</li>
                    <li>• Double-check the price before submitting</li>
                    <li>• The book will be immediately available in the store once added</li>
                </ul>
            </div>
        </div>
    );
};

export default AddBook;
