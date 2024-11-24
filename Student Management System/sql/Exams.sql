-- Exams Table
CREATE TABLE Exams (
    ExamID INT PRIMARY KEY AUTO_INCREMENT,
    CourseID INT NOT NULL,
    ExamDate DATE NOT NULL,
    TotalMarks INT NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);