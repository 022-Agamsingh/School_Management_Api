// Test file to demonstrate API usage
// Run this with: node test-api.js

import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3001';

// Test adding a school
async function testAddSchool() {
    try {
        const response = await fetch(`${API_BASE}/addSchool`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Central High School",
                address: "123 Education Street, New York, NY",
                latitude: 40.7128,
                longitude: -74.0060
            })
        });
        
        const result = await response.json();
        console.log('Add School Result:', result);
        return result;
    } catch (error) {
        console.error('Error adding school:', error);
    }
}

// Test adding another school
async function testAddSchool2() {
    try {
        const response = await fetch(`${API_BASE}/addSchool`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: "Brooklyn Academy",
                address: "456 Learning Ave, Brooklyn, NY",
                latitude: 40.6782,
                longitude: -73.9442
            })
        });
        
        const result = await response.json();
        console.log('Add School 2 Result:', result);
        return result;
    } catch (error) {
        console.error('Error adding school 2:', error);
    }
}

// Test listing schools
async function testListSchools() {
    try {
        const userLat = 40.7589; // Times Square coordinates
        const userLng = -73.9851;
        
        const response = await fetch(`${API_BASE}/listSchools?latitude=${userLat}&longitude=${userLng}`);
        const result = await response.json();
        console.log('List Schools Result:', JSON.stringify(result, null, 2));
        return result;
    } catch (error) {
        console.error('Error listing schools:', error);
    }
}

// Run tests
async function runTests() {
    console.log('=== Testing School Management API ===\n');
    
    console.log('1. Adding first school...');
    await testAddSchool();
    
    console.log('\n2. Adding second school...');
    await testAddSchool2();
    
    console.log('\n3. Listing schools sorted by proximity to Times Square...');
    await testListSchools();
}

runTests();
