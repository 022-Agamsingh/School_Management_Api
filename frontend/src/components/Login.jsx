import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const containerStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ecf0f1',
        padding: '20px'
    };

    const formStyles = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
    };

    const headerStyles = {
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
        color: '#2c3e50'
    };

    const subHeaderStyles = {
        fontSize: '16px',
        textAlign: 'center',
        color: '#7f8c8d',
        marginBottom: '30px'
    };

    const inputStyles = {
        width: '100%',
        padding: '15px',
        margin: '10px 0',
        border: '2px solid #bdc3c7',
        borderRadius: '8px',
        fontSize: '16px',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease',
        outline: 'none'
    };

    const buttonStyles = {
        width: '100%',
        padding: '15px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s ease'
    };

    const errorStyles = {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '14px'
    };

    const linkStyles = {
        textAlign: 'center',
        marginTop: '25px',
        color: '#7f8c8d',
        fontSize: '14px'
    };

    const linkButtonStyles = {
        color: '#3498db',
        cursor: 'pointer',
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        fontSize: 'inherit',
        fontWeight: 'bold'
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                onLogin(data.user);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyles}>
            <div style={formStyles}>
                <h2 style={headerStyles}>Welcome Back!</h2>
                <p style={subHeaderStyles}>Sign in to your account</p>

                {error && <div style={errorStyles}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyles}
                        onFocus={(e) => e.target.style.borderColor = '#3498db'}
                        onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={inputStyles}
                        onFocus={(e) => e.target.style.borderColor = '#3498db'}
                        onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyles,
                            backgroundColor: loading ? '#95a5a6' : '#3498db',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) e.target.style.backgroundColor = '#2980b9';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) e.target.style.backgroundColor = '#3498db';
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={linkStyles}>
                    Don't have an account?{' '}
                    <button
                        style={linkButtonStyles}
                        onClick={onSwitchToSignup}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
