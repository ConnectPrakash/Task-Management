const express =require("express");
const { default: mongoose } = require("mongoose");
const { TaskController, AllTaskController, OneTaskController, DeleteTaskController, EditTaskController } = require("./controller/Task");
const { UserController, AllUserController, OneUserController, DeleteUserController, EditUserController, UserLoginController } = require("./controller/User");
const { CompanyController, GetCompanyController, GetOneCompanyController } = require("./controller/Company");
const verifyToken = require("./middleware");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// mongodb connected

const connectDb = async() =>{
try {
   await mongoose.connect("mongodb+srv://pp3662504:Prakash%4012@cluster0.kztmo7u.mongodb.net/Task-Management");
    console.log("Mongodb Connected");
  
} catch (error) {
    console.log("Mongodb Connection error:",error.message);
    process.exit(1);
}}

connectDb();
app.use(express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    }
  }));
  
app.post('/task',TaskController);
app.get('/task',AllTaskController);
app.get('/task/:id',OneTaskController);
app.delete('/task/:id',DeleteTaskController);
app.put('/task/:id',EditTaskController);

app.post('/user/register',UserController);
app.post('/user/login',UserLoginController);
app.get('/user',AllUserController);
app.get('/user/:id',OneUserController);
app.delete('/user/:id',DeleteUserController);
app.put('user/:id',EditUserController);

app.post('/company',CompanyController);
app.get('/company',GetCompanyController);
app.get('/company/:id',GetOneCompanyController);

app.listen(5000,()=>{
    console.log("Server is Connected")
})