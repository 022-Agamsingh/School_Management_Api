import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSchools: 0,
        nearestSchool: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userLocation, setUserLocation] = useState(null);

    const containerStyles = {
        padding: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const headerStyles = {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#2c3e50',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #3498db, #2c3e50)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    };

    const statsContainerStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        marginBottom: '40px'
    };

    const statCardStyles = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center',
        border: '1px solid #ecf0f1',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    };

    const statNumberStyles = {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#3498db',
        marginBottom: '15px'
    };

    const statLabelStyles = {
        fontSize: '18px',
        color: '#7f8c8d',
        marginBottom: '10px',
        fontWeight: '600'
    };

    const errorStyles = {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '15px',
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

    const locationButtonStyles = {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '15px 25px',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '25px',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 5px 15px rgba(243, 156, 18, 0.3)'
    };

    const welcomeCardStyles = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
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
                    fetchSchoolsData(location);
                },
                (error) => {
                    setError('Unable to get your location. Using default coordinates.');
                    // Use default coordinates (New York City)
                    const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
                    setUserLocation(defaultLocation);
                    fetchSchoolsData(defaultLocation);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            const defaultLocation = { latitude: 40.7128, longitude: -74.0060 };
            setUserLocation(defaultLocation);
            fetchSchoolsData(defaultLocation);
        }
    };

    const fetchSchoolsData = async (location) => {
        try {
            const response = await fetch(
                `http://localhost:3000/listSchools?latitude=${location.latitude}&longitude=${location.longitude}`,
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
                setStats({
                    totalSchools: data.totalSchools,
                    nearestSchool: data.schools.length > 0 ? data.schools[0] : null
                });
            } else {
                setError(data.error || 'Failed to fetch schools data');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserLocation();
    }, []);

    if (loading) {
        return (
            <div style={containerStyles}>
                <div style={loadingStyles}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
                    Loading dashboard data...
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyles}>
            <h1 style={headerStyles}>📊 Dashboard</h1>

            <div style={welcomeCardStyles}>
                <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>Welcome to School Management System</h2>
                <p style={{ fontSize: '16px', opacity: 0.9 }}>
                    Manage schools, track locations, and analyze educational data efficiently
                </p>
            </div>

            {error && <div style={errorStyles}>{error}</div>}

            {!userLocation && (
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <button
                        style={locationButtonStyles}
                        onClick={getUserLocation}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#e67e22';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f39c12';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        📍 Get My Location
                    </button>
                </div>
            )}

            <div style={statsContainerStyles}>
                <div
                    style={statCardStyles}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                >
                    <div style={statNumberStyles}>{stats.totalSchools}</div>
                    <div style={statLabelStyles}>Total Schools</div>
                    <div style={{ fontSize: '14px', color: '#95a5a6' }}>
                        Registered in the system
                    </div>
                </div>

                <div
                    style={statCardStyles}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    }}
                >
                    <div style={statNumberStyles}>
                        {stats.nearestSchool ? `${stats.nearestSchool.distance.toFixed(1)} km` : 'N/A'}
                    </div>
                    <div style={statLabelStyles}>Nearest School</div>
                    <div style={{ fontSize: '14px', color: '#95a5a6' }}>
                        {stats.nearestSchool ? stats.nearestSchool.name : 'No schools found'}
                    </div>
                </div>

                {userLocation && (
                    <div
                        style={statCardStyles}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                        }}
                    >
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60', marginBottom: '15px' }}>
                            📍 Your Location
                        </div>
                        <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '5px' }}>
                            Latitude: {userLocation.latitude.toFixed(6)}
                        </div>
                        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                            Longitude: {userLocation.longitude.toFixed(6)}
                        </div>
                    </div>
                )}
            </div>

            {stats.nearestSchool && (
                <div
                    style={{
                        ...statCardStyles,
                        textAlign: 'left',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white'
                    }}
                >
                    <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '24px' }}>
                        🏫 Nearest School Details
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <p style={{ marginBottom: '10px' }}><strong>Name:</strong> {stats.nearestSchool.name}</p>
                            <p style={{ marginBottom: '10px' }}><strong>Distance:</strong> {stats.nearestSchool.distance.toFixed(2)} km</p>
                        </div>
                        <div>
                            <p style={{ marginBottom: '10px' }}><strong>Address:</strong> {stats.nearestSchool.address}</p>
                            <p style={{ marginBottom: '10px' }}>
                                <strong>Coordinates:</strong> {stats.nearestSchool.latitude}, {stats.nearestSchool.longitude}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div style={{
                textAlign: 'center',
                marginTop: '40px',
                padding: '20px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Quick Actions</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{
                        padding: '15px 25px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}>
                        View All Schools
                    </div>
                    <div style={{
                        padding: '15px 25px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}>
                        Add New School
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
