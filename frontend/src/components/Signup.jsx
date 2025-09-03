import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const Signup = ({ onSwitchToLogin, onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        backgroundColor: '#27ae60',
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

    const successStyles = {
        backgroundColor: '#27ae60',
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

    const passwordHintStyles = {
        fontSize: '12px',
        color: '#7f8c8d',
        marginTop: '5px',
        padding: '8px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
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
        setSuccess('');

        // Basic validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Account created successfully! Redirecting to login...');
                setTimeout(() => {
                    onSwitchToLogin();
                }, 2000);
            } else {
                setError(data.error || 'Signup failed');
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
                <h2 style={headerStyles}>Create Account</h2>
                <p style={subHeaderStyles}>Join our School Management System</p>

                {error && <div style={errorStyles}>{error}</div>}
                {success && <div style={successStyles}>{success}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyles}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyles}
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
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
                        onFocus={(e) => e.target.style.borderColor = '#27ae60'}
                        onBlur={(e) => e.target.style.borderColor = '#bdc3c7'}
                        required
                    />

                    <div style={passwordHintStyles}>
                        Password must be strong (at least 8 characters, uppercase, lowercase, number, special character)
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyles,
                            backgroundColor: loading ? '#95a5a6' : '#27ae60',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) e.target.style.backgroundColor = '#229954';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) e.target.style.backgroundColor = '#27ae60';
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div style={linkStyles}>
                    Already have an account?{' '}
                    <button
                        style={linkButtonStyles}
                        onClick={onSwitchToLogin}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
