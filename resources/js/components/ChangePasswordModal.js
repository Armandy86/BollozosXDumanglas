import React, { useState } from 'react';

export default function ChangePasswordModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.current_password.trim()) {
            newErrors.current_password = 'Current password is required.';
        }

        if (!formData.new_password.trim()) {
            newErrors.new_password = 'New password is required.';
        } else if (formData.new_password.length < 8) {
            newErrors.new_password = 'Password must be at least 8 characters long.';
        }

        if (!formData.new_password_confirmation.trim()) {
            newErrors.new_password_confirmation = 'Password confirmation is required.';
        } else if (formData.new_password !== formData.new_password_confirmation) {
            newErrors.new_password_confirmation = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch('/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                alert('Password changed successfully!');
                setFormData({
                    current_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                });
                onClose();
            } else {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    alert(data.message || 'An error occurred while changing the password.');
                }
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('An error occurred while changing the password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            current_password: '',
            new_password: '',
            new_password_confirmation: ''
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: 16,
                padding: 32,
                width: '100%',
                maxWidth: 480,
                margin: 16,
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-primary)'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 24
                }}>
                    <h2 style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: 0
                    }}>
                        Change Password
                    </h2>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 8,
                            borderRadius: 8,
                            color: 'var(--text-secondary)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--hover-bg)';
                            e.target.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = 'var(--text-secondary)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Current Password */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: 8
                        }}>
                            Current Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPasswords.current ? 'text' : 'password'}
                                name="current_password"
                                value={formData.current_password}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 48px 12px 16px',
                                    border: `1px solid ${errors.current_password ? 'var(--error)' : 'var(--border-primary)'}`,
                                    borderRadius: 8,
                                    fontSize: 14,
                                    backgroundColor: 'var(--input-bg)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: 4
                                }}
                            >
                                {showPasswords.current ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.current_password && (
                            <p style={{
                                color: 'var(--error)',
                                fontSize: 12,
                                margin: '4px 0 0 0'
                            }}>
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    {/* New Password */}
                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: 8
                        }}>
                            New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPasswords.new ? 'text' : 'password'}
                                name="new_password"
                                value={formData.new_password}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 48px 12px 16px',
                                    border: `1px solid ${errors.new_password ? 'var(--error)' : 'var(--border-primary)'}`,
                                    borderRadius: 8,
                                    fontSize: 14,
                                    backgroundColor: 'var(--input-bg)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Enter your new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: 4
                                }}
                            >
                                {showPasswords.new ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.new_password && (
                            <p style={{
                                color: 'var(--error)',
                                fontSize: 12,
                                margin: '4px 0 0 0'
                            }}>
                                {errors.new_password}
                            </p>
                        )}
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: 12,
                            margin: '4px 0 0 0'
                        }}>
                            Password must be at least 8 characters long.
                        </p>
                    </div>

                    {/* Confirm New Password */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{
                            display: 'block',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: 8
                        }}>
                            Confirm New Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                name="new_password_confirmation"
                                value={formData.new_password_confirmation}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 48px 12px 16px',
                                    border: `1px solid ${errors.new_password_confirmation ? 'var(--error)' : 'var(--border-primary)'}`,
                                    borderRadius: 8,
                                    fontSize: 14,
                                    backgroundColor: 'var(--input-bg)',
                                    color: 'var(--text-primary)',
                                    outline: 'none',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box'
                                }}
                                placeholder="Confirm your new password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-secondary)',
                                    padding: 4
                                }}
                            >
                                {showPasswords.confirm ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                        <line x1="1" y1="1" x2="23" y2="23"/>
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.new_password_confirmation && (
                            <p style={{
                                color: 'var(--error)',
                                fontSize: 12,
                                margin: '4px 0 0 0'
                            }}>
                                {errors.new_password_confirmation}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: 12,
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={handleClose}
                            style={{
                                padding: '12px 24px',
                                border: '1px solid var(--border-primary)',
                                borderRadius: 8,
                                backgroundColor: 'transparent',
                                color: 'var(--text-primary)',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'var(--hover-bg)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: 8,
                                backgroundColor: isLoading ? 'var(--text-secondary)' : 'var(--accent-primary)',
                                color: 'white',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                opacity: isLoading ? 0.7 : 1
                            }}
                        >
                            {isLoading ? 'Changing...' : 'Change Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
