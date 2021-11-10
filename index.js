// Dependencies 
const inq = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
const helper = require("./helper/helper");

// Options asked at start of app

function appStartOptions(){
    inq.prompt([
        {
            type: 'list',
            name: 'initOptions',
            message: 'What would you like to do?',
            choices: [
              '1.) View all the Departments',
              '2.) View all roles',
              '3.) View all employees',
              '4.) Add a department',
              '5.) Add a role',
              '6.) Add an employee',
              '7.) Update an employee role',
              '8.) Update employee managers',
              '9.) View employees by manager',
              '10.) View employees by department',
              '11.) Delete a department', 
              '12.) Delete a role',
              '13.) Delete a employee',
              '14.) View the total utilized budget of a department',
              '15.) Exit'
            ]
        }

    ]).then(opt=>{

        console.log(opt);

    });
}

appStartOptions();