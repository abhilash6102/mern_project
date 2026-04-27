const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://kanchukotaabhilash6102_db_user:EuqM3vI9VFwecWIs@cluster0.psqnilr.mongodb.net/userDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", UserSchema);

// ✅ CREATE
app.post("/addUser", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("User Added");
});

// ✅ READ
app.get("/getUsers", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// ✅ DELETE
app.delete("/deleteUser/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted");
});

// ✅ UPDATE
app.put("/updateUser/:id", async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("User Updated");
});

app.listen(5000, () => console.log("Server running on port 5000"));