import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginOwner, validateAdminToken } from '../../services/api';
import { UserCheck, Eye, EyeOff } from 'lucide-react';

const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // 1. Authenticate
            const token = await loginOwner(email, password);

            // 2. Check if this user is an Admin
            const isAdmin = await validateAdminToken(token);

            if (isAdmin) {
                login(token, 'admin');
                navigate('/admin/portal');
            } else {
                setError('Access denied: You do not have administrator privileges.');
            }
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-slate-800 p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                        <UserCheck className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
                    <p className="text-slate-300 mt-2">Manage store operations</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg flex items-center border border-red-100">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:border-transparent outline-none transition-all pr-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
