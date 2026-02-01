import React, { useState, useEffect } from 'react';
import { UserCog, Trash2, Mail, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { getAllEmployees, type Employee } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ManageAdmins: React.FC = () => {
    const { token } = useAuth();
    const [admins, setAdmins] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!token) {
                setError('Authentication token is missing. Please log in again.');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const employees = await getAllEmployees(token);
                setAdmins(employees);
            } catch (err) {
                console.error('Error fetching employees:', err);
                setError(err instanceof Error ? err.message : 'Failed to load employees. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, [token]);

    const handleDelete = (adminId: number, adminName: string) => {
        if (window.confirm(`Are you sure you want to delete admin "${adminName}"?`)) {
            setAdmins(admins.filter(admin => admin.id !== adminId));
            // TODO: Connect to backend API for actual deletion
            alert(`Admin "${adminName}" has been removed (Note: Backend deletion API integration pending)`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                        <UserCog className="text-primary" size={28} />
                        <span>Manage Admins</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">View and manage admin employees</p>
                </div>
                {!isLoading && !error && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                        <p className="text-sm font-semibold text-blue-800">
                            Total Admins: <span className="text-primary text-lg">{admins.length}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                    <Loader2 className="mx-auto text-primary mb-4 animate-spin" size={48} />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Admins...</h3>
                    <p className="text-gray-500">Fetching employee data from the server.</p>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                        <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800 mb-1">Error Loading Admins</h3>
                            <p className="text-red-700">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Admins List */}
            {!isLoading && !error && (
                <>
                    {admins.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
                            <UserCog className="mx-auto text-gray-300 mb-4" size={64} />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Admins Found</h3>
                            <p className="text-gray-500">There are currently no admin employees in the system.</p>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Table Header */}
                                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                                    <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-gray-700">
                                        <div className="col-span-1">ID</div>
                                        <div className="col-span-3">Name</div>
                                        <div className="col-span-4">Email</div>
                                        <div className="col-span-2">Phone</div>
                                        <div className="col-span-2 text-center">Actions</div>
                                    </div>
                                </div>

                                {/* Table Body */}
                                <div className="divide-y divide-gray-200">
                                    {admins.map((admin) => (
                                        <div
                                            key={admin.id}
                                            className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="grid grid-cols-12 gap-4 items-center">
                                                {/* ID */}
                                                <div className="col-span-1">
                                                    <span className="text-sm font-medium text-gray-600">#{admin.id}</span>
                                                </div>

                                                {/* Name */}
                                                <div className="col-span-3">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                                                            {admin.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{admin.name}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="col-span-4">
                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                        <Mail size={16} className="text-gray-400 flex-shrink-0" />
                                                        <span className="text-sm truncate">{admin.email}</span>
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="col-span-2">
                                                    <div className="flex items-center space-x-2 text-gray-600">
                                                        <Phone size={16} className="text-gray-400 flex-shrink-0" />
                                                        <span className="text-sm">{admin.phoneNumber}</span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="col-span-2 flex justify-center">
                                                    <button
                                                        onClick={() => handleDelete(admin.id, admin.name)}
                                                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                                                        title="Delete admin"
                                                    >
                                                        <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                                        <span className="text-sm font-medium">Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* JSON Data Display */}
                            <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-gray-300">Employee Data (JSON Format)</h3>
                                    <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                                        {admins.length} record{admins.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <pre className="text-xs text-green-400 overflow-x-auto">
                                    {JSON.stringify(admins, null, 2)}
                                </pre>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ManageAdmins;
