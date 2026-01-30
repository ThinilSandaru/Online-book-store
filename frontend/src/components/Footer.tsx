import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-6 w-6 text-primary-light" />
                            <span className="text-xl font-bold">BookStore</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your one-stop destination for all your reading needs. Discover knowledge, adventure, and inspiration.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-light">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/browse" className="hover:text-white transition-colors">Browse Books</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-light">Categories</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/browse?category=fiction" className="hover:text-white transition-colors">Fiction</Link></li>
                            <li><Link to="/browse?category=non-fiction" className="hover:text-white transition-colors">Non-Fiction</Link></li>
                            <li><Link to="/browse?category=science" className="hover:text-white transition-colors">Science & Tech</Link></li>
                            <li><Link to="/browse?category=history" className="hover:text-white transition-colors">History</Link></li>
                            <li><Link to="/browse?category=biography" className="hover:text-white transition-colors">Biography</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-light">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 mt-0.5 text-primary-light shrink-0" />
                                <span>123 Book St, Library City,<br />Knowledge State, 10101</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-primary-light shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-primary-light shrink-0" />
                                <span>support@bookstore.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} BookStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
