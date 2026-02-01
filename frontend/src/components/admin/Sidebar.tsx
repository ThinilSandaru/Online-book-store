import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, UserCog, PlusCircle, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
    const { logout, role } = useAuth();
    const basePath = role === 'admin' ? '/admin/portal' : '/admin/dashboard';

    const navItems = [
        { to: basePath, icon: <LayoutDashboard size={20} />, label: 'Dashboard', end: true },
        { to: `${basePath}/books`, icon: <BookOpen size={20} />, label: 'Manage Books' },
        { to: `${basePath}/add-book`, icon: <PlusCircle size={20} />, label: 'Add New Book' },
        { to: `${basePath}/create-admin`, icon: <UserPlus size={20} />, label: 'Create Admin' },
        { to: `${basePath}/admins`, icon: <UserCog size={20} />, label: 'Manage Admins' },
    ].filter(item => {
        if (role === 'admin' && (item.label === 'Create Admin' || item.label === 'Manage Admins')) {
            return false;
        }
        return true;
    });

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl">
            <div className="p-6 border-b border-slate-800">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                    Admin Portal
                </h2>
            </div>

            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-blue-500/20'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 w-full px-4 py-3 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
