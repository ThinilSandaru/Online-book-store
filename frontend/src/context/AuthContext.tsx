import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    role: 'owner' | 'admin' | null;
    login: (token: string, role: 'owner' | 'admin') => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [role, setRole] = useState<'owner' | 'admin' | null>(
        localStorage.getItem('role') as 'owner' | 'admin' | null
    );

    const login = (newToken: string, newRole: 'owner' | 'admin') => {
        setToken(newToken);
        setRole(newRole);
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
