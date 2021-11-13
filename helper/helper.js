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
       conn.db.query('SELECT id,first_name,last_name from employee;', function (err, resEmp) { 
           var resE=[];
           for(let fname in resEmp){
            resE.push(resEmp[fname].first_name+" "+resEmp[fname].last_name);
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
            mangfname=val.manager.substr(0,val.manager.indexOf(' '));
            let empId=getEmpIdByFirstName(resEmp,mangfname);
            conn.db.query('INSERT INTO employee SET first_name=?,last_name=?,role_id=?,manager_id=?',[val.fname,val.lname,roleId,empId], function (err, results) {
                console.log("ADDED EMPLOYEE TO DATABASE , INSERTED RECORD ID IS :" + results.insertId);
              });
            
        });
    
      });
    });
    
}

function updateEmployeeRole(){
    conn.db.query('SELECT id,title from role;', function (err, results) { 
        var res=[];
        for(let tit in results){
            res.push(results[tit].title);
        }
        conn.db.query('SELECT id,first_name,last_name from employee;', function (err, resEmp) { 
            var resE=[];
            for(let fname in resEmp){
             resE.push(resEmp[fname].first_name+" "+resEmp[fname].last_name);
         }
         inq.prompt([
            {
                type: 'list',
                name: "emp",
                message:"Choose employee you want to update: ",
                choices: resE,
            },{
                type: 'list',
                name: "role",
                message:"Choose new role for emloyee: ",
                choices: res,
            }
        ]).then(val=>{
           
            let roleId=getRoleIdByTitle(results,val.role);
            mangfname=val.emp.substr(0,val.emp.indexOf(' '));
            let empId=getEmpIdByFirstName(resEmp,mangfname);
            conn.db.query('UPDATE employee SET role_id=? WHERE id=?',[roleId,empId], function (err, results) {
                console.log("UPDATED ROLE OF EMPLOYEE IN DATABASE");
              });
            
        });


        });
     });

}

function UpdateEmployeeMang(){

    conn.db.query('SELECT id,first_name,last_name from employee;', function (err, resEmp) { 
        var resE=[];
        for(let fname in resEmp){
         resE.push(resEmp[fname].first_name+" "+resEmp[fname].last_name);
     }
     conn.db.query('SELECT id,first_name,last_name from employee;', function (err, resEmpMan) { 
        var resEm=[];
        for(let fname in resEmpMan){
         resEm.push(resEmpMan[fname].first_name+" "+resEmpMan[fname].last_name);
        }
     inq.prompt([
        {
            type: 'list',
            name: "emp",
            message:"Choose employee you want to update: ",
            choices: resE,
        },{
            type: 'list',
            name: "mangEmp",
            message:"Choose new manager for emloyee: ",
            choices: resEm,
        }
    ]).then(val=>{
        let empfname=val.emp.substr(0,val.emp.indexOf(' '));
        let empId=getEmpIdByFirstName(resEmp,empfname);
        let mangfname=val.mangEmp.substr(0,val.mangEmp.indexOf(' '));
        let empMangId=getEmpIdByFirstName(resEmpMan,mangfname);
        conn.db.query('UPDATE employee SET manager_id=? WHERE id=?',[empMangId,empId], function (err, results) {
            console.log("UPDATED MANAGER OF EMPLOYEE IN DATABASE");
          });
        
    });
    });
    });

}

function getEmpByMang(){
    conn.db.query('SELECT id,first_name,last_name from employee;', function (err, resEmp) { 
        var resE=[];
        for(let fname in resEmp){
         resE.push(resEmp[fname].first_name+" "+resEmp[fname].last_name);
        }
        inq.prompt([
            {
                type: 'list',
                name: "emp",
                message:"Choose manager to get their employee: ",
                choices: resE,
            }
        ]).then(val=>{
            let empfname=val.emp.substr(0,val.emp.indexOf(' '));
            let empId=getEmpIdByFirstName(resEmp,empfname);
            conn.db.query('select id,first_name,last_name,manager_id from employee WHERE manager_id=?',[empId], function (err, rem) {
                console.log("EMPLOYEES FOR MANAGER ARE AS FOLLOW: ");
                console.table(rem);
              });
        });
    });
}

function getEmpByDep(){
  
 conn.db.query('SELECT id,department_id from role;', function (err, resRol) { 
            var resR=[];
            for(let rol in resRol){
                resR.push(resRol[rol].department_id);
            }
    conn.db.query('SELECT id,name from department;', function (err, resDep) { 
        var resD=[];
        for(let fname in resDep){
            resD.push(resDep[fname].name);
        }
        inq.prompt([
            {
                type: 'list',
                name: "dep",
                message:"Choose department to get their employee: ",
                choices: resD,
            }
        ]).then(val=>{
            let depId=getIdByDepartment(resDep,val.dep)
            //console.log(depId);
            let roleIds= getRoleByDepartment(resRol,depId);
           // console.log(roleIds);
            conn.db.query('select id,first_name,last_name,role_id from employee WHERE role_id in (?)',[roleIds], function (err, rem) {
                console.log("EMPLOYEES IN DEPARTMENT " +val.dep+" ARE AS FOLLOW: ");
                console.table(rem);
              });
            
    });
 });
});
}

function deleteDep(){
    conn.db.query('SELECT id,name from department;', function (err, resDep) { 
        var resD=[];
        for(let fname in resDep){
            resD.push(resDep[fname].name);
        }
        inq.prompt([
            {
                type: 'list',
                name: "dep",
                message:"Choose department to delete: ",
                choices: resD,
            }
        ]).then(val=>{
            let depId= getIdByDepartment(resDep,val.dep);
            conn.db.query('Delete from department where id = ? ',depId, function (err, rem) {
                console.log("Department deleted is : "+depId+" "+val.dep);
              });

        });
    });
}

function deleteRole(){
    conn.db.query('SELECT id,title from role;', function (err, resRol) { 
        var resR=[];
        for(let rol in resRol){
            resR.push(resRol[rol].title);
        }
        inq.prompt([
            {
                type: 'list',
                name: "role",
                message:"Choose role to delete: ",
                choices: resR,
            }
        ]).then(val=>{
            let roleId = getRoleIdByTitle(resRol,val.role);
            console.log(roleId);
            conn.db.query('Delete from role where id = ? ',roleId, function (err, rem) {
                console.log("Role deleted is : "+roleId+" "+val.role);
              });

        });
    });

}

function deleteEmp(){

    conn.db.query('SELECT id,first_name,last_name from employee;', function (err, resEmp) { 
        var resE=[];
        for(let fname in resEmp){
         resE.push(resEmp[fname].first_name+" "+resEmp[fname].last_name);
        }
        inq.prompt([
            {
                type: 'list',
                name: "emp",
                message:"Choose manager to get their employee: ",
                choices: resE,
            }
        ]).then(val=>{
            let fname = val.emp.substr(0,val.emp.indexOf(' '));
            let empId=getEmpIdByFirstName(resEmp,fname);
            conn.db.query('Delete from employee where id = ? ', empId, function (err, rem) {
                console.log("Employee deleted is : "+empId+" "+val.emp);
              });
        });
    });
}

function getTotalBudget(){

   
conn.db.query('SELECT id,name from department;', function (err, resDep) { 
    var resD=[];
    for(let fname in resDep){
        resD.push(resDep[fname].name);
    }
    inq.prompt([
        {
            type: 'list',
            name: "dep",
            message:"Choose department to get budget ",
            choices: resD,
        }
    ]).then(val=>{
       let depId=getIdByDepartment(resDep,val.dep);
       //console.log(depId);
       conn.db.query('SELECT employee_database.employee.first_name,employee_database.employee.last_name,department_id,role_id,salary FROM  employee_database.role INNER JOIN employee_database.employee on employee_database.employee.role_id=employee_database.role.id where department_id=?', depId, function (err, rem) {
      console.table(rem);
      }); 
      conn.db.query('SELECT sum(salary) FROM  employee_database.role INNER JOIN employee_database.employee on employee_database.employee.role_id=employee_database.role.id where department_id=?', depId, function (err, sum) {
        console.log("TOTAL BUDGET OF DEPARTMENT IS : "+  JSON.stringify(sum[0]['sum(salary)']));
        }); 

    });
});
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

function getRoleByDepartment(res,iden){
var id =[];
    
for(let re in res){
        if(res[re].department_id==iden){
            id.push(res[re].id);
        }
    }
 return id;

}


module.exports = {alldeps,allroles,allemployees,addDep,addRole,addEmp,
                     updateEmployeeRole,UpdateEmployeeMang,getEmpByMang,
                     getEmpByDep,deleteDep,deleteRole,deleteEmp,getTotalBudget};