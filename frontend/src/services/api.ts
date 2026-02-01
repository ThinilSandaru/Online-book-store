export const API_URL = 'http://localhost:8080';

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
