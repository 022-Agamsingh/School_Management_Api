// Simple test to debug the login issue
console.log('=== Frontend API Debug Test ===');

// Test 1: Check environment variable
console.log('VITE_API_BASE_URL from env:', import.meta.env.VITE_API_BASE_URL);

// Test 2: Check API_BASE_URL constant
import { API_BASE_URL } from './src/config/api.js';
console.log('API_BASE_URL constant:', API_BASE_URL);

// Test 3: Test simple fetch
async function testLogin() {
    console.log('Testing login endpoint...');
    
    const loginData = {
        email: "test@example.com",
        password: "password123"
    };
    
    try {
        console.log('Making request to:', `${API_BASE_URL}/login`);
        
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(loginData)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        const data = await response.json();
        console.log('Response data:', data);
        
    } catch (error) {
        console.error('❌ Login test failed:', error);
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
    }
}

// Run test
testLogin();
