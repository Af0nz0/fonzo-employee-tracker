const inquirer = require("inquirer");
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./queries");

// Function to display main menu and handle user choices
function displayMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menuChoice) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          promptAddDepartment();
          break;
        case "Add a role":
          promptAddRole();
          break;
        case "Add an employee":
          promptAddEmployee();
          break;
        case "Update an employee role":
          promptUpdateEmployeeRole();
          break;
        case "Exit":
          exitApp();
          break;
        default:
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  getAllDepartments()
    .then((results) => {
      console.table(results);
      displayMenu();
    })
    .catch((error) => {
      console.error("Error retrieving departments:", error);
      displayMenu();
    });
}

// Function to view all roles
function viewAllRoles() {
  getAllRoles()
    .then((results) => {
      console.table(results);
      displayMenu();
    })
    .catch((error) => {
      console.error("Error retrieving roles:", error);
      displayMenu();
    });
}

// Function to view all employees
function viewAllEmployees() {
  getAllEmployees()
    .then((results) => {
      console.table(results);
      displayMenu();
    })
    .catch((error) => {
      console.error("Error retrieving employees:", error);
      displayMenu();
    });
}

// Function to prompt user for department details and add a department
function promptAddDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
        validate: (value) => {
          if (value) {
            return true;
          } else {
            return "Please enter a department name.";
          }
        },
      },
    ])
    .then((answers) => {
      addDepartment(answers.name)
        .then(() => {
          console.log("Department added successfully!");
          displayMenu();
        })
        .catch((error) => {
          console.error("Error adding department:", error);
          displayMenu();
        });
    });
}

// Function to prompt user for role details and add a role
function promptAddRole() {
  // Retrieve departments to display as choices in prompt
  getAllDepartments()
    .then((departments) => {
      const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Enter the title of the role:",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                return "Please enter a role title.";
              }
            },
          },
          {
            type: "input",
            name: "salary",
            message: "Enter the salary for the role:",
            validate: (value) => {
              if (value && !isNaN(value)) {
                return true;
              } else {
                return "Please enter a valid salary.";
              }
            },
          },
          {
            type: "list",
            name: "departmentId",
            message: "Select the department for the role:",
            choices: departmentChoices,
          },
        ])
        .then((answers) => {
          addRole(answers.title, answers.salary, answers.departmentId)
            .then(() => {
              console.log("Role added successfully!");
              displayMenu();
            })
            .catch((error) => {
              console.error("Error adding role:", error);
              displayMenu();
            });
        });
    })
    .catch((error) => {
      console.error("Error retrieving departments:", error);
      displayMenu();
    });
}

function promptAddEmployee() {
  // Retrieve roles to display as choices in the prompt
  getAllRoles()
    .then((roles) => {
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "Enter the first name of the employee:",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                return "Please enter a first name.";
              }
            },
          },
          {
            type: "input",
            name: "lastName",
            message: "Enter the last name of the employee:",
            validate: (value) => {
              if (value) {
                return true;
              } else {
                return "Please enter a last name.";
              }
            },
          },
          {
            type: "list",
            name: "roleId",
            message: "Select the role for the employee:",
            choices: roleChoices,
          },
          {
            type: "input",
            name: "managerId",
            message:
              "Enter the ID of the employee's manager (leave empty if none):",
            default: null,
            validate: (value) => {
              if (value === "" || !isNaN(value)) {
                return true;
              } else {
                return "Please enter a valid manager ID.";
              }
            },
          },
        ])
        .then((answers) => {
          addEmployee(
            answers.firstName,
            answers.lastName,
            answers.roleId,
            answers.managerId
          )
            .then(() => {
              console.log("Employee added successfully!");
              displayMenu();
            })
            .catch((error) => {
              console.error("Error adding employee:", error);
              displayMenu();
            });
        });
    })
    .catch((error) => {
      console.error("Error retrieving roles:", error);
      displayMenu();
    });
}

function promptUpdateEmployeeRole() {
  // Retrieve employees to display as choices in the prompt
  getAllEmployees()
    .then((employees) => {
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      // Retrieve roles to display as choices in the prompt
      getAllRoles()
        .then((roles) => {
          const roleChoices = roles.map((role) => ({
            name: role.title,
            value: role.id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Select the employee to update:",
                choices: employeeChoices,
              },
              {
                type: "list",
                name: "roleId",
                message: "Select the new role for the employee:",
                choices: roleChoices,
              },
            ])
            .then((answers) => {
              updateEmployeeRole(answers.employeeId, answers.roleId)
                .then(() => {
                  console.log("Employee role updated successfully!");
                  displayMenu();
                })
                .catch((error) => {
                  console.error("Error updating employee role:", error);
                  displayMenu();
                });
            });
        })
        .catch((error) => {
          console.error("Error retrieving roles:", error);
          displayMenu();
        });
    })
    .catch((error) => {
      console.error("Error retrieving employees:", error);
      displayMenu();
    });
}

// Function to exit the application
function exitApp() {
  console.log("Goodbye!");
  process.exit(0);
}

// Start the application by displaying the main menu
displayMenu();
