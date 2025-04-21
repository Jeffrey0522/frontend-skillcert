CREATE TABLE Users (
    Id INT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Wallet VARCHAR(255)
);

CREATE TABLE Institution (
    Id BIGINT PRIMARY KEY,
    Title VARBINARY(MAX)
);

CREATE TABLE Course (
    Id BIGINT PRIMARY KEY,
    Title VARBINARY(MAX),
    Description VARBINARY(MAX),
    InstitutionAddress VARCHAR(255),
    Price BIGINT,
    CreatedAt BIGINT,
    Metadata VARBINARY(MAX)
);

CREATE TABLE Enrollment (
    StudentAddress VARCHAR(255),
    CourseId BIGINT,
    EnrolledAt BIGINT,
    Completed BIT,
    PRIMARY KEY (StudentAddress, CourseId),
    FOREIGN KEY (CourseId) REFERENCES Course(Id)
);

CREATE TABLE Module (
    Id BIGINT PRIMARY KEY,
    CourseId BIGINT,
    Name VARBINARY(MAX),
    Position INT,
    Description VARBINARY(MAX),
    FOREIGN KEY (CourseId) REFERENCES Course(Id)
);

CREATE TABLE Lesson (
    Id BIGINT PRIMARY KEY,
    ModuleId BIGINT,
    Name VARBINARY(MAX),
    Type VARCHAR(50),
    Content VARBINARY(MAX),
    EstimatedTime VARBINARY(MAX),
    Position INT,
    FOREIGN KEY (ModuleId) REFERENCES Module(Id)
);

CREATE TABLE Certificate (
    Id BIGINT PRIMARY KEY,
    CourseId BIGINT,
    StudentAddress VARCHAR(255),
    InstitutionAddress VARCHAR(255),
    Status BIT,
    Metadata VARBINARY(MAX),
    IssuedAt DATETIME,
    FOREIGN KEY (CourseId) REFERENCES Course(Id)
);

CREATE TABLE SupportTicket (
    Id INT PRIMARY KEY,
    UserId INT,
    Category VARCHAR(255),
    Subject VARCHAR(255),
    Description TEXT,
    Status VARCHAR(50),
    AdminId INT NULL,
    CreatedAt BIGINT,
    UpdatedAt BIGINT,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Question (
    Id BIGINT PRIMARY KEY,
    LessonId BIGINT,
    Text VARBINARY(MAX),
    Type VARCHAR(50),
    Position INT,
    FOREIGN KEY (LessonId) REFERENCES Lesson(Id)
);

CREATE TABLE VideoLesson (
    LessonId BIGINT PRIMARY KEY,
    VideoURL VARBINARY(MAX),
    FOREIGN KEY (LessonId) REFERENCES Lesson(Id)
);

CREATE TABLE AnswerOption (
    Id BIGINT PRIMARY KEY,
    QuestionId BIGINT,
    Text VARBINARY(MAX),
    Correct BIT,
    FOREIGN KEY (QuestionId) REFERENCES Question(Id)
);

CREATE TABLE UserAnswer (
    Id BIGINT PRIMARY KEY,
    UserId INT,
    QuestionId BIGINT,
    AnswerId BIGINT,
    CreatedAt BIGINT,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (QuestionId) REFERENCES Question(Id),
    FOREIGN KEY (AnswerId) REFERENCES AnswerOption(Id)
);

CREATE TABLE CourseProgress (
    Id INT PRIMARY KEY,
    UserId INT,
    CourseId BIGINT, -- 🔥 cambiado a BIGINT
    Progress INT,
    Completed BIT,
    LastAccessAt BIGINT,
    CreatedAt BIGINT,
    UpdatedAt BIGINT,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (CourseId) REFERENCES Course(Id)
);

CREATE TABLE ModuleProgress (
    Id INT PRIMARY KEY,
    UserId INT,
    ModuleId BIGINT,
    Progress INT,
    Completed BIT,
    LastAccessAt BIGINT,
    CreatedAt BIGINT,
    UpdatedAt BIGINT,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ModuleId) REFERENCES Module(Id)
);

CREATE TABLE LessonProgress (
    Id INT PRIMARY KEY,
    UserId INT,
    LessonId BIGINT,
    Progress INT,
    Completed BIT,
    LastAccessAt BIGINT,
    CreatedAt BIGINT,
    UpdatedAt BIGINT,
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (LessonId) REFERENCES Lesson(Id)
);
