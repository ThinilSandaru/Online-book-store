export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface AuthResponse {
    token: string;
    // Add other fields if returned by API
}

export const loginOwner = async (email: string, password: string): Promise<string> => {
    const response = await fetch(`${API_URL}/authenticate/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Adjust payload structure if needed
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    // Parse JSON and extract the token from the 'Message' property
    const data = await response.json();
    return data.Message; // Extract only the JWT string
};

export const validateOwnerToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/owner/check`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Owner token validation failed:', error);
        return false;
    }
};

export const validateAdminToken = async (token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/admin/check`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Admin token validation failed:', error);
        return false;
    }
};

export interface NewBookData {
    title: string;
    ssn: string;
    author: string;
    price: string;
    copies: string;
    image: File;
}

export const addNewBook = async (bookData: NewBookData, token: string, role: 'owner' | 'admin'): Promise<any> => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('ssn', bookData.ssn);
    formData.append('author', bookData.author);
    formData.append('price', bookData.price);
    formData.append('copies', bookData.copies);
    formData.append('image', bookData.image);

    const endpoint = role === 'admin' ? '/admin/add/new/book' : '/owner/add/new/book';

    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to add book');
    }

    return await response.json();
};

export interface RegisterEmployeeData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export const registerEmployee = async (employeeData: RegisterEmployeeData, token: string): Promise<any> => {
    const response = await fetch(`${API_URL}/owner/register/employee`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to register employee');
    }

    return await response.json();
};

export type Employee = {
    id: number;
    email: string;
    name: string;
    phoneNumber: string;
};

export const getAllEmployees = async (token: string): Promise<Employee[]> => {
    const response = await fetch(`${API_URL}/owner/get/all/employees`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch employees');
    }

    return await response.json();
};

export interface InventoryBook {
    id: number;
    title: string;
    author: string;
    price: number;
    imageUrl: string | null;
    copyCount: number;
}

export const getInventory = async (token: string, role: 'owner' | 'admin'): Promise<InventoryBook[]> => {
    const endpoint = role === 'admin' ? '/admin/get/inventory' : '/owner/get/inventory';
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch inventory');
    }

    return await response.json();
};

export const getUserInventory = async (): Promise<InventoryBook[]> => {
    const response = await fetch(`${API_URL}/user/get/inventory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch inventory');
    }

    return await response.json();
};

// ==================== Customer Auth ====================

export const loginCustomer = async (email: string, password: string): Promise<string> => {
    const response = await fetch(`${API_URL}/authenticate/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Invalid email or password');
    }

    const data = await response.json();
    return data.Message;
};

export interface CustomerRegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
}

export const registerCustomer = async (data: CustomerRegisterData): Promise<string> => {
    const response = await fetch(`${API_URL}/authenticate/register/customer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Registration failed');
    }

    const result = await response.json();
    return result.Message || 'Registration successful';
};

// ==================== Cart ====================

export const addToCart = async (bookId: number, quantity: number, token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/customer/add/book`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, quantity }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.Message || errorData?.message || 'Failed to add to cart');
    }

    const data = await response.json();
    return data.Message;
};

// ==================== Cart Data ====================

export interface CartItem {
    bookId: number;
    bookTitle: string;
    author: string;
    quantity: number;
    price: number;
    totalBookPrice: number;
}

export interface CartResponse {
    cartId: number;
    cartList: CartItem[];
    totalCount: number;
    totalPrice: number;
}

export const getCart = async (token: string): Promise<CartResponse> => {
    const response = await fetch(`${API_URL}/customer/get/cart`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.Message || errorData?.message || 'Failed to fetch cart');
    }

    return await response.json();
};

export const deleteCartItem = async (bookId: number, token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/customer/delete/book/${bookId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.Message || errorData?.message || 'Failed to remove item');
    }

    const data = await response.json();
    return data.Message;
};

// ==================== Checkout ====================

export const checkout = async (paymentStatus: string, cartId: number, token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/customer/checkout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus, cartId }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.Message || errorData?.message || 'Checkout failed');
    }

    const data = await response.json();
    return data.Message;
};

// ==================== Stripe Payment ====================

export const createPaymentIntent = async (amount: number, cartId: number, token: string): Promise<string> => {
    const response = await fetch(`${API_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, cartId }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.Message || errorData?.message || 'Failed to create payment intent');
    }

    const data = await response.json();
    return data.clientSecret;
};

// ==================== Customer Orders ====================

export interface OrderItem {
    bookId: number;
    bookTitle: string;
    bookPrice: number;
    quantity: number;
}

export interface OrderSummary {
    orderId: number;
    totalAmount: number;
    paymentStatus: string;
    orderStatus: string;
    items: OrderItem[];
}

export const getMyOrders = async (token: string): Promise<OrderSummary[]> => {
    const response = await fetch(`${API_URL}/customer/orders/my-orders`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.Message || errorData?.message || 'Failed to fetch orders');
    }

    return await response.json();
};

// ==================== Dashboard Orders (Owner / Admin) ====================

export interface DashboardOrderItem {
    bookId: number;
    bookTitle: string;
    price: number;
    quantity: number;
}

export interface DashboardOrder {
    orderId: number;
    userId: number;
    totalAmount: number;
    paymentStatus: string;
    orderStatus: string;
    items: DashboardOrderItem[];
}

export const getDashboardOrders = async (token: string, role: 'owner' | 'admin'): Promise<DashboardOrder[]> => {
    const endpoint = role === 'owner' ? '/owner/orders' : '/admin/orders';
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch dashboard orders');
    }

    return await response.json();
};

export const updateOrderStatus = async (token: string, role: 'owner' | 'admin', orderId: number, orderStatus: string): Promise<string> => {
    const endpoint = role === 'owner' ? '/owner/orders/status' : '/admin/orders/status';
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, orderStatus }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to update order status');
    }

    return 'Order status updated';
};
