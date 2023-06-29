
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- department table
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

--  role table
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

-- employee table
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);

INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
  ('Salesperson', 50000, 1),
  ('Sales Manager', 80000, 1),
  ('Software Engineer', 75000, 2),
  ('Senior Software Engineer', 90000, 2),
  ('Marketing Specialist', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 2),
  ('Emily', 'Davis', 4, 2),
  ('David', 'Anderson', 5, 3);



