import { FormEvent, useCallback, useEffect, useState } from "react";
import { IconPlus, IconBack, IconLink, IconSearch, IconGroup } from "../../components/IconList";
import { Link, useNavigate } from "react-router-dom";
import { accountService, AccountView, GetAllAccountsParams } from "../../feature/API/AccountService";
import '../CSS/LinkingWithStudent.css'; // Assuming you have a CSS file for styling


const LinkStudentPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredStudents, setFilteredStudents] = useState<AccountView[]>([]);


    const getAllStudents = useCallback(async (fullName: string, email: string, pageNumber: number) => {
        try {
            // Create GetAllAccountsParams
            const queryParam: GetAllAccountsParams = {
                FullName: fullName,
                Email: email,
                Role: 'Student',
                Status: 'NotLinked',
                PageNumber: pageNumber,
                PageSize: 5
            };

            //Response contain students list
            const response = await accountService.getAll(queryParam);
            if (response && response.data) {
                console.log('Students loaded successfully:', response.data);
                return response.data; // Return the list of students
            } else {
                console.error('No students found');
            }
        } catch (error) {
            console.error('Failed to load students:', error);
        }
    }, []);


    // Load students from API
    useEffect(() => {
        const InItStudents = async () => {
            const students = await getAllStudents("", "", 1);
            if (students) {
                setFilteredStudents(students); // ✅ Safe assignment
            } else {
                setFilteredStudents([]); // or handle empty result
            }
        };
        InItStudents();
    }, [getAllStudents]); // Load students on component mount


    const handleLink = async (studentId: string) => {
        try {
            //Add confirmation

            //Add Linking logic here
            console.log("Linking student...");
            const parentId = localStorage.getItem("userId");

            if (!parentId) {
                console.warn("Parent ID not found in localStorage");
                return;
            }
            console.log(`Linking student ${studentId} to parent ${parentId}`);
            await accountService.link(parentId, studentId); 

            //Go back to parent profile page
            navigate('/parentUserProfile');
        } catch (error) {
            console.error("Failed to link student:", error);
            alert("Failed to link student. Please try again later.");
        }
    };


    const handleSearch = async (e: FormEvent<Element>) => {
        e.preventDefault();
        console.log(`Searching for: ${searchTerm}`);
        const students = await getAllStudents(searchTerm, "", 1);
        if (students) {
            setFilteredStudents(students); // ✅ Safe assignment
        } else {
            setFilteredStudents([]); // or handle empty result
        }
    };




    return (
        <div className="page-wrapper">
            <Link className="back-link" to="/parentUserProfile">
                <IconBack />
                <span>Back</span>
            </Link>

            <PageHeader />
            <SearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
            />
            <StudentList students={filteredStudents} handleLink={handleLink} />
        </div>
    );
};

const PageHeader = () => (
    <header className="page-header">
        <div className="page-header-icon">
            <IconLink />
        </div>
        <h1>Link Student to Account</h1>
        <p>Search and select a student to link to your account</p>
    </header>
);

interface SearchFormProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    onSearch: (e: React.FormEvent) => void;
}

const SearchForm = ({ searchTerm, setSearchTerm, onSearch }: SearchFormProps) => (
    <form className="search-form-container" onSubmit={onSearch}>
        <div className="search-input-wrapper">
            <div className="search-input-icon">
                <IconSearch />
            </div>
            <input
                type="text"
                className="search-input"
                placeholder="Search by student name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <button type="submit" className="button button-primary">
            <IconSearch className="icon" />
            Search
        </button>
    </form>
);

interface StudentListProps {
    students: AccountView[];
    handleLink: (studentId: string) => void;

}

const StudentList = ({ students, handleLink, }: StudentListProps) => (
    <div className="student-list-container">
        <div className="student-list-header">
            <IconGroup className="icon" />
            <div>
                <h2>Available Students</h2>
                <p>Select a student to link to your account</p>
            </div>
        </div>
        <div className="student-list">
            {students.length > 0 ? (
                students.map((student) => (
                    <StudentListItem key={student.id} student={student} handleLink={handleLink} />
                ))
            ) : (
                <NoStudentsFound />
            )}
        </div>
    </div>
);

const NoStudentsFound = () => (
    <div className="no-student-found">
        <p>No student found. Please try again later.</p>
    </div>
);

interface StudentListItemProps {
    student: AccountView;
    handleLink: (studentId: string) => void;
}
const StudentListItem = ({ student, handleLink }: StudentListItemProps) => {


    return (
        <div className="student-list-item">
            <div className="student-info">
                <img src="/assets/PRN_Avatar.svg" alt={student.fullName} className="student-avatar" />
                <div>
                    <div className="student-name">{student.fullName}</div>
                    <div className="student-email">{student.email}</div>
                </div>
            </div>
            <button className="button button-primary" onClick={() => handleLink(student.id)}>
                <IconPlus className="icon" />
                Link
            </button>
        </div>
    );
};



export default LinkStudentPage;

