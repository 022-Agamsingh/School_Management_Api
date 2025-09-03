import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [stats, setStats] = useState({
        totalSchools: 0,

    });
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

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

    const profileCardStyles = {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #ecf0f1',
        marginBottom: '30px'
    };

    const avatarStyles = {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#3498db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 30px auto',
        fontSize: '48px',
        color: 'white',
        fontWeight: 'bold'
    };

    const infoRowStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 0',
        borderBottom: '1px solid #ecf0f1'
    };

    const labelStyles = {
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '16px'
    };

    const valueStyles = {
        color: '#7f8c8d',
        fontSize: '16px'
    };

    const buttonStyles = {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease'
    };

    const secondaryButtonStyles = {
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        marginLeft: '10px'
    };

    const inputStyles = {
        width: '100%',
        padding: '12px',
        border: '2px solid #ecf0f1',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s ease',
        fontFamily: 'inherit',
        boxSizing: 'border-box'
    };

    const formGroupStyles = {
        marginBottom: '20px'
    };

    const errorStyles = {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
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

    const statsCardStyles = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #ecf0f1'
    };

    const statItemStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        borderBottom: '1px solid #ecf0f1'
    };

    const fetchSchoolsData = async (location) => {
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
                setStats(prevStats => ({
                    ...prevStats,
                    totalSchools: data.totalSchools || 0
                }));
            } else {
                console.error('Failed to fetch schools data:', data.error);
                setStats(prevStats => ({
                    ...prevStats,
                    totalSchools: 0
                }));
            }
        } catch (error) {
            console.error('Network error fetching schools:', error);
            setStats(prevStats => ({
                ...prevStats,
                totalSchools: 0
            }));
        }
    };
    const fetchUserProfile = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                setUserInfo(data.user);
                setFormData(prev => ({
                    ...prev,
                    email: data.user.email
                }));
            } else {
                setError(data.error || 'Failed to fetch profile');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePassword = () => {
        if (formData.password && formData.password.length < 6) {
            setUpdateMessage('Password must be at least 6 characters long');
            setUpdateSuccess(false);
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setUpdateMessage('Passwords do not match');
            setUpdateSuccess(false);
            return false;
        }
        return true;
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (formData.password && !validatePassword()) {
            setTimeout(() => setUpdateMessage(''), 5000);
            return;
        }

        setUpdateLoading(true);
        setUpdateMessage('');

        try {
            const updateData = { email: formData.email };
            if (formData.password) {
                updateData.password = formData.password;
            }

            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();

            if (response.ok) {
                setUpdateMessage('Profile updated successfully!');
                setUpdateSuccess(true);
                setEditMode(false);
                setFormData(prev => ({
                    ...prev,
                    password: '',
                    confirmPassword: ''
                }));
                fetchUserProfile(); // Refresh profile data
            } else {
                setUpdateMessage(data.error || 'Failed to update profile');
                setUpdateSuccess(false);
            }
        } catch (error) {
            setUpdateMessage('Network error. Please try again.');
            setUpdateSuccess(false);
        } finally {
            setUpdateLoading(false);
            setTimeout(() => setUpdateMessage(''), 5000);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setFormData(prev => ({
            ...prev,
            email: userInfo?.email || '',
            password: '',
            confirmPassword: ''
        }));
        setUpdateMessage('');
    };

    const getInitials = (email) => {
        return email ? email.charAt(0).toUpperCase() : 'U';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const fetchSchoolStats = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    fetchSchoolsData(location);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    // Use default location if geolocation fails
                    const defaultLocation = { latitude: 0, longitude: 0 };
                    fetchSchoolsData(defaultLocation);
                }
            );
        } else {
            // Use default location if geolocation is not supported
            const defaultLocation = { latitude: 0, longitude: 0 };
            fetchSchoolsData(defaultLocation);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        fetchSchoolStats();
    }, []);

    if (loading) {
        return (
            <div style={containerStyles}>
                <div style={loadingStyles}>
                    <div style={{ fontSize: '48px', marginBottom: '20px' }}>👤</div>
                    Loading profile...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={containerStyles}>
                <div style={errorStyles}>{error}</div>
            </div>
        );
    }

    return (
        <div style={containerStyles}>
            <h1 style={headerStyles}>👤 My Profile</h1>

            {updateMessage && (
                <div style={updateSuccess ? successMessageStyles : errorMessageStyles}>
                    {updateMessage}
                </div>
            )}

            <div style={profileCardStyles}>
                <div style={avatarStyles}>
                    {getInitials(userInfo?.email)}
                </div>

                {!editMode ? (
                    <>
                        <div style={infoRowStyles}>
                            <span style={labelStyles}>📧 Email</span>
                            <span style={valueStyles}>{userInfo?.email}</span>
                        </div>

                        <div style={infoRowStyles}>
                            <span style={labelStyles}>🆔 User ID</span>
                            <span style={valueStyles}>{userInfo?._id}</span>
                        </div>

                        <div style={infoRowStyles}>
                            <span style={labelStyles}>📅 Member Since</span>
                            <span style={valueStyles}>
                                {userInfo?.createdAt ? formatDate(userInfo.createdAt) : 'N/A'}
                            </span>
                        </div>

                        <div style={infoRowStyles}>
                            <span style={labelStyles}>🔄 Last Updated</span>
                            <span style={valueStyles}>
                                {userInfo?.updatedAt ? formatDate(userInfo.updatedAt) : 'N/A'}
                            </span>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button
                                style={buttonStyles}
                                onClick={() => setEditMode(true)}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
                            >
                                ✏️ Edit Profile
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleUpdateProfile}>
                        <div style={formGroupStyles}>
                            <label style={labelStyles}>📧 Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={inputStyles}
                                required
                                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
                            />
                        </div>

                        <div style={formGroupStyles}>
                            <label style={labelStyles}>🔒 New Password (Optional)</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                style={inputStyles}
                                placeholder="Leave blank to keep current password"
                                minLength="6"
                                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
                            />
                        </div>

                        {formData.password && (
                            <div style={formGroupStyles}>
                                <label style={labelStyles}>🔒 Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    style={inputStyles}
                                    placeholder="Confirm your new password"
                                    required
                                    onFocus={(e) => e.target.style.borderColor = '#3498db'}
                                    onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
                                />
                            </div>
                        )}

                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <button
                                type="submit"
                                disabled={updateLoading}
                                style={{
                                    ...buttonStyles,
                                    backgroundColor: updateLoading ? '#95a5a6' : '#27ae60',
                                    cursor: updateLoading ? 'not-allowed' : 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    if (!updateLoading) e.target.style.backgroundColor = '#229954';
                                }}
                                onMouseLeave={(e) => {
                                    if (!updateLoading) e.target.style.backgroundColor = '#27ae60';
                                }}
                            >
                                {updateLoading ? '⏳ Updating...' : '✅ Save Changes'}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                style={secondaryButtonStyles}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#7f8c8d'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#95a5a6'}
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div style={statsCardStyles}>
                <h3 style={{
                    margin: '0 0 25px 0',
                    color: '#2c3e50',
                    fontSize: '20px',
                    textAlign: 'center'
                }}>
                    📊 Account Statistics
                </h3>

                <div style={statItemStyles}>
                    <span style={labelStyles}>🏫 Total Schools Added</span>
                    <span style={valueStyles}>{stats.totalSchools}</span>
                </div>


                <div style={statItemStyles}>
                    <span style={labelStyles}>🔐 Account Status</span>
                    <span style={{ ...valueStyles, color: '#27ae60', fontWeight: 'bold' }}>
                        ✅ Active
                    </span>
                </div>

                <div style={{ ...statItemStyles, borderBottom: 'none' }}>
                    <span style={labelStyles}>🌍 Last Location Access</span>
                    <span style={valueStyles}>Browser-based</span>
                </div>
            </div>
        </div>
    );
};

export default Profile;