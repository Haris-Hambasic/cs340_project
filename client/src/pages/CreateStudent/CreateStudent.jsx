import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import "./styles/CreateStudent.scss";

const CreateStudent = () => {
    let navigate = useNavigate();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [studentMajor, setStudentMajor] = useState(null);

    const createStudent = () => {
        fetch("http://localhost:3450/api/create-student", {
        // fetch("/api/create-student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                "studentMajor": studentMajor
            })
        })
        navigate("/students", { replace: "true" });
    };

    return (
        <div>
            <Header />
            <div className="create-student-inner-container">
                <input placeholder="First Name" value={firstName} onChange={((e) => setFirstName(e.target.value))} />
                <br />
                <input placeholder="Last Name" value={lastName} onChange={((e) => setLastName(e.target.value))} />
                <br />
                <input placeholder="Major" value={studentMajor} onChange={((e) => setStudentMajor(e.target.value))} />
                <p className="create-student-btn" onClick={createStudent}>Create Student</p>
            </div>
        </div>
    );
};

export { CreateStudent };
