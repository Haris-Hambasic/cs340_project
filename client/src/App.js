// CORE
import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS
import { Header } from "./components/Header/Header";

// PAGES
import { Home } from './pages/Home/Home';
import { Teachers } from "./pages/Teachers/Teachers";
import { Students } from "./pages/Students/Students";
import { Courses } from "./pages/Courses/Courses";
import { Course } from "./pages/Course/Course";
import { BuildingsOnCampus } from "./pages/BuildingsOnCampus/BuildingsOnCampus";
import { StudentEdit } from "./pages/StudentEdit/StudentEdit";
import { CreateStudent } from "./pages/CreateStudent/CreateStudent";

import './App.scss';

const App = () => {
    return (
        <div className="App">
            <div className="hero-section-backdrop-item-1"></div>
            <div className="hero-section-backdrop-item-2"></div>
            {/* <div className="hero-section-backdrop-item-3"></div> */}
            {/* <Header /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/buildings-on-campus" element={<BuildingsOnCampus />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseTitle" element={<Course />} />
                    <Route path="/student-edit/:studentID" element={<StudentEdit />} />
                    <Route path="/create-student" element={<CreateStudent />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export { App };
