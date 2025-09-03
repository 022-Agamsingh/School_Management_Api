import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const SchoolList = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const containerStyles = {
        padding: '30px',
        maxWidth: '1400px',
        margin: '0 auto'
    };

    const headerStyles = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#2c3e50',
        textAlign: 'center'
    };

    const controlsStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
    };

    const tableContainerStyles = {
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #ecf0f1'
    };

    const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const thStyles = {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '20px 15px',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '16px'
    };

    const tdStyles = {
        padding: '20px 15px',
        borderBottom: '1px solid #ecf0f1',
        fontSize: '14px',
        verticalAlign: 'top'
    };

    const errorStyles = {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '25px',
        textAlign: 'center'
    };

    const loadingStyles = {
        textAlign: 'center',
        fontSize: '20px',
        color: '#7f8c8d',
        padding: '60px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    };

    const noDataStyles = {
        textAlign: 'center',
        fontSize: '18px',
        color: '#7f8c8d',
        padding: '60px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    };

    const locationButtonStyles = {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease'
    };

    const refreshButtonStyles = {
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease'
    };

    const locationInfoStyles = {
        backgroundColor: '#ecf0f1',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#7f8c8d',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    // Get user's location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    setUserLocation(location);
                    fetchSchools(location);
                },
                (error) => {
                    setError('Unable to get your location. Using default coordinates.');
                    // Use default coordinates
                    const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
                    setUserLocation(defaultLocation);
                    fetchSchools(defaultLocation);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
            setUserLocation(defaultLocation);
            fetchSchools(defaultLocation);
        }
    };

    const fetchSchools = async (location) => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `${API_BASE_URL}/listSchools?latitude=${location.latitude}&longitude=${location.longitude}`,
                {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSchools(data.schools);
            } else {
                setError(data.error || 'Failed to fetch schools');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getDistanceColor = (distance) => {
        if (distance < 5) return '#27ae60';
        if (distance < 20) return '#f39c12';
        return '#e74c3c';
    };

    const getDistanceBadge = (distance) => {
        if (distance < 5) return 'Very Close';
        if (distance < 20) return 'Nearby';
        return 'Far';
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    if (loading) {
        return (
            <div style={containerStyles}>
                <div style={loadingStyles}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏫</div>
                    Loading schools...
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyles}>
            <h1 style={headerStyles}>🏫 Schools Directory</h1>

            {error && <div style={errorStyles}>{error}</div>}

            <div style={controlsStyles}>
                <div>
                    {userLocation ? (
                        <div style={locationInfoStyles}>
                            <span>📍</span>
                            <span>
                                Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                            </span>
                        </div>
                    ) : (
                        <button
                            style={locationButtonStyles}
                            onClick={getUserLocation}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#e67e22'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#f39c12'}
                        >
                            📍 Get My Location
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    {userLocation && (
                        <button
                            style={refreshButtonStyles}
                            onClick={() => fetchSchools(userLocation)}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
                        >
                            🔄 Refresh
                        </button>
                    )}
                </div>
            </div>

            {schools.length === 0 ? (
                <div style={noDataStyles}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏫</div>
                    <h3>No schools found</h3>
                    <p>No schools are currently registered in the system.</p>
                    <p style={{ fontSize: '14px', color: '#95a5a6', marginTop: '20px' }}>
                        Add a new school to get started!
                    </p>
                </div>
            ) : (
                <>
                    <div style={tableContainerStyles}>
                        <table style={tableStyles}>
                            <thead>
                                <tr>
                                    <th style={thStyles}>School Name</th>
                                    <th style={thStyles}>Address</th>
                                    <th style={thStyles}>Coordinates</th>
                                    <th style={thStyles}>Distance</th>
                                    <th style={thStyles}>Status</th>
                                    <th style={thStyles}>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schools.map((school, index) => (
                                    <tr
                                        key={school.id}
                                        style={{
                                            backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white'}
                                    >
                                        <td style={tdStyles}>
                                            <div style={{ fontWeight: 'bold', color: '#2c3e50', marginBottom: '5px' }}>
                                                {school.name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                                                ID: {school.id}
                                            </div>
                                        </td>
                                        <td style={tdStyles}>
                                            <div style={{ maxWidth: '200px', wordWrap: 'break-word', color: '#2c3e50' }}>
                                                {school.address}
                                            </div>
                                        </td>
                                        <td style={tdStyles}>
                                            <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#7f8c8d' }}>
                                                <div>Lat: {school.latitude}</div>
                                                <div>Lng: {school.longitude}</div>
                                            </div>
                                        </td>
                                        <td style={tdStyles}>
                                            <div style={{
                                                color: getDistanceColor(school.distance),
                                                fontWeight: 'bold',
                                                fontSize: '16px'
                                            }}>
                                                {school.distance.toFixed(2)} km
                                            </div>
                                        </td>
                                        <td style={tdStyles}>
                                            <div style={{
                                                display: 'inline-block',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: 'white',
                                                backgroundColor: getDistanceColor(school.distance)
                                            }}>
                                                {getDistanceBadge(school.distance)}
                                            </div>
                                        </td>
                                        <td style={tdStyles}>
                                            <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                                                {new Date(school.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{
                        marginTop: '25px',
                        textAlign: 'center',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ color: '#2c3e50', fontSize: '16px', fontWeight: 'bold' }}>
                            📊 Summary: {schools.length} school{schools.length !== 1 ? 's' : ''} found
                        </div>
                        <div style={{ color: '#7f8c8d', fontSize: '14px', marginTop: '5px' }}>
                            Sorted by distance from your location
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SchoolList;
