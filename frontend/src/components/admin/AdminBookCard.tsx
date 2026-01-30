import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { Book } from '../../types';

interface AdminBookCardProps {
    book: Book;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onAddStock?: (id: string) => void;
}

const AdminBookCard: React.FC<AdminBookCardProps> = ({ book, onEdit, onDelete, onAddStock }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full group relative">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                    Stock: {book.stockCount}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">
                    {book.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={book.title}>
                    {book.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-1">{book.author}</p>

                <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-gray-900">Rs. {book.price.toLocaleString()}</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${book.stockCount > 10 ? 'bg-green-100 text-green-700' :
                            book.stockCount > 0 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                            {book.stockCount > 0 ? 'Active' : 'Out of Stock'}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => onEdit?.(book.id)}
                            className="flex items-center justify-center p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Edit Book"
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => onAddStock?.(book.id)}
                            className="flex items-center justify-center p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors"
                            title="Add Stock"
                        >
                            <Plus size={16} />
                        </button>
                        <button
                            onClick={() => onDelete?.(book.id)}
                            className="flex items-center justify-center p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete Book"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookCard;
