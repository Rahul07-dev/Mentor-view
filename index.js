// Imports
const express = require("express"); // Create server
const path = require("path");
const cors = require('cors');
require('dotenv').config()

// Init app
const app = express();
app.use(cors());

// Store port number in a variable
const port = process.env.PORT || 5000;

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/mentor", require("./routes/mentor"));
app.use("/api/student", require("./routes/student"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static('client/build'));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Listen to port
app.listen(port, () => console.log(`Listening on port ${port}`));