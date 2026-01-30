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
