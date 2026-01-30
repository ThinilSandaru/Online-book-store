import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCount = 0; // TODO: Implement cart context

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-primary-dark hover:text-primary transition-colors">
                            <BookOpen className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl tracking-tight">BookStore</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">Home</Link>
                        <Link to="/browse" className="text-gray-700 hover:text-primary font-medium transition-colors">Browse Books</Link>

                        <div className="flex items-center space-x-4">
                            <Link to="/login" className="text-gray-700 hover:text-primary font-medium transition-colors">Login</Link>
                            <Link to="/signup" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm hover:shadow-md">
                                Sign Up
                            </Link>
                            <div className="relative cursor-pointer group">
                                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
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
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/browse"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Browse Books
                        </Link>
                        <Link
                            to="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="block px-3 py-2 rounded-md text-base font-medium text-primary font-bold hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
