import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import { useAuth } from '../context/AuthContext';
import { validateOwnerToken } from '../services/api';

const OwnerDashboardLayout: React.FC = () => {
    const { token, logout } = useAuth();
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setIsValid(false);
                setIsChecking(false);
                return;
            }

            const valid = await validateOwnerToken(token);
            if (!valid) {
                logout();
                setIsValid(false);
            } else {
                setIsValid(true);
            }
            setIsChecking(false);
        };

        checkAuth();
    }, [token, logout]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isValid) {
        return <Navigate to="/admin/login/owner" replace />;
    }

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center px-8 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default OwnerDashboardLayout;
