// CORE
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// STYLES
import "./styles/Courses.scss";

// COMPONENTS
import { Header } from "../../components/Header/Header";

const Courses = () => {
    const [courses, setCourses] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState("");

    const [courseTitle, setCourseTitle] = useState(null);
    const [courseProfessor, setCourseProfessor] = useState(null);
    const [courseDepartment, setCourseDepartment] = useState(null);

    useEffect(() => {
        // fetch("http://localhost:3450/get-courses", {
        // fetch("http://localhost:3450/api/get-courses", {
        fetch("/api/get-courses/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCourses(data);
                setSelectedCourse(data[0].courseTitle);
            });
    }, []);

    const handleCourseSelection = (courseSelectionEvent) => {
        setSelectedCourse(courseSelectionEvent.target.value);
        return 0;
    };

    const handleDeleteCourse = (courseID) => {
        console.log("courseID:", courseID);
        // fetch(`http://localhost:3450/api/course/delete/${courseID}`, {
        fetch(`/api/course/delete/${courseID}`, {
            method: "DELETE"
        })
            .then(response => {
                // fetch("http://localhost:3450/api/get-courses", {
                    fetch("/api/get-courses/", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("HERE IS DAS DATA:", data);
                            setCourses(data);
                            setSelectedCourse(data[0].courseTitle);
                        });
            })
    }

    const handleAddCourse = () => {
        // fetch("http://localhost:3450/api/add-course", {
        fetch("/api/add-course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "courseTitle": courseTitle,
                "courseProfessor": courseProfessor,
                // "courseDepartment": courseDepartment
            })
        })
    };

    return (
        <div className="courses-page-outer-container">
            <div className="courses-page-inner-container">
                <Header />
                <div className="courses-hero-outer-container">
                    <div className="courses-hero-inner-container">
                        <div className="hero-text-container">
                            <p className="courses-hero-calling">Sign Up for Your<br /> Next Course</p>
                            <p className="courses-hero-statement">
                                Search courses available at Oregon State University and sign up
                                for the courses you're interested in.
                            </p>
                        </div>
                        <div className="courses-add-course">
                            <h2 className="course-add-course-title">Create a Course</h2>
                            <input className="course-add-course-course-title" placeholder="Course Title" onChange={(e) => setCourseTitle(e.target.value)} />
                            {/* <input className="course-add-course-course-professor" placeholder="Course Professor" onChange={(e) => setCourseProfessor(e.target.value)} /> */}
                            {/* <input className="course-add-course-course-department" placeholder="Course Department" onChange={(e) => setCourseDepartment(e.target.value)} /> */}
                            <p className="course-add-course-btn" onClick={handleAddCourse}>Add Course</p>
                        </div>
                        {/* <div className="courses-hero-add-form">
                            <form>
                                <label className="course-hero-add-form-title">Courses</label>
                                <select value={selectedCourse} onChange={handleCourseSelection} className="course-hero-add-form-select">
                                    {
                                        courses !== null
                                        ?
                                        courses.map(course => (
                                            <option key={course.courseID} value={course.courseTitle} className="course-hero-select-option">{course.courseTitle}</option>
                                        ))
                                        : null
                                    }
                                </select>
                            </form>
                            <Link to={`/course/${selectedCourse}`} state={ { "courseTitle": selectedCourse } }>
                                    <button className="course-search-btn">Lookup Course</button>
                            </Link>
                        </div> */}
                    </div>
                </div>
                {/* <div className="available-courses-outer-container">
                    <h1 className="available-courses-title">Courses</h1>
                    <div className="available-courses-inner-container">
                        {
                            courses !== null
                            ?
                            courses.map(course => (
                                <Link to={`/course/${course.courseTitle}`}  state={ { "courseTitle": course.courseTitle } } className="available-course">
                                    <div key={course.courseID}>
                                        <div className="available-course-header">
                                            <p className="available-course-title">{course.courseTitle}</p>
                                            <p className="available-course-department">-{course.department}-</p>
                                        </div>
                                        <div className="course-description-container">
                                            <p className="course-description">{course.courseDescription}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            :
                            null
                        }
                    </div>
                </div> */}
                <div className="courses-list-outer-container">
                    <div className="courses-list-inner-container">
                        <p className="courses-list-title">Courses</p>
                        <div className="courses-list-columns">
                            <p className="courses-list-column-course-title">Course Title</p>
                            <p className="courses-list-column-course-professor">Professor</p>
                            <p className="courses-list-column-course-department">Department</p>
                            <p className="courses-list-column-course-options">Options</p>
                        </div>
                        {
                            courses === null
                            ? null
                            : courses.map(course => (
                                <div className="courses-list-course">
                                    <Link to={`/course/${course.courseTitle}`} state={{ "courseTitle": course.courseTitle }} className="courses-list-course-title">
                                        <h1>{course.courseTitle}</h1>
                                    </Link>
                                    <p className="courses-list-course-professor">{course.teacherFirstName} {course.teacherLastName}</p>
                                    <p className="courses-list-course-departent">{course.department}</p>
                                    <Link to={`/course/edit/${course.courseTitle}`} state={{ "courseID": course.courseID }} className="courses-list-edit-course">Edit</Link>
                                    <p className="courses-list-delete-course" onClick={() => handleDeleteCourse(course.courseID)}>Delete</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Courses };
