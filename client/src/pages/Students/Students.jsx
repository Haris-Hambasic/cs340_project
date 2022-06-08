// CORE
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// STYLES
import "./styles/Students.scss";

// COMPONENTS
import { Header } from "../../components/Header/Header";

const Students = () => {
    const [students, setStudents] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3450/api/students", { method: "GET" })
        // fetch("/api/students/", { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            });
    }, []);

    const deleteStudent = (studentID) => {
        console.log("The studentID is " + studentID);
        fetch(`http://localhost:3450/api/delete-student/${studentID}`, { method: "DELETE" })
            .then(response => response.json())
            .then(students => setStudents(students));
    };

    return (
        <div className="students-page-outer-container">
            <div className="students-page-inner-container">
                <Header />
                <div className="students-hero-outer-container">
                    <div className="students-hero-inner-container">
                        <div className="student-text-container">
                            <p className="students-hero-calling">Student Portal<br />Access Simplified.</p>
                            <p className="students-hero-statement">
                                Now students have the ability to quickly and easily find courses 
                                and other university activities that match their personality.
                            </p>
                        </div>
                        <div className="students-hero-add-form">
                            <Link to={"/create-student"} className="create-student-btn">Create Student</Link>
                        </div>
                    </div>
                </div>
                <div className="students-list-outer-container">
                    <div className="students-list-inner-container">
                        <h2 className="students-list-title">Students</h2>
                        <div className="students-list-collection">
                            {
                                students !== null
                                ?
                                students.map(student => (
                                    <div className="student-container">
                                        <div key={student.studentID} className="student">
                                            <h3 className="student-name">{student.firstName} {student.lastName}</h3>
                                            <p className="student-major">-{student.studentMajor}-</p>
                                            <div className="student-options">
                                                <p className="student-edit" onClick={() => navigate(`/student-edit/${student.studentID}`)}>Edit</p>
                                                <p className="student-delete" onClick={() => deleteStudent(student.studentID)}>Delete</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Students };
