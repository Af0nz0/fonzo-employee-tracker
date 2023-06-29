const pool = require("./connection");

function getAllDepartments() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM department", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to retrieve all roles from  database
function getAllRoles() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM role", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM employee", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to add a new department to the database
function addDepartment(name) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO department (name) VALUES (?)",
      [name],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Function to add a new role to the database
function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, departmentId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

// Function to add a new employee to the database
function addEmployee(firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

function updateEmployeeRole(employeeId, roleId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
