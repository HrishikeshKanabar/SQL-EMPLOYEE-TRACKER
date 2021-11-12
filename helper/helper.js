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
            }
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
    conn.db.query('SELECT id,title from role;', function (err, results) {
        //console.log(results);
        var res=[];
        for(let tit in results){
            res.push(results[tit].title);
        }
       conn.db.query('SELECT id,first_name from employee;', function (err, resEmp) { 
           var resE=[];
           for(let fname in resEmp){
            resE.push(resEmp[fname].first_name);
        }
        //console.log(resDep);  
        inq.prompt([
            {
                name: "fname",
                message: "Enter the first name of an employee:",
            },
            {
                name: "lname",
                message: "Enter the last name of an employee:",
            },
            {
                type: 'list',
                name: "role",
                message:"Choose role for an Employee:",
                choices: res,
            },{
                type: 'list',
                name: "manager",
                message:"Choose manager for an Employee:",
                choices: resE,
            }
        ]).then(val=>{
           
            let roleId=getRoleIdByTitle(results,val.role);
            let empId=getEmpIdByFirstName(resEmp,val.manager);
            conn.db.query('INSERT INTO employee SET first_name=?,last_name=?,role_id=?,manager_id=?',[val.fname,val.lname,roleId,empId], function (err, results) {
                console.log("ADDED EMPLOYEE TO DATABASE , INSERTED RECORD ID IS :" + results.insertId);
              });
            
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

function getRoleIdByTitle(res,title){
    var id;

    for(let re in res){
        if(res[re].title==title){
            id=res[re].id;
        }
    }

    return id;
}

function getEmpIdByFirstName(res,fname){
    var id;

    for(let re in res){
        if(res[re].first_name==fname){
            id=res[re].id;
        }
    }

    return id;
}



module.exports = {alldeps,allroles,allemployees,addDep,addRole,addEmp,
                     updateEmployeeRole,UpdateEmployeeMang,getEmpByMang,
                     getEmpByDep,deleteDep,deleteRole,deleteEmp,getTotalBudget};