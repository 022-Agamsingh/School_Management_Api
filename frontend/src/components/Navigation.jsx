import React from 'react';

const Navigation = ({ currentPage, setCurrentPage, user, onLogout }) => {
    const navigationStyles = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        zIndex: 1000
    };

    const headerStyles = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '30px',
        textAlign: 'center',
        borderBottom: '2px solid #34495e',
        paddingBottom: '15px'
    };

    const userInfoStyles = {
        backgroundColor: '#34495e',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center'
    };

    const menuItemStyles = {
        padding: '12px 15px',
        margin: '5px 0',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    const activeMenuItemStyles = {
        ...menuItemStyles,
        backgroundColor: '#3498db',
        fontWeight: 'bold'
    };

    const logoutButtonStyles = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        transition: 'background-color 0.3s ease'
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'schools', label: 'Schools', icon: '🏫' },
        { id: 'add-school', label: 'Add School', icon: '➕' },
        { id: 'profile', label: 'Profile', icon: '👤' }
    ];

    return (
        <div style={navigationStyles}>
            <div style={headerStyles}>
                School Management
            </div>

            <div style={userInfoStyles}>
                <div style={{ fontSize: '18px', marginBottom: '5px' }}>Welcome!</div>
                <div style={{ fontSize: '14px', color: '#bdc3c7' }}>{user?.name}</div>
                <div style={{ fontSize: '12px', color: '#bdc3c7' }}>{user?.email}</div>
            </div>

            <div>
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        style={currentPage === item.id ? activeMenuItemStyles : menuItemStyles}
                        onClick={() => setCurrentPage(item.id)}
                        onMouseEnter={(e) => {
                            if (currentPage !== item.id) {
                                e.target.style.backgroundColor = '#34495e';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentPage !== item.id) {
                                e.target.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            <button
                style={logoutButtonStyles}
                onClick={onLogout}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
            >
                🚪 Logout
            </button>
        </div>
    );
};

export default Navigation;
