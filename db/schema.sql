CREATE DATABASE taskManagerDB;
USE taskManagerDB;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'User') DEFAULT 'User'
);
CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    assigned_to INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    due_date DATE,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(user_id) ON DELETE SET NULL
);


INSERT INTO users (name, email, password, role)
VALUES 
('John Doe', 'john@example.com', 'hashed_password1', 'Admin'),
('Jane Smith', 'jane@example.com', 'hashed_password2', 'User'),
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password3', 'User'),
('Bob Brown', 'bob.brown@example.com', 'hashed_password4', 'Admin'),
('Charlie Davis', 'charlie.davis@example.com', 'hashed_password5', 'User'),
('Diana Evans', 'diana.evans@example.com', 'hashed_password6', 'User'),
('Eve Foster', 'eve.foster@example.com', 'hashed_password7', 'Admin'),
('Frank Green', 'frank.green@example.com', 'hashed_password8', 'User'),
('Grace Hill', 'grace.hill@example.com', 'hashed_password9', 'Admin'),
('Hank Ives', 'hank.ives@example.com', 'hashed_password10', 'User');

-- Insert 8 projects into the `projects` table
INSERT INTO projects (name, description)
VALUES 
('Project Alpha', 'First Project Description'),
('Project Beta', 'Second Project Description'),
('Project Gamma', 'Third Project Description'),
('Project Delta', 'Fourth Project Description'),
('Project Epsilon', 'Fifth Project Description'),
('Project Zeta', 'Sixth Project Description'),
('Project Eta', 'Seventh Project Description'),
('Project Theta', 'Eighth Project Description');

INSERT INTO tasks (project_id, assigned_to, title, description, status, due_date)
VALUES 
(1, 1, 'Task 1', 'Complete initial setup', 'Pending', '2025-01-10'),
(1, 2, 'Task 2', 'Draft project plan', 'In Progress', '2025-01-12'),
(1, 3, 'Task 3', 'Finalize project requirements', 'Completed', '2025-01-15'),
(2, 4, 'Task 4', 'Set up project repository', 'Pending', '2025-01-18'),
(2, 5, 'Task 5', 'Conduct team meeting', 'Pending', '2025-01-20'),
(2, 6, 'Task 6', 'Design database schema', 'In Progress', '2025-01-22'),
(3, 7, 'Task 7', 'Create API endpoints', 'In Progress', '2025-01-25'),
(3, 8, 'Task 8', 'Write unit tests', 'Pending', '2025-01-28'),
(3, 9, 'Task 9', 'Deploy to staging environment', 'Completed', '2025-01-30'),
(4, 10, 'Task 10', 'Prepare documentation', 'Pending', '2025-02-02'),
(4, 1, 'Task 11', 'Set up CI/CD pipeline', 'Pending', '2025-02-05'),
(4, 2, 'Task 12', 'Fix reported bugs', 'In Progress', '2025-02-08'),
(5, 3, 'Task 13', 'Optimize database queries', 'Pending', '2025-02-10'),
(5, 4, 'Task 14', 'Update API documentation', 'In Progress', '2025-02-12'),
(5, 5, 'Task 15', 'Review pull requests', 'Completed', '2025-02-15'),
(6, 6, 'Task 16', 'Conduct sprint retrospective', 'Pending', '2025-02-18'),
(6, 7, 'Task 17', 'Update project roadmap', 'In Progress', '2025-02-20'),
(6, 8, 'Task 18', 'Implement caching strategy', 'Pending', '2025-02-25'),
(7, 9, 'Task 19', 'Research new technologies', 'Pending', '2025-02-28'),
(7, 10, 'Task 20', 'Analyze system performance', 'In Progress', '2025-03-02'),
(7, 1, 'Task 21', 'Integrate payment gateway', 'Pending', '2025-03-05'),
(8, 2, 'Task 22', 'Improve frontend design', 'Completed', '2025-03-08'),
(8, 3, 'Task 23', 'Conduct user testing', 'In Progress', '2025-03-10'),
(8, 4, 'Task 24', 'Prepare final release', 'Pending', '2025-03-12'),
(8, 5, 'Task 25', 'Launch the product', 'Pending', '2025-03-15');


ALTER TABLE users ADD INDEX idx_email (email);
ALTER TABLE projects ADD INDEX idx_status (status);
ALTER TABLE tasks ADD INDEX idx_project_id (project_id);
ALTER TABLE tasks ADD INDEX idx_assigned_to (assigned_to);
ALTER TABLE tasks ADD INDEX idx_due_date (due_date);


-- SHOW INDEX FROM users;
-- SHOW INDEX FROM projects;
-- SHOW INDEX FROM tasks;



