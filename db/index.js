const connection = require('./connection');
const inquirer = require('inquirer')
class DB{
    // keeping a reference to the connection on the class
    constructor(connection){
        this.connection=connection;
    };
    // view all department from department table
    viewAllDepartment(){
        return this.connection.promise().query(
            `SELECT id, name FROM department`
        );
    }
    // view all roles from role table
    viewAllRole(){
        return this.connection.promise().query(
            `SELECT * FROM role`
        )
    }
    //view all employees from employee table
    viewAllEmployee(){
        return this.connection.promise().query(
            `SELECT * FROM employee`
        )
    }

    viewAllEmployeeWithRole(){
        return this.connection.promise().query(
            `SELECT * FROM employee_role`
        )
    }

    viewEmployeeByRole (answer){
        return this.connection.promise().query(
            `SELECT * FROM employee WHERE role_id =?`,
            answer.role  
        )
    };
    viewEmployeeByDepartment(answer){
        return this.connection.promise().query(
            `SELECT * FROM employee_department WHERE department_id =?`,
            answer.department_id 
        )
    };
updateRole(answer){
    return this.connection.promise().query(
        "UPDATE employee SET ? WHERE ?",
                [
                    {
                   role_id: answer.title,
                    },
                    {
                        last_name: answer.last_name,
                    }
                ]
    )
}
    addDepartment(answer){
        return this.connection.promise().query(
        "INSERT INTO department SET ?",
            {
                name: answer.department
            }
        )
            
    }
    addRole(answer){
        return this.connection.promise().query( "INSERT INTO role SET ?",
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department
        }
       )
    }
    addEmployee(answer){
        return this.connection.promise().query( "INSERT INTO employee SET ?",
        {
            first_name: answer.first_name,
            last_name:answer.last_name,
            role_id: answer.role,
            manager_id:answer.manager_id
        }
       )
    }
    deleteARole(answer){
        return this.connection.promise().query(
            `DELETE FROM role WHERE id =?`,
            answer.role
        );
    }

    deleteAnEmployee(answer){
        return this.connection.promise().query(
            `DELETE FROM employee WHERE id =?`,
            answer.last_name
        );
    }
    deleteADepartment(answer){
        return this.connection.promise().query(
            `DELETE FROM department WHERE id =?`,
            answer.name
        );
    }
    end(){
        this.connection.end()
    }
}
module.exports = new DB(connection);