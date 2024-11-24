-- Classes Table
CREATE TABLE Classes (
    ClassID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT NOT NULL,
    FacultyID INT NOT NULL,
    Schedule VARCHAR(100),
    Location VARCHAR(100),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID),
    FOREIGN KEY (FacultyID) REFERENCES Faculty(FacultyID)
);