import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import { registerEmployee } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const CreateAdmin: React.FC = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Form fields
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setSubmitMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            if (!token) {
                setSubmitMessage({
                    type: 'error',
                    text: 'Authentication token is missing. Please log in again.'
                });
                setIsSubmitting(false);
                return;
            }

            await registerEmployee({
                fullName,
                phoneNumber,
                email,
                password
            }, token);

            setSubmitMessage({ type: 'success', text: 'Admin registered successfully!' });
            setTimeout(() => {
                resetForm();
                // Optionally navigate to manage admins page
                // navigate('/admin/dashboard/admins');
            }, 2000);
        } catch (error) {
            console.error('Error registering admin:', error);
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
                            <UserPlus className="text-primary" size={28} />
                            <span>Create New Admin</span>
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Register a new admin employee for the system</p>
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

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter full name"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="tel"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter phone number"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter secure password"
                                minLength={6}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Password must be at least 6 characters long
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
                                    <span>Creating Admin...</span>
                                </span>
                            ) : (
                                'Create Admin Account'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Helper Info Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">📝 Admin Account Guidelines</h3>
                <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Ensure the email address is unique and valid</li>
                    <li>• Choose a strong password for security</li>
                    <li>• The admin will receive access to the admin portal upon creation</li>
                    <li>• Admin credentials should be shared securely with the employee</li>
                </ul>
            </div>
        </div>
    );
};

export default CreateAdmin;
