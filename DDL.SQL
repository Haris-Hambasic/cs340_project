CREATE OR REPLACE TABLE Teachers (
        teacherID int not null auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        department varchar(255) not null,
        primary key (teacherID)
    );
CREATE OR REPLACE TABLE Courses (
        id int not null auto_increment,
        courseTitle varchar(255) not null,
        courseCapacity int not null,
        courseInstructor int not null,
        primary key (id)
        FOREIGN KEY (courseInstructor) REFERENCES Teachers(teacherID)
    );
CREATE OR REPLACE TABLE Buildings (
        buildingID int not null auto_increment,
        buildingName varchar(255) not null,
        capacity int not null,
        primary key (buildingID)
    );
CREATE OR REPLACE TABLE Organizations (
        organizationID int not null auto_increment,
        organizationName varchar(255) not null,
        totalStudents int not null,
        primary key (organizationID)
    );
CREATE OR REPLACE TABLE Students (
        studentID int not null auto_increment,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        studentMajor varchar(225) not null,
        primary key (studentID)
    );
-- DESCRIBE Teachers;
-- DESCRIBE Courses;
-- DESCRIBE Buildings;
-- DESCRIBE Organizations;
-- DESCRIBE Students;

-- Intersection Tables
-- *********************

-- Intersection Table --> Students:Teachers
CREATE OR REPLACE TABLE TeacherStudent (
    teacherStudentID int not null auto_increment,
    teacher int not null,
    student int not null,
    PRIMRY KEY (teacherStudentID),
    FOREIGN KEY (teacher) REFERENCES Teachers(teacherID),
    FOREIGN KEY (student) REFERENCES Students(studentID)
);

CREATE OR REPLACE TABLE TeachersCourses (
    teacherCourseID int not null auto_increment,
    teacher int not null,
    course int not null,
    FOREIGN KEY (teacher) REFERENCES Teachers(teacherID),
    FOREIGN KEY (course) REFERENCES Courses(id)
    PRIMARY KEY (teacherCourseID)
);

CREATE OR REPLACE TABLE CourseLocations (
    courseLocation int not null auto_increment,
    course int not null,
    building int not null,
    FOREIGN KEY (course) REFERENCES Courses(id),
    FOREIGN KEY (building) REFERENCES Buildings(buildingID),
    PRIMARY KEY (courseLocation)
);

CREATE OR REPLACE TABLE StudentOrganizationMembers (
    studentOrganizationMemberID into not null auto_increment,
    studentOrganization int not null,
    member int not null,
    FOREIGN KEY (studentOrganization) REFERENCES Organizations(organizationID),
    FOREIGN KEY (member) REFERENCES Students(studentID),
    PRIMARY KEY (studentOrganizationMemberID)
);

-- Sample Teacher Data
-- https://catalog.oregonstate.edu/faculty/
INSERT INTO Teachers (firstName, lastName, department)
VALUES ('Bahman', 'Abbasi', "Engineering");
INSERT INTO Teachers (firstName, lastName, department)
VALUES ('Scott', 'Akins', 'Sociology');
INSERT INTO Teachers (firstName, lastName, department)
VALUES ('Roberto', 'Albertani', 'Engineering');

-- Sample Course Data
-- https://classes.oregonstate.edu/
INSERT INTO Courses (courseTitle, courseCapacity, courseInstructor)
VALUES (
        'ENERGY GENERATION SYSTEMS',
        30,
        (
            select teacherID
            from Teachers
            where firstName = 'Bahman'
                and lastName = 'Abbasi'
        )
    );
INSERT INTO Courses (courseTitle, courseCapacity, courseInstructor)
VALUES (
        'INTRODUCTION TO CRIME AND JUSTICE',
        100,
        (
            select teacherID
            from Teachers
            where firstName = 'Scott'
                and lastName = 'Akins'
        )
    );
INSERT INTO Courses (courseTitle, courseCapacity, courseInstructor)
VALUES (
        'AEROSPACE APPLICATIONS IN MECHANICAL ENGINEERING',
        95,
        (
            select teacherID
            from Teachers
            where firstName = 'Roberto'
                and lastName = 'Albertani'
        )
    );

-- Building Sample Data
INSERT INTO Buildings(buildingName, capacity)
VALUES ('Reser Stadium', 50000);
INSERT INTO Buildings(buildingName, capacity)
VALUES ('Waldo Hall', 1000);
INSERT INTO Buildings(buildingName, capacity)
VALUES ('Benton Hall', 1500);

-- Organizations Sample Data
INSERT INTO Organizations (organizationName, totalStudents)
VALUES ('African Student Association', 500);
INSERT INTO Organizations (organizationName, totalStudents)
VALUES ('Hackathon Club, OSU', 150);
INSERT INTO Organizations (organizationName, totalStudents)
VALUES ('Oregon State Chess Club', 50);

-- Student Sample Data
-- https://www.behindthename.com/random/random.php?gender=both&number=2&sets=1&surname=&all=yes
INSERT INTO Students(firstName, lastName, studentMajor)
VALUES ('Chantrea', 'Allyson', 'Computer Science');
INSERT INTO Students(firstName, lastName, studentMajor)
VALUES ('Lulu', 'Arista', 'Engineering');
INSERT INTO Students(firstName, lastName, studentMajor)
VALUES ('Matteus', 'Sadiq', 'Sociology');
-- SELECT * from Teachers;
-- SELECT * from Courses;
-- SELECT * from Buildings;
-- SELECT * from Organizations;
-- SELECT * from Students;

-- TeacherStudent INTERSECTION TABLE
INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Bahman" and lastName="Abbasi"),
    (select studentID) from Students where firstName="Chantrea" and lastName="Allyson"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Bahman" and lastName="Abbasi"),
    (select studentID) from Students where firstName="Lulu" and lastName="Arista"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Bahman" and lastName="Abbasi"),
    (select studentID) from Students where firstName="Matteus" and lastName="Sadiq"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Scott" and lastName="Akins"),
    (select studentID) from Students where firstName="Chantrea" and lastName="Allyson"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Scott" and lastName="Akins"),
    (select studentID) from Students where firstName="Lulu" and lastName="Arista"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Scott" and lastName="Akins"),
    (select studentID) from Students where firstName="Matteus" and lastName="Sadiq"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Roberto" and lastName="Albertani"),
    (select studentID) from Students where firstName="Chantrea" and lastName="Allyson"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Roberto" and lastName="Albertani"),
    (select studentID) from Students where firstName="Lulu" and lastName="Arista"),
);

INSERT INTO TeacherStudent(teacher, student)
VALUES (
    (select teacherID from Teachers where firstName="Roberto" and lastName="Albertani"),
    (select studentID) from Students where firstName="Matteus" and lastName="Sadiq"),
);

-- TeachersCourses INTERSECTION TABLE
INSERT INTO TeachersCourses(teacher, course)
VALUES (
    (select teacherID from Teachers where firstName="Bahman" and lastName="Abbasi"),
    (select courseTitle) from Courses where courseInstructor=(select teacherID from Teachers where firstName="Bahman" and lastName="Abbasi"),
);

INSERT INTO TeachersCourses(teacher, course)
VALUES (
    (select teacherID from Teachers where firstName="Scott" and lastName="Akins"),
    (select courseTitle) from Courses where courseInstructor=(select teacherID from Teachers where firstName="Scott" and lastName="Akins"),
);

INSERT INTO TeachersCourses(teacher, course)
VALUES (
    (select teacherID from Teachers where firstName="Matteus" and lastName="Sadiq"),
    (select courseTitle) from Courses where courseInstructor=(select teacherID from Teachers where firstName="Matteus" and lastName="Sadiq")),
);

