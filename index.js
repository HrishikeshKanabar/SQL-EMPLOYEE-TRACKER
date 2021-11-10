// Dependencies 
const inq = require("inquirer");
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
        if(opt=='1.) View all the Departments'){
            helper.alldeps();
        }else if(opt=='2.) View all roles'){
            helper.allroles();
        }else if(opt=='3.) View all employees'){
            helper.allemployees();
        }else if(opt=='4.) Add a department'){
            helper.addDep()
        }else if(opt=='5.) Add a role'){
            helper.addRole();
        }else if(opt=='6.) Add an employee'){
            helper.addEmp();
        }else if(opt=='7.) Update an employee role'){
            helper.updateEmployeeRole();
        }else if(opt=='8.) Update employee managers'){
            helper.UpdateEmployeeMang()
        }else if(opt=='9.) View employees by manager'){
            helper.getEmpByMang()
        }else if(opt=='10.) View employees by department'){
            helper.getEmpByDep();
        }else if(opt=='11.) Delete a department'){
            helper.deleteDep();
        }else if(opt=='12.) Delete a role'){
            helper.deleteRole();
        }else if(opt=='13.) Delete a employee'){
            helper.deleteEmp();
        }else if(opt=='14.) View the total utilized budget of a department'){
            helper.getTotalBudget();
        }else{

        }

    });
}

appStartOptions();