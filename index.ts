#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let todoList: string [] = [];
let conditions = true;

// Print welcome message
console.log(chalk.bold.rgb(204, 204, 204)(`\n \t\t <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t\t${chalk.bold.hex('#9999FF')('Welcome to Todo-List App')}`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t\t <<<================================>>>\n`));

let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message:chalk.cyanBright.bold("Select an Option You Want to Do:\n"),
                choices:["Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"]}
        ]);
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await deleteTask()
        }
        else if (option.choice === "Update Task"){
            await updateTask()
        }
        else if(option.choice === "View Todo-List"){
            await viewTask()
        }
        else if(option.choice === "Exit"){
            conditions = false;
        }
    }
}

// Function to add new task to the list
let addTask = async() => {
    let newTask = await inquirer.prompt ([
        {
            name:"Task",
            type:"input",
            message:chalk.yellow("Enter Your New Task:"),
        }
    ]);
    todoList.push(newTask.Task);
    console.log(chalk.green(`\n ${newTask.Task} task added succesfully in Todo-List\n`));

}

// Function to view all To-Do list tasks
let viewTask = () => {
    console.log(chalk.magentaBright("\n Your Todo-List: \n\n"));
    todoList.forEach((task, index) => {
        console.log(`${index + 1} : ${task}`)
    });
    console.log("\n");

}

// Function to delete a task from list
let deleteTask = async () => {
    await viewTask() 
    let taskIndex = await inquirer.prompt([
        {
            name:"index",
            type:"number",
            message:chalk.red("Enter the 'index.no' of the task you want to delete:\n"),
        }
    ]);

let deletedTask = todoList.splice(taskIndex.index -1, 1);
console.log(chalk.redBright(`\n ${deletedTask} This task has been deleted successfully from your Todo-List\n`));

}
// Function to update a task
let updateTask = async () => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name:"index",
            type:"number",
            message:chalk.yellow("Enter the index no. of the task you want to update:")
        },
        {
            name:"new_task",
            type:"input",
            message:chalk.blueBright("\nNow Enter the New Task Name:\n")
        }
    ]);
    todoList[update_task_index.index-1] = update_task_index.new_task
    console.log(chalk.greenBright(`\n Task at index no. ${update_task_index.index-1} updated successfully [For updated list Check Option: "View Todo-List"]\n`));
}

main();
