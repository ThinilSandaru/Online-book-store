import React from 'react';
import { BookOpen } from 'lucide-react';
import type { InventoryBook } from '../../services/api';
import AuthenticatedImage from './AuthenticatedImage';

interface AdminBookCardProps {
    book: InventoryBook;
}

const AdminBookCard: React.FC<AdminBookCardProps> = ({ book }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group relative">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                {book.imageUrl ? (
                    <AuthenticatedImage
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <BookOpen size={48} />
                        <span className="text-sm mt-2">No Image</span>
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                    Stock: {book.copyCount}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={book.title}>
                    {book.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-1">{book.author}</p>

                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">Rs. {book.price.toLocaleString()}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${book.copyCount > 10 ? 'bg-green-100 text-green-700' :
                            book.copyCount > 0 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {book.copyCount > 0 ? 'Active' : 'Out of Stock'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookCard;
