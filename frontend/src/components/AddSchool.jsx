import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const AddSchool = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationLoading, setLocationLoading] = useState(false);

    const containerStyles = {
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto'
    };

    const headerStyles = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#2c3e50',
        textAlign: 'center'
    };

    const formContainerStyles = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #ecf0f1'
    };

    const formGroupStyles = {
        marginBottom: '25px'
    };

    const labelStyles = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '14px'
    };

    const inputStyles = {
        width: '100%',
        padding: '15px',
        border: '2px solid #ecf0f1',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    };

    const textareaStyles = {
        ...inputStyles,
        minHeight: '100px',
        resize: 'vertical'
    };

    const buttonStyles = {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        width: '100%'
    };

    const secondaryButtonStyles = {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        width: '100%',
        marginBottom: '15px'
    };

    const messageStyles = {
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'bold'
    };

    const successMessageStyles = {
        ...messageStyles,
        backgroundColor: '#d5f5d5',
        color: '#27ae60',
        border: '1px solid #27ae60'
    };

    const errorMessageStyles = {
        ...messageStyles,
        backgroundColor: '#fde2e2',
        color: '#e74c3c',
        border: '1px solid #e74c3c'
    };

    const coordinateGroupStyles = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px'
    };

    const locationInfoStyles = {
        backgroundColor: '#e8f4f8',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #3498db'
    };

    const locationTextStyles = {
        margin: '0',
        color: '#2c3e50',
        fontSize: '14px'
    };

    const helpTextStyles = {
        fontSize: '12px',
        color: '#7f8c8d',
        marginTop: '5px',
        fontStyle: 'italic'
    };

    const getCurrentLocation = () => {
        setLocationLoading(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6)
                    };
                    setCurrentLocation(location);
                    setFormData(prev => ({
                        ...prev,
                        latitude: location.latitude,
                        longitude: location.longitude
                    }));
                    setLocationLoading(false);
                    setMessage('Location detected successfully!');
                    setIsSuccess(true);
                    setTimeout(() => setMessage(''), 3000);
                },
                (error) => {
                    setLocationLoading(false);
                    setMessage('Unable to get your location. Please enter coordinates manually.');
                    setIsSuccess(false);
                    setTimeout(() => setMessage(''), 5000);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        } else {
            setLocationLoading(false);
            setMessage('Geolocation is not supported by this browser.');
            setIsSuccess(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setMessage('School name is required');
            setIsSuccess(false);
            return false;
        }
        if (!formData.address.trim()) {
            setMessage('Address is required');
            setIsSuccess(false);
            return false;
        }
        if (!formData.latitude || !formData.longitude) {
            setMessage('Both latitude and longitude are required');
            setIsSuccess(false);
            return false;
        }

        const lat = parseFloat(formData.latitude);
        const lng = parseFloat(formData.longitude);

        if (isNaN(lat) || lat < -90 || lat > 90) {
            setMessage('Latitude must be a number between -90 and 90');
            setIsSuccess(false);
            return false;
        }
        if (isNaN(lng) || lng < -180 || lng > 180) {
            setMessage('Longitude must be a number between -180 and 180');
            setIsSuccess(false);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setTimeout(() => setMessage(''), 5000);
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/addSchool`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    address: formData.address.trim(),
                    latitude: parseFloat(formData.latitude),
                    longitude: parseFloat(formData.longitude)
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('School added successfully!');
                setIsSuccess(true);
                setFormData({
                    name: '',
                    address: '',
                    latitude: '',
                    longitude: ''
                });
                setCurrentLocation(null);
            } else {
                setMessage(data.error || 'Failed to add school');
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
            setIsSuccess(false);
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <div style={containerStyles}>
            <h1 style={headerStyles}>🏫 Add New School</h1>

            <div style={formContainerStyles}>
                {message && (
                    <div style={isSuccess ? successMessageStyles : errorMessageStyles}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyles}>
                        <label style={labelStyles} htmlFor="name">
                            School Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                ...inputStyles,
                                borderColor: formData.name ? '#27ae60' : '#ecf0f1'
                            }}
                            placeholder="Enter school name"
                            maxLength="100"
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = formData.name ? '#27ae60' : '#ecf0f1'}
                        />
                        <div style={helpTextStyles}>
                            Maximum 100 characters
                        </div>
                    </div>

                    <div style={formGroupStyles}>
                        <label style={labelStyles} htmlFor="address">
                            Address *
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            style={{
                                ...textareaStyles,
                                borderColor: formData.address ? '#27ae60' : '#ecf0f1'
                            }}
                            placeholder="Enter complete address"
                            maxLength="500"
                            onFocus={(e) => e.target.style.borderColor = '#3498db'}
                            onBlur={(e) => e.target.style.borderColor = formData.address ? '#27ae60' : '#ecf0f1'}
                        />
                        <div style={helpTextStyles}>
                            Include street, city, state, and zip code. Maximum 500 characters
                        </div>
                    </div>

                    <div style={formGroupStyles}>
                        <label style={labelStyles}>
                            Location Coordinates *
                        </label>

                        <button
                            type="button"
                            onClick={getCurrentLocation}
                            disabled={locationLoading}
                            style={{
                                ...secondaryButtonStyles,
                                backgroundColor: locationLoading ? '#95a5a6' : '#f39c12',
                                cursor: locationLoading ? 'not-allowed' : 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                if (!locationLoading) e.target.style.backgroundColor = '#e67e22';
                            }}
                            onMouseLeave={(e) => {
                                if (!locationLoading) e.target.style.backgroundColor = '#f39c12';
                            }}
                        >
                            {locationLoading ? '📍 Getting Location...' : '📍 Use Current Location'}
                        </button>

                        {currentLocation && (
                            <div style={locationInfoStyles}>
                                <p style={locationTextStyles}>
                                    ✅ Location detected: {currentLocation.latitude}, {currentLocation.longitude}
                                </p>
                            </div>
                        )}

                        <div style={coordinateGroupStyles}>
                            <div>
                                <label style={labelStyles} htmlFor="latitude">
                                    Latitude *
                                </label>
                                <input
                                    type="number"
                                    id="latitude"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    style={{
                                        ...inputStyles,
                                        borderColor: formData.latitude ? '#27ae60' : '#ecf0f1'
                                    }}
                                    placeholder="e.g., 40.7128"
                                    step="any"
                                    min="-90"
                                    max="90"
                                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                    onBlur={(e) => e.target.style.borderColor = formData.latitude ? '#27ae60' : '#ecf0f1'}
                                />
                                <div style={helpTextStyles}>
                                    Range: -90 to 90
                                </div>
                            </div>

                            <div>
                                <label style={labelStyles} htmlFor="longitude">
                                    Longitude *
                                </label>
                                <input
                                    type="number"
                                    id="longitude"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    style={{
                                        ...inputStyles,
                                        borderColor: formData.longitude ? '#27ae60' : '#ecf0f1'
                                    }}
                                    placeholder="e.g., -74.0060"
                                    step="any"
                                    min="-180"
                                    max="180"
                                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                    onBlur={(e) => e.target.style.borderColor = formData.longitude ? '#27ae60' : '#ecf0f1'}
                                />
                                <div style={helpTextStyles}>
                                    Range: -180 to 180
                                </div>
                            </div>
                        </div>

                        <div style={helpTextStyles}>
                            💡 Tip: You can use Google Maps to find exact coordinates. Right-click on the location and select the coordinates.
                        </div>
                    </div>

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
                        {loading ? '⏳ Adding School...' : '✅ Add School'}
                    </button>
                </form>

                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #ecf0f1'
                }}>
                    <h3 style={{
                        margin: '0 0 15px 0',
                        color: '#2c3e50',
                        fontSize: '16px'
                    }}>
                        📋 Required Information
                    </h3>
                    <ul style={{
                        margin: '0',
                        paddingLeft: '20px',
                        color: '#7f8c8d',
                        fontSize: '14px'
                    }}>
                        <li>School name (unique identifier)</li>
                        <li>Complete address for location reference</li>
                        <li>Precise latitude and longitude coordinates</li>
                        <li>All fields marked with * are required</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddSchool;
