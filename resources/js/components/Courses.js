import React, { useState } from 'react';

export default function Courses() {
    const [expandedProgram, setExpandedProgram] = useState(null);

    const programs = [
        {
            id: 1,
            name: 'NURSING PROGRAM',
            color: 'linear-gradient(180deg, rgba(0, 0, 209, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/nursing-logo.png'
        },
        {
            id: 2,
            name: 'TEACHER EDUCATION PROGRAM',
            color: 'linear-gradient(180deg, rgba(0, 0, 209, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/teacher-education-logo.png'
        },
        {
            id: 3,
            name: 'ENGINEERING TECHNOLOGY PROGRAM',
            color: 'linear-gradient(180deg, rgba(217, 115, 71, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/engineering-logo.png'
        },
        {
            id: 4,
            name: 'CRIMINAL JUSTICE EDUCATION PROGRAM',
            color: 'linear-gradient(180deg, rgba(200, 78, 60, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/criminal-justice-logo.png'
        },
        {
            id: 5,
            name: 'COMPUTER STUDIES PROGRAM',
            color: 'linear-gradient(180deg, rgba(139, 93, 199, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/computer-studies-logo.png'
        },
        {
            id: 6,
            name: 'ARTS AND SCIENCES PROGRAM',
            color: 'linear-gradient(180deg, rgba(76, 175, 80, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/arts-sciences-logo.png'
        },
        {
            id: 7,
            name: 'BUSINESS ADMINISTRATION PROGRAM',
            color: 'linear-gradient(180deg, rgba(224, 160, 78, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/business-admin-logo.png'
        },
        {
            id: 8,
            name: 'ACCOUNTANCY PROGRAM',
            color: 'linear-gradient(180deg, rgba(127, 196, 216, 0.80) 0%, rgba(17, 24, 39, 0.80) 100%)',
            logo: '/images/accountancy-logo.png'
        }
    ];

    const toggleProgram = (id) => {
        setExpandedProgram(expandedProgram === id ? null : id);
    };

    return (
        <div style={{ 
            padding: '48px 80px', 
            background: '#f5f7fa', 
            minHeight: '100vh' 
        }}>
            <h1 style={{ 
                fontSize: 50,
                fontWeight: 900,
                color: '#1a1a1a',
                marginBottom: 40,
                letterSpacing: '1px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
            }}>
                PROGRAMS
            </h1>

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 24,
                maxWidth: 900,
                paddingLeft: 70
            }}>
                {programs.map((program) => (
                    <div
                        key={program.id}
                        style={{
                            position: 'relative',
                            marginLeft: 0
                        }}
                    >
                        {/* Logo Circle - Positioned to overlap the left edge */}
                        <div style={{
                            position: 'absolute',
                            left: -70,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 130,
                            height: 130,
                            borderRadius: '50%',
                            background: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            padding: 10,
                            border: '6px solid rgba(255, 255, 255, 0.3)',
                            zIndex: 10
                        }}>
                            <img 
                                src={program.logo} 
                                alt={program.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                                onError={(e) => {
                                    // Fallback if image doesn't exist
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                        <div style="
                                            width: 100%;
                                            height: 100%;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            font-size: 42px;
                                            font-weight: bold;
                                            color: #5a67d8;
                                        ">
                                            ${program.name.charAt(0)}
                                        </div>
                                    `;
                                }}
                            />
                        </div>

                        {/* Program Card */}
                        <div
                            onClick={() => toggleProgram(program.id)}
                            style={{
                                width: '643px',
                                height: '76px',
                                flexShrink: 0,
                                background: program.color,
                                borderRadius: '10px',
                                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: '90px',
                                paddingRight: '30px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 8px 0 rgba(0, 0, 0, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 4px 0 rgba(0, 0, 0, 0.25)';
                            }}
                        >
                            {/* Program Name */}
                            <div style={{
                                width: '451px',
                                height: '41px',
                                flexShrink: 0,
                                color: '#FFF',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '40px',
                                fontStyle: 'italic',
                                fontWeight: 800,
                                lineHeight: '24px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                {program.name}
                            </div>

                            {/* Dropdown Arrow */}
                            <svg 
                                width="28" 
                                height="28" 
                                viewBox="0 0 24 24" 
                                fill="none"
                                style={{
                                    transform: expandedProgram === program.id ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                    flexShrink: 0
                                }}
                            >
                                <path 
                                    d="M6 9L12 15L18 9" 
                                    stroke="white" 
                                    strokeWidth="3" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for expanded content */}
            {expandedProgram && (
                <div style={{
                    marginTop: 20,
                    padding: 24,
                    background: 'white',
                    borderRadius: 12,
                    maxWidth: 900,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    <h3 style={{ margin: '0 0 16px 0', color: '#1a1a1a' }}>
                        Program Details
                    </h3>
                    <p style={{ color: '#6b7280', margin: 0 }}>
                        Details for {programs.find(p => p.id === expandedProgram)?.name} will be displayed here.
                    </p>
                </div>
            )}
        </div>
    );
}

