const express = require("express");
const app = express();

app.use(express.json())

const users = [];
//HTTP Methods Examples
//GET - Retrieve data
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/users", (req, res) => {
    if(users.length == 0){
        res.status(404).send("No users found!")
        return
    }
    res.status(200).send(users);
});
//POST - Create data
app.post("/users", (req, res) => {
    const user = req.body;
    const findUser = users.find((u) => u.id === user.id);
    if(findUser){
        res.status(400).send("User already exists!");
        return;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    users.push(user);
    res.status(201).send("User Created!");
}                                                                       
//     res.send('Form Submitted');
);
app.post("/", (req, res) => {
    res.send("Post Request Received");
});
//PUT - Update data
//DELETE - Delete data
app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    const findUserIndex = users.findIndex((u) => u.id === id);
    if(findUserIndex != -1){
        res.status(400).send("User Deleted Successfully!");
        return
    }
    users.splice(findUserIndex, 1);
    res.status(200).send("User deleted successfully!");
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});