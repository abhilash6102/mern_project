const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// 🔥 PASTE YOUR ATLAS CONNECTION STRING HERE
mongoose.connect("mongodb+srv://kanchukotaabhilash6102_db_user:EuqM3vI9VFwecWIs@cluster0.psqnilr.mongodb.net/userDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Schema (structure of data)
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

// Model
const User = mongoose.model("User", UserSchema);


// API to save user
app.post("/addUser", async (req, res) => {
    const { name, email } = req.body;

    const newUser = new User({ name, email });
    await newUser.save();

    res.send("User saved successfully");
});


// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// API to get all users
app.get("/getUsers", async (req, res) => {
    const users = await User.find();
    res.json(users);
});