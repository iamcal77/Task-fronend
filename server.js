const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for all domains
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "build")));


// Register endpoint to handle user registration
app.post("/register", (req, res) => {
  const { email, password, fullName } = req.body;

  // Load the users data from the JSON file
  fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read data" });
    }

    const users = JSON.parse(data);
    const newUser = {
      id: users.users.length + 1,
      email,
      password,
      fullName,
    };

    // Add new user to the array
    users.users.push(newUser);

    // Save the updated data back to the JSON file
    fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Login endpoint to handle user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Load the users data from the JSON file
  fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Failed to read data" });
    }

    const users = JSON.parse(data);
    const user = users.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});
// Endpoint to fetch all users
app.get("/users", (req, res) => {
    fs.readFile(path.join(__dirname, "users.json"), "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Failed to read data" });
      }
      const users = JSON.parse(data);
      res.status(200).json(users.users);  // Send only the users array
    });
  });
  
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
