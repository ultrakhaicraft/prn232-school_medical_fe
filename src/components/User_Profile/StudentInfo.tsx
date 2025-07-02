import { 
  IconStudent
} from '../../components/IconList'; 


interface StudentInfoProp{
    student: string;
}

const StudentInfo = ({ student } : StudentInfoProp) => {
    const handleLinkStudent = () => {
        // In a real app, this would navigate to a new page.
        // e.g., window.location.href = '/link-student';
        alert("Navigating to the 'Link Student' page...");
    };

    return (
        <div className="info-card">
            <div className="info-card-header">
                <h2 className="info-card-title"><IconStudent /> Student Information</h2>
            </div>
            <div className="student-info-content">
                <img src={student.avatarUrl} alt="Student Avatar" className="student-avatar" />
                <div className="student-details">
                    <h3>{student.name}</h3>
                    {student.id ? (
                        <p className="student-id">Student ID: {student.id}</p>
                    ) : (
                        <p className="student-id">No student linked to this account.</p>
                    )}
                </div>
            </div>
            <div className="info-grid" style={{marginTop: '1rem'}}>
                {student.id ? (
                    <>
                        <div className="info-item">
                            <label>Class</label>
                            <p>{student.class}</p>
                        </div>
                        <div className="info-item">
                            <label>Homeroom Teacher</label>
                            <p>{student.homeroomTeacher}</p>
                        </div>
                        <div className="info-item">
                            <label>Academic Year</label>
                            <p>{student.academicYear}</p>
                        </div>
                    </>
                ) : (
                     <div className="info-item full-width">
                        <button className="button button-link-student" onClick={handleLinkStudent}>
                            Link a Student to Your Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentInfo