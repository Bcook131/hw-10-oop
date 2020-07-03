const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
const initial = ()=> {
    inquirer.prompt([
        {
          type: "input",
          message: "What is manager's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is manager's Id number?",
          name: "id",
        },
        {
          type: "input",
          message: "What is manager's email?",
          name: "email",
        },
        {
          type: "input",
          message: "What is manager's office number?",
          name: "officeNumber",
        },
      ])
      .then((res) => {
        const newManager = new Manager(res.name,res.id,res.email,res.officeNumber);
        employees.push(newManager);
        addMore()
    
      });
}
const empQuestions = ()=>{
    inquirer
  .prompt({

    type: "list",
    message: "What type of employee would you like to use?",
    choices: ["Engineer", "Intern"],
    name: "role",
  })
  .then((answers) => {
    if(answers.role === "Engineer") {
    {
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is engineer's name?",
            name: "name",
          },
          {
            type: "input",
            message: "What is engineer's id number?",
            name: "id",
          },
          {
            type: "input",
            message: "What is engineer's email?",
            name: "email",
          },
          {
            type: "input",
            message: "What is engineer's github username?",
            name: "github",
          },
        ])
        .then((res) => {
          const newEngineer = new Engineer(res.name,res.id,res.email,res.github);
          employees.push(newEngineer);
          addMore();
        });
    }
  } else if(answers.role === "Intern"){
    {
        inquirer.prompt([
         {
             type: "input",
             message: "What is intern's name?",
             name: "name",
         },
         {
             type: "input",
             message: "What is intern's Id number?",
             name: "id",
         },
         {
             type: "input",
             message: "What is intern's email?",
             name: "email",
         },
         {
             type: "input",
             message: "What is your intern's school?",
             name: "school",
         }
        ]    
        ).then(res=>{
            const newIntern = new Intern(res.name, res.id, res.email, res.school)
            employees.push(newIntern);
            addMore();
        })
    }}
  });

}
const addMore = ()=>{
    inquirer.prompt({
        type: "confirm",
        message: "Add more employees??",
        name: "addMore",
        default: true
    }).then((answer)=>{
        if(answer.addMore === true){
            empQuestions()
        }else{
            console.log("Your results will be located in the output folder.")
            const renderedTeam= render(employees)
            fs.writeFile(outputPath,renderedTeam,function(err){
                if(err) throw err
            } )

        }
    })
}


initial()
