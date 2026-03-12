import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface CustomerAuthContextType {
    customerToken: string | null;
    customerName: string | null;
    login: (token: string, name: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    showAuthModal: boolean;
    openAuthModal: () => void;
    closeAuthModal: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [customerToken, setCustomerToken] = useState<string | null>(
        localStorage.getItem('customerToken')
    );
    const [customerName, setCustomerName] = useState<string | null>(
        localStorage.getItem('customerName')
    );
    const [showAuthModal, setShowAuthModal] = useState(false);

    const login = (token: string, name: string) => {
        setCustomerToken(token);
        setCustomerName(name);
        localStorage.setItem('customerToken', token);
        localStorage.setItem('customerName', name);
        setShowAuthModal(false);
    };

    const logout = () => {
        setCustomerToken(null);
        setCustomerName(null);
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerName');
    };

    const openAuthModal = () => setShowAuthModal(true);
    const closeAuthModal = () => setShowAuthModal(false);

    return (
        <CustomerAuthContext.Provider value={{
            customerToken,
            customerName,
            login,
            logout,
            isAuthenticated: !!customerToken,
            showAuthModal,
            openAuthModal,
            closeAuthModal,
        }}>
            {children}
        </CustomerAuthContext.Provider>
    );
};

export const useCustomerAuth = () => {
    const context = useContext(CustomerAuthContext);
    if (context === undefined) {
        throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
    }
    return context;
};
