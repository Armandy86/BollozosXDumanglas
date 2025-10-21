import React, { useEffect, useState } from 'react';
import Home from './Home';
import Faculty from './Faculty';

export default function Dashboard() {
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsRes, facultyRes] = await Promise.all([
                    fetch('/api/students'),
                    fetch('/api/faculty')
                ]);
                
                const studentsData = await studentsRes.json();
                const facultyData = await facultyRes.json();
                
                setStudents(Array.isArray(studentsData) ? studentsData : []);
                setFaculty(Array.isArray(facultyData) ? facultyData : []);
            } catch (e) {
                setStudents([]);
                setFaculty([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const [showAdd, setShowAdd] = useState(false);
    const openAddStudent = () => setShowAdd(true);
    const closeAddStudent = () => setShowAdd(false);
    const [showList, setShowList] = useState(false);
    const openList = () => setShowList(true);
    const closeList = () => setShowList(false);

    const [showStudentDetails, setShowStudentDetails] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const openStudentDetails = (student) => {
        setSelectedStudent(student);
        setShowStudentDetails(true);
    };
    const closeStudentDetails = () => {
        setShowStudentDetails(false);
        setSelectedStudent(null);
    };

    const [showEditStudent, setShowEditStudent] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const openEditStudent = (student) => {
        setStudentToEdit(student);
        setShowEditStudent(true);
    };
    const closeEditStudent = () => {
        setShowEditStudent(false);
        setStudentToEdit(null);
    };

    const [showAddFaculty, setShowAddFaculty] = useState(false);
    const openAddFaculty = () => setShowAddFaculty(true);
    const closeAddFaculty = () => setShowAddFaculty(false);
    const [showFacultyList, setShowFacultyList] = useState(false);
    const openFacultyList = () => setShowFacultyList(true);
    const closeFacultyList = () => setShowFacultyList(false);

    const [showFacultyDetails, setShowFacultyDetails] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const openFacultyDetails = (facultyMember) => {
        setSelectedFaculty(facultyMember);
        setShowFacultyDetails(true);
    };
    const closeFacultyDetails = () => {
        setShowFacultyDetails(false);
        setSelectedFaculty(null);
    };

    const [showEditFaculty, setShowEditFaculty] = useState(false);
    const [facultyToEdit, setFacultyToEdit] = useState(null);
    const openEditFaculty = (facultyMember) => {
        setFacultyToEdit(facultyMember);
        setShowEditFaculty(true);
    };
    const closeEditFaculty = () => {
        setShowEditFaculty(false);
        setFacultyToEdit(null);
    };

    const goToStudents = () => {
        openList();
    };

    const goToFaculty = () => {
        openFacultyList();
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '24px auto', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <img src="/images/fsuu-logo.png" alt="FSUU Logo" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                <div style={{ fontWeight: 700 }}>Father Saturnino Urios University</div>
            </div>
            <h2 style={{ margin: 0 }}>Profile Management Dashboard</h2>
            <p style={{ color: '#6b7280', marginTop: 6 }}>Manage student and faculty profiles efficiently</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
                <StatCard title="Total Students" value={students.length} delta="+12% from last semester" iconBg="#e0f2fe" iconDot="#38bdf8" />
                <StatCard title="Faculty Members" value={184} delta="+5% from last month" iconBg="#ecfccb" iconDot="#84cc16" />
                <StatCard title="Active Courses" value={46} delta="+8% from last month" iconBg="#ede9fe" iconDot="#8b5cf6" />
                <StatCard title="Departments" value={8} delta="No change from last month" iconBg="#ffedd5" iconDot="#f97316" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
                        <div style={{ fontWeight: 600 }}>Student Profiles</div>
                        <button onClick={openAddStudent} style={buttonStylePrimary}>+ Add Student</button>
                    </div>
                    <div style={{ padding: 16 }}>
                        {loading ? (
                            <div style={{ color: '#6b7280' }}>Loading…</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {students.slice(0, 3).map(s => (
                                    <ListItem 
                                        key={s.id} 
                                        title={`${s.first_name} ${s.last_name}`} 
                                        subtitle={`${s.program || 'Program'} · ${s.year_level || ''} Year`} 
                                        meta={`ID: ${s.student_id || '—'}`}
                                        student={s}
                                        onViewDetails={openStudentDetails}
                                        onEdit={openEditStudent}
                                    />
                                ))}
                                <div style={{ textAlign: 'center', marginTop: 8 }}>
                                    <a onClick={goToStudents} style={{ color: '#16a34a', cursor: 'pointer', textDecoration: 'none' }}>View All Students</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e5e7eb' }}>
                        <div style={{ fontWeight: 600 }}>Faculty Profiles</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={buttonStyleSecondary} onClick={goToFaculty}>View All</button>
                            <button style={buttonStylePrimary} onClick={openAddFaculty}>+ Add Faculty</button>
                        </div>
                    </div>
                    <div style={{ padding: 16 }}>
                        {loading ? (
                            <div style={{ color: '#6b7280' }}>Loading faculty...</div>
                        ) : faculty.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {faculty.slice(0, 3).map(f => (
                                    <ListItem 
                                        key={f.id} 
                                        title={`${f.first_name} ${f.last_name}`} 
                                        subtitle={`${f.department || 'Department'} · ${f.position || 'Position'}`} 
                                        meta={`ID: ${f.faculty_id || '—'}`}
                                        student={f}
                                        onViewDetails={openFacultyDetails}
                                        onEdit={openEditFaculty}
                                    />
                                ))}
                                <div style={{ textAlign: 'center', marginTop: 8 }}>
                                    <a onClick={goToFaculty} style={{ color: '#16a34a', cursor: 'pointer', textDecoration: 'none' }}>View All Faculty</a>
                                </div>
                            </div>
                        ) : (
                            <div style={{ color: '#6b7280' }}>No faculty members yet. Add your first faculty member!</div>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, height: 220, marginTop: 16 }}></div>

            {showAdd && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Add Student</div>
                            <button onClick={closeAddStudent} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <Home onSuccess={() => { closeAddStudent(); /* refresh preview */ fetch('/api/students').then(r=>r.json()).then(d=>setStudents(Array.isArray(d)?d:[])); }} showForm={true} showList={false} />
                        </div>
                    </div>
                </div>
            )}

            {showList && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>All Students</div>
                            <button onClick={closeList} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <Home showForm={false} showList={true} />
                        </div>
                    </div>
                </div>
            )}

            {showStudentDetails && selectedStudent && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Student Details</div>
                            <button onClick={closeStudentDetails} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 16px 0', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>Personal Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Student ID:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.student_id || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Full Name:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>
                                                    {selectedStudent.first_name} {selectedStudent.middle_name} {selectedStudent.last_name}
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Date of Birth:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.date_of_birth || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Gender:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.gender || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Personal Information:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.personal_information || '—'}</div>
                                            </div>
                                        </div>

                                        <h3 style={{ margin: '24px 0 16px 0', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>Contact Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Email:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.email || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Phone:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.phone || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Address:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.address || '—'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 style={{ margin: '0 0 16px 0', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>Academic Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Program/Course:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.program || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Year Level:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.year_level || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Section:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedStudent.section || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Status:</label>
                                                <div style={{ 
                                                    color: '#374151', 
                                                    marginTop: '4px',
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    backgroundColor: selectedStudent.status === 'Active' ? '#dcfce7' : '#fef3c7',
                                                    color: selectedStudent.status === 'Active' ? '#166534' : '#92400e',
                                                    display: 'inline-block',
                                                    fontSize: '12px',
                                                    fontWeight: '600'
                                                }}>
                                                    {selectedStudent.status || '—'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditStudent && studentToEdit && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Edit Student</div>
                            <button onClick={closeEditStudent} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <Home 
                                onSuccess={() => { 
                                    closeEditStudent(); 
                                    /* refresh preview */ 
                                    fetch('/api/students').then(r=>r.json()).then(d=>setStudents(Array.isArray(d)?d:[])); 
                                }} 
                                showForm={true} 
                                showList={false}
                                editStudent={studentToEdit}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showAddFaculty && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Add Faculty</div>
                            <button onClick={closeAddFaculty} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <Faculty 
                                onSuccess={() => { 
                                    closeAddFaculty(); 
                                    /* refresh preview */ 
                                    fetch('/api/faculty').then(r=>r.json()).then(d=>setFaculty(Array.isArray(d)?d:[])); 
                                }} 
                                showForm={true} 
                                showList={false} 
                            />
                        </div>
                    </div>
                </div>
            )}

            {showFacultyList && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>All Faculty</div>
                            <button onClick={closeFacultyList} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <Faculty showForm={false} showList={true} />
                        </div>
                    </div>
                </div>
            )}

            {showFacultyDetails && selectedFaculty && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Faculty Details</div>
                            <button onClick={closeFacultyDetails} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 16px 0', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>Personal Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Faculty ID:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.faculty_id || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Full Name:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>
                                                    {selectedFaculty.first_name} {selectedFaculty.middle_name} {selectedFaculty.last_name}
                                                </div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Date of Birth:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.date_of_birth || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Gender:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.gender || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Personal Information:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.personal_information || '—'}</div>
                                            </div>
                                        </div>

                                        <h3 style={{ margin: '24px 0 16px 0', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>Contact Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Email:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.email || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Phone:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.phone || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Address:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.address || '—'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 style={{ margin: '0 0 16px 0', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>Academic Information</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Department:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.department || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Position:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.position || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Attainment:</label>
                                                <div style={{ color: '#374151', marginTop: '4px' }}>{selectedFaculty.attainment || '—'}</div>
                                            </div>
                                            <div>
                                                <label style={{ fontWeight: '600', color: '#6b7280', fontSize: '14px' }}>Status:</label>
                                                <div style={{ 
                                                    color: '#374151', 
                                                    marginTop: '4px',
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    backgroundColor: selectedFaculty.status === 'Active' ? '#dcfce7' : '#fef3c7',
                                                    color: selectedFaculty.status === 'Active' ? '#166534' : '#92400e',
                                                    display: 'inline-block',
                                                    fontSize: '12px',
                                                    fontWeight: '600'
                                                }}>
                                                    {selectedFaculty.status || '—'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditFaculty && facultyToEdit && (
                <div style={modalOverlay}>
                    <div style={modalContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontWeight: 700, fontSize: 18 }}>Edit Faculty</div>
                            <button onClick={closeEditFaculty} style={buttonStyleGhost}>✕</button>
                        </div>
                        <div style={{ maxHeight: '75vh', overflow: 'auto' }}>
                            <Faculty 
                                onSuccess={() => { 
                                    closeEditFaculty(); 
                                    /* refresh preview */ 
                                    fetch('/api/faculty').then(r=>r.json()).then(d=>setFaculty(Array.isArray(d)?d:[])); 
                                }} 
                                showForm={true} 
                                showList={false}
                                editFaculty={facultyToEdit}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const buttonStylePrimary = {
    background: '#16a34a',
    color: 'white',
    padding: '10px 14px',
    borderRadius: 8,
    border: 0,
    fontWeight: 600,
    cursor: 'pointer'
};

const buttonStyleSecondary = {
    background: 'white',
    color: '#374151',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #d1d5db',
    fontWeight: 600,
    cursor: 'pointer'
};

function StatCard({ title, value, delta, iconBg, iconDot }) {
    return (
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #e5e7eb', display: 'flex', gap: 12 }}>
            <div style={{ width: 36, height: 36, background: iconBg, borderRadius: 8, position: 'relative' }}>
                <div style={{ width: 10, height: 10, background: iconDot, borderRadius: 9999, position: 'absolute', right: 6, bottom: 6 }}></div>
            </div>
            <div>
                <div style={{ color: '#6b7280', fontSize: 12 }}>{title}</div>
                <div style={{ fontWeight: 700, fontSize: 24 }}>{value}</div>
                <div style={{ color: '#16a34a', fontSize: 12 }}>{delta}</div>
            </div>
        </div>
    );
}

function ListItem({ title, subtitle, meta, student, onViewDetails, onEdit }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, border: '1px solid #e5e7eb', borderRadius: 10 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 9999, background: '#e5e7eb' }}></div>
                <div>
                    <div style={{ fontWeight: 600 }}>{title}</div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>{subtitle}</div>
                    <div style={{ color: '#6b7280', fontSize: 12 }}>{meta}</div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <span 
                    style={iconAction} 
                    onClick={() => onViewDetails(student)}
                    title="View Details"
                >
                    👁️
                </span>
                <span 
                    style={iconAction} 
                    onClick={() => onEdit(student)}
                    title="Edit Student"
                >
                    ✎
                </span>
            </div>
        </div>
    );
}

const iconAction = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 6,
    background: '#f3f4f6',
    cursor: 'pointer'
};

const modalOverlay = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    zIndex: 1000
};

const modalContent = {
    width: 'min(1100px, 100%)',
    background: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
};

const buttonStyleGhost = {
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '6px 10px',
    cursor: 'pointer'
};


