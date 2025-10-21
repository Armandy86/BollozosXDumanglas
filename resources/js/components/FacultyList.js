import React, { useState, useEffect } from 'react';

export default function FacultyList() {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch('/api/faculty');
                const data = await response.json();
                setFaculty(Array.isArray(data) ? data : []);
            } catch (error) {
                setFaculty([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFaculty();
    }, []);

    const filteredFaculty = faculty.filter(member => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (member.first_name + ' ' + member.last_name).toLowerCase().includes(searchLower) ||
            (member.email || '').toLowerCase().includes(searchLower) ||
            (member.faculty_id || '').toLowerCase().includes(searchLower) ||
            (member.department || '').toLowerCase().includes(searchLower)
        );
    });

    return (
        <div style={{ padding: '32px', background: '#f5f7fa', minHeight: '100vh' }}>
            {/* Search and Filter Bar */}
            <div style={{ 
                background: 'white', 
                padding: '20px 24px', 
                borderRadius: '12px 12px 0 0',
                border: '1px solid #e5e7eb',
                borderBottom: 'none',
                display: 'flex',
                gap: 16,
                alignItems: 'center'
            }}>
                <div style={{ position: 'relative' }}>
                    <select style={{
                        padding: '10px 36px 10px 14px',
                        borderRadius: 8,
                        border: '1px solid #d1d5db',
                        fontSize: 14,
                        color: '#6b7280',
                        background: 'white',
                        cursor: 'pointer',
                        appearance: 'none'
                    }}>
                        <option>Add filter</option>
                        <option>Department</option>
                        <option>Position</option>
                        <option>Status</option>
                    </select>
                    <svg 
                        style={{ 
                            position: 'absolute', 
                            right: 12, 
                            top: '50%', 
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none'
                        }}
                        width="12" 
                        height="12" 
                        viewBox="0 0 12 12" 
                        fill="none"
                    >
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div style={{ 
                    flex: 1, 
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <svg 
                        style={{ 
                            position: 'absolute', 
                            left: 14,
                            pointerEvents: 'none'
                        }}
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none"
                    >
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                            stroke="#9ca3af" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for a faculty member by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 14px 10px 44px',
                            borderRadius: 8,
                            border: '1px solid #d1d5db',
                            fontSize: 14,
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={{ 
                background: 'white',
                borderRadius: '0 0 12px 12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden'
            }}>
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{ 
                            background: '#f9fafb',
                            borderBottom: '1px solid #e5e7eb'
                        }}>
                            <th style={tableHeaderStyle}>Name</th>
                            <th style={tableHeaderStyle}>Faculty ID</th>
                            <th style={tableHeaderStyle}>Email address</th>
                            <th style={tableHeaderStyle}>Department</th>
                            <th style={tableHeaderStyle}>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ 
                                    padding: 40, 
                                    textAlign: 'center',
                                    color: '#6b7280'
                                }}>
                                    Loading faculty members...
                                </td>
                            </tr>
                        ) : filteredFaculty.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ 
                                    padding: 40, 
                                    textAlign: 'center',
                                    color: '#6b7280'
                                }}>
                                    {searchTerm ? 'No faculty members found matching your search.' : 'No faculty members found.'}
                                </td>
                            </tr>
                        ) : (
                            filteredFaculty.map((member, index) => (
                                <tr 
                                    key={member.id}
                                    onMouseEnter={() => setSelectedRow(index)}
                                    onMouseLeave={() => setSelectedRow(null)}
                                    style={{
                                        background: selectedRow === index ? '#dbeafe' : 'white',
                                        borderBottom: '1px solid #f3f4f6',
                                        cursor: 'pointer',
                                        transition: 'background 0.15s'
                                    }}
                                >
                                    <td style={tableCellStyle}>
                                        {member.first_name} {member.last_name}
                                    </td>
                                    <td style={tableCellStyle}>
                                        {member.faculty_id || '—'}
                                    </td>
                                    <td style={tableCellStyle}>
                                        {member.email || '—'}
                                    </td>
                                    <td style={tableCellStyle}>
                                        {member.department || '—'}
                                    </td>
                                    <td style={tableCellStyle}>
                                        {member.position || '—'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const tableHeaderStyle = {
    padding: '14px 20px',
    textAlign: 'left',
    fontSize: 13,
    fontWeight: 600,
    color: '#4b5563',
    textTransform: 'none'
};

const tableCellStyle = {
    padding: '16px 20px',
    fontSize: 14,
    color: '#1f2937'
};


