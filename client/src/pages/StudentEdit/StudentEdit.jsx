import { useEffect } from "react";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";

// STYLES
import "./styles/StudentEdit.scss";

const StudentEdit = () => {
    let { studentID } = useParams();
    // const location = useLocation();
    // const data = location.state;
    // console.log(data.studentID);

    const [studentName, setStudentName] = useState(null);
    const [studentMajor, setStudentMajor] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3450/api/get-student/${studentID}`)
            .then(response => response.json())
            .then(studentData => {
                console.log("HERE:", studentData)
                setStudentName(studentData[0].firstName + " " + studentData[0].lastName);
                setStudentMajor(studentData[0].studentMajor);
            });
    }, []);

    const updateStudentInformation = () => {
        fetch(`http://localhost:3450/api/update-student-information`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "studentID": studentID,
                "studentName": studentName,
                "studentMajor": studentMajor
            })
        });
    };

    return (
        <div className="student-edit-outer-container">
            <div className="student-edit-inner-container">
                <Header />
                <h1 className="student-edit-title">Edit Student Information</h1>
                {
                    studentName === null
                    ? null
                    : (
                        <div className="student-info-container">
                            <input className="student-info-name" onChange={(e) => setStudentName(e.target.value)} value={studentName} />
                            <br />
                            <input className="student-info-major" onChange={(e) => setStudentMajor(e.target.value)} value={studentMajor} />
                            <p className="update-student-information-btn" onClick={updateStudentInformation}>Update Student Information</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export { StudentEdit };
