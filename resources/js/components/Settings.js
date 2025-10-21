import React, { useState } from 'react';

export default function Settings() {
    const [theme, setTheme] = useState('light');

    const settingsOptions = [
        {
            id: 'edit-profile',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5a67d8" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            ),
            iconBg: '#EEF2FF',
            title: 'Edit Profile',
            description: 'Update your personal information like name, contact details, and profile picture.',
            action: () => console.log('Edit Profile clicked')
        },
        {
            id: 'change-password',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="9" r="6"/>
                    <circle cx="9" cy="9" r="2"/>
                    <path d="M14 9h6"/>
                    <path d="M17 7v4"/>
                    <path d="M20 9v.01"/>
                    <path d="M16 13l-1.5 1.5"/>
                    <path d="M14.5 14.5l-1 1"/>
                    <path d="M13.5 15.5l-1 1"/>
                </svg>
            ),
            iconBg: '#D1FAE5',
            title: 'Change Password',
            description: '',
            action: () => console.log('Change Password clicked')
        },
        {
            id: 'change-theme',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            ),
            iconBg: '#EDE9FE',
            title: 'Change Theme',
            description: 'Switch between light and dark mode.',
            action: () => {
                const newTheme = theme === 'light' ? 'dark' : 'light';
                setTheme(newTheme);
                console.log('Theme changed to:', newTheme);
            }
        },
        {
            id: 'logout',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
            ),
            iconBg: '#FEF3C7',
            title: 'Logout',
            description: '',
            action: () => {
                if (confirm('Are you sure you want to logout?')) {
                    console.log('Logging out...');
                    // Add logout logic here
                }
            }
        }
    ];

    return (
        <div style={{ 
            padding: '48px 64px', 
            background: '#f9fafb', 
            minHeight: '100vh',
            width: '100%'
        }}>
            {/* Header */}
            <div style={{ marginBottom: 48 }}>
                <h1 style={{ 
                    fontSize: 36,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: 12,
                    margin: 0
                }}>
                    Settings
                </h1>
                <p style={{ 
                    fontSize: 15,
                    color: '#6b7280',
                    lineHeight: '24px',
                    maxWidth: 700,
                    margin: '12px 0 0 0'
                }}>
                    Allows the user to update profile information, change their account password, 
                    switch between light and dark themes, and securely log out of the system.
                </p>
            </div>

            {/* Settings Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 24,
                maxWidth: 1000
            }}>
                {settingsOptions.map((option) => (
                    <div
                        key={option.id}
                        onClick={option.action}
                        style={{
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: 12,
                            padding: 28,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                            e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
                            e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            width: 56,
                            height: 56,
                            borderRadius: 12,
                            background: option.iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 20
                        }}>
                            {option.icon}
                        </div>

                        {/* Title */}
                        <h3 style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: '#1a1a1a',
                            margin: '0 0 8px 0'
                        }}>
                            {option.title}
                        </h3>

                        {/* Description */}
                        {option.description && (
                            <p style={{
                                fontSize: 13,
                                color: '#6b7280',
                                lineHeight: '20px',
                                margin: 0
                            }}>
                                {option.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

