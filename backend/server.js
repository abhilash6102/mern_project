const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://kanchukotaabhilash6102_db_user:EuqM3vI9VFwecWIs@cluster0.psqnilr.mongodb.net/userDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", UserSchema);

// CREATE
app.post("/addUser", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("User Added");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// READ
app.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE
app.delete("/deleteUser/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send("User Deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE
app.put("/updateUser/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.send("User Updated");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));