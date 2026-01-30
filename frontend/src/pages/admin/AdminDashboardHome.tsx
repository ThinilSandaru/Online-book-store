import React from 'react';

const AdminDashboardHome: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-600">
                    Welcome to the Admin Portal. This area is restricted to administrators.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                    Current functionality is limited to viewing this dashboard.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
