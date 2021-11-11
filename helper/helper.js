// Dependencies
const conn = require("../database/connection");
const inq = require("inquirer");

// To get all departments 
function alldeps(){
    conn.db.query('SELECT * FROM department', function (err, results) {
        console.table(results)
        
      });
}

// To get all roles
function allroles(){
    conn.db.query('SELECT * FROM role', function (err, results) {
        console.table(results)
        
      });
}

// To get all employees
function allemployees(){
    conn.db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
      });
}

// To get add department
function addDep(){
    inq.prompt([
        {
            name: "name",
            message: "Enter the name of the department (Help: Only Alphabets): ",
        }
    ]).then(val=>{
        conn.db.query('INSERT INTO department SET name=?',val.name, function (err, results) {
            console.log("ADDED DEPARMENT TO DATABASE , INSERTED RECORD ID IS :" +results.insertId);
          });
    });
    
    
}

// To get add role
function addRole(){
    conn.db.query('SELECT id,name from department;', function (err, results) {
        //console.log(results);
        inq.prompt([
            {
                name: "name",
                message: "Enter the name of the role (Help: Only Alphabets):",
            },
            {
                name: "salary",
                message: "Enter the salary (Help: Numbers only):",
            },
            {
                type: 'list',
                name: "dep",
                message:"Choose department for the role:",
                choices: results,
            },
        ]).then(val=>{
            //console.log(val.dep);
            let id = getIdByDepartment(results,val.dep);
            conn.db.query('INSERT INTO role SET title=?,salary=?,department_id=?',[val.name,val.salary,id], function (err, results) {
                console.log("ADDED ROLE TO DATABASE , INSERTED RECORD ID IS :" + results.insertId);
              });
        });
      });
    
}

// To get add employee
function addEmp(){

    conn.db.query('SELECT id,name from role', function (err, results) {
         console.log(results);
        conn.db.query('SELECT id,name from employee', function (err, Empres) {
            console.log(Empres);
        inq.prompt([
            {
                name: "fname",
                message: "Enter the first name of employee: (Help: Only Alphabets):",
            },
            {
                name: "lname",
                message: "Enter the last name of employee (Help: Numbers only):",
            },
            {
                type: 'list',
                name: "role",
                message:"Choose role for the employee:",
                choices: results,
            },
            {
                type: 'list',
                name: "dep",
                message:"Assign manager for the employee:",
                choices: Empres,
            }
        ]).then(val=>{
            console.log(val);
           
            /*conn.db.query('INSERT INTO role SET title=?,salary=?,department_id=?',[val.name,val.salary,id], function (err, results) {
                console.log("ADDED ROLE TO DATABASE , INSERTED RECORD ID IS :" + results.insertId);
              });*/
        });
      });
    });

}

function updateEmployeeRole(){

}

function UpdateEmployeeMang(){

}

function getEmpByMang(){

}

function getEmpByDep(){

}

function deleteDep(){

}

function deleteRole(){

}

function deleteEmp(){

}

function getTotalBudget(){

}

function getIdByDepartment(res,depName){
    var id;
    for(let re in res){
        if(res[re].name==depName){
            id=res[re].id;
        }
    }

    return id;
    
}

module.exports = {alldeps,allroles,allemployees,addDep,addRole,addEmp,
                     updateEmployeeRole,UpdateEmployeeMang,getEmpByMang,
                     getEmpByDep,deleteDep,deleteRole,deleteEmp,getTotalBudget};