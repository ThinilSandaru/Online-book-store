import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <div className="relative bg-gradient-to-br from-primary-dark to-primary overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white opacity-5"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-white opacity-10"></div>
                <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full bg-white opacity-5"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-1/2 text-white space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Discover Your Next <br />
                            <span className="text-secondary-light text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Great Adventure</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-lg leading-relaxed">
                            Explore our vast collection of books across all genres. From timeless classics to modern bestsellers, we have stories that inspire.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link to="/browse" className="bg-white text-primary-dark font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 flex items-center group">
                                Browse Books
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/about" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition duration-300">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center perspective-1000">
                        <div className="relative w-72 h-96 md:w-80 md:h-[450px] bg-white rounded-lg shadow-2xl rotate-y-minus-12 transform hover:rotate-y-0 transition-transform duration-500 ease-out p-2 glass-effect">
                            {/* Abstract book representation or placeholder image */}
                            <div className="w-full h-full rounded bg-gradient-to-br from-blue-900 to-slate-800 flex flex-col items-center justify-center text-white border border-white/20">
                                <Book className="w-24 h-24 text-white/20 mb-4" />
                                <span className="text-2xl font-serif italic font-bold">Best Sellers</span>
                                <span className="text-sm mt-2 text-white/60">Winter Collection</span>
                            </div>

                            {/* Floating cards effect */}
                            <div className="absolute -bottom-6 -right-6 w-48 p-4 bg-white rounded-lg shadow-xl text-gray-800">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-xs font-bold uppercase text-gray-400">New Arrival</span>
                                </div>
                                <p className="font-bold text-sm">The Midnight Library</p>
                                <p className="text-xs text-primary">$14.99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
