// CORE

import * as React from "react";
import axios from 'axios'

// STYLES
import "./styles/Teachers.scss";

// COMPONENTS
import { Header } from "../../components/Header/Header";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Modal } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


const Teachers = () => {
    const [teachers, setTeachers] = React.useState(null);
    const [selectedTeacher, setSelectedTeacher] = React.useState("");
    var [displayTeacher, setDisplay] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var index = 1;
    var modalData = {}
    const [first, setFirst] = React.useState(null);
    const [last, setLast] = React.useState(null);
    const [dep, setDep] = React.useState(null);
    const [id, setID] = React.useState(null);




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    React.useEffect(() => {
        // fetch("http://localhost:3450/api/get-teachers", {
            fetch("/api/get-teachers/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setTeachers([...data]);
            });
    }, []);

    const handleSelectChange = (selectEvent) => {
        const index = selectEvent.target.selectedIndex;
        const el = selectEvent.target.childNodes[index]
        const option = el.getAttribute('id');
      
        setSelectedTeacher(selectEvent.target.value);

        return 0;
    };
    const deleteTeacher = (id) => {

        // fetch("http://localhost:3450/api/delete-teacher/" + id, {
        //     method: 'DELETE'
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log('asdasdasdasd')
        //     })
        //     .catch(err => console.log(err));
        // axios.get('http://localhost:3450/api/delete-teacher/'+id)
        axios.get('/api/delete-teacher/' + id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))

    };



    const updateTableRow = (id) => {
        index = id - 1;
        modalData = teachers[id - 1];
        handleOpen();
        setSelectedTeacher(teachers[id - 1]);
    }
    const submit = (event) => {
        // fetch('http://localhost:3450/api/update-teacher/' + selectedTeacher.teacherID, {
        fetch('/api/update-teacher/' + selectedTeacher.teacherID, {

        method: "PUT",
            headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "firstName": first,
            "lastName": last,
            "department": dep
        })
    }).then(result => result.json())
}
const handleFirst = (e) => {
    setFirst(e.target.value)
}
const handleLast = (e) => {
    setLast(e.target.value)
}
const handleDep = (e) => {
    setDep(e.target.value)
}


return (
    <div className="teachers-page-outer-container">
        <div className="teachers-page-inner-container">
            <Header />
            <div className="teachers-hero-outer-container">
                <div className="teachers-hero-inner-container">
                    <div className="hero-text-container">
                        <p className="teachers-hero-calling">Lookup your<br /> favorite professors.</p>
                        <p className="teachers-hero-statement">
                            Great professors make a greate university. Oregonizer let's
                            you lookup professors across all departments as well as specific
                            information about each professor.
                        </p>
                    </div>

                    <div className="teachers-hero-add-form">
                        <form className="teachers-hero-form-container">
                            <label>Professor</label>
                            <select value={selectedTeacher} onChange={handleSelectChange} className="teachers-select-element">
                                {
                                    teachers !== null
                                        ?
                                        teachers.map(teacher => (
                                            <option
                                                id={teacher.teacherID}
                                                key={teacher.teacherID}
                                                value={teacher.firstName + teacher.lastName}
                                            >
                                                {teacher.firstName} {teacher.lastName}
                                            </option>
                                        )
                                        )
                                        : null
                                }
                            </select>
                            {/* <input type="text" placeholder="Professor's name" className="teachers-hero-form-input" /> */}


                            <button type="submit" className="teachers-hero-form-submit-btn">Find Professors</button>
                        </form>
                    </div>

                </div>
                <div className="teachers-select-all-outer-container">
                    <div className="teachers-select-all-inner-container">
                        <h2 className="teachers-select-all-title">Professors</h2>

                        {
                            displayTeacher !== true
                                ?
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Department</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                teachers !== null
                                                    ?
                                                    teachers.map(teacher => (
                                                        <TableRow
                                                            key={teacher.teacherID}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {teacher.firstName} {teacher.lastName}
                                                            </TableCell>
                                                            <TableCell>{teacher.department}</TableCell>
                                                            <TableCell><Button variant="contained" onClick={() => updateTableRow(teacher.teacherID)}>Update</Button></TableCell>
                                                            <TableCell><Button variant="contained" color='error' onClick={() => deleteTeacher(teacher.teacherID)}>Delete</Button></TableCell>
                                                        </TableRow>
                                                    )) : null
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                : null
                        }
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Update Teacher Information
                                </Typography>
                                <hr></hr>
                                <Typography id="modal-modal-title" variant="h6" component="h3">
                                    Name: {selectedTeacher.firstName} {selectedTeacher.lastName}
                                    <br />
                                    Department: {selectedTeacher.department}
                                </Typography>


                                <form>
                                    <TextField id="standard-basic" label="First Name" name="fname" onChange={handleFirst} variant="standard" required />
                                    <TextField id="standard-basic" label="Last Name" variant="standard" onChange={handleLast} required />
                                    <TextField id="standard-basic" label="Department" variant="standard" onChange={handleDep} required />
                                    <Button type="submit" onClick={(e) => submit(e)}>Submit</Button>
                                </form>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export { Teachers };
