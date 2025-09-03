// Test script to verify API configuration
import { API_BASE_URL } from './src/config/api.js';

console.log('🔧 Frontend Configuration Test');
console.log('============================');
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Environment Variable VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);

// Test API connection
async function testAPIConnection() {
    try {
        console.log('🌐 Testing API connection...');
        const response = await fetch(`${API_BASE_URL}/`);
        const data = await response.json();
        console.log('✅ API Response:', data);
        console.log('✅ API is reachable!');
    } catch (error) {
        console.error('❌ API Connection Error:', error);
    }
}

testAPIConnection();
