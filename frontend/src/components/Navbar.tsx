import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, BookOpen, Menu, X, User, LogOut, LogIn, Package } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, customerName, openAuthModal, logout } = useCustomerAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/user" className="flex items-center text-primary-dark hover:text-primary transition-colors">
                            <BookOpen className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl tracking-tight">BookStore</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/user" className="text-gray-700 hover:text-primary font-medium transition-colors">Home</Link>
                        <Link to="/user/browse" className="text-gray-700 hover:text-primary font-medium transition-colors">Browse Books</Link>

                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <User size={18} className="text-primary" />
                                        <span className="font-medium text-sm">{customerName}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-gray-500 hover:text-red-500 font-medium transition-colors flex items-center gap-1 text-sm"
                                        title="Logout"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                    <Link
                                        to="/user/orders"
                                        className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1"
                                    >
                                        <Package size={18} />
                                        My Orders
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={openAuthModal}
                                        className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center gap-1"
                                    >
                                        <LogIn size={18} />
                                        Login
                                    </button>
                                    <button
                                        onClick={openAuthModal}
                                        className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm hover:shadow-md"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => isAuthenticated ? navigate('/user/cart') : openAuthModal()}
                                className="relative cursor-pointer group p-1"
                                title="View Cart"
                            >
                                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors" />
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-primary focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-2">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/user"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/user/browse"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Browse Books
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <div className="px-3 py-2 text-sm text-gray-500 flex items-center gap-2">
                                    <User size={16} className="text-primary" />
                                    <span className="font-medium">{customerName}</span>
                                </div>
                                <Link
                                    to="/user/orders"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => { openAuthModal(); setIsMenuOpen(false); }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => { openAuthModal(); setIsMenuOpen(false); }}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary font-bold hover:bg-gray-50"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
