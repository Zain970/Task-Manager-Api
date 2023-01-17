const express = require("express");
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");

// Configuring the dotenv file
dotenv.config();

// Initializing our app
const app = express();

// Serving static files
app.use(express.static("./public"));

// Parsing to json
app.use(express.json());

// Task routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandleMiddleware);


const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // Await for the db to first connect
        await connectDB(process.env.MONGO_URI);

        console.log("Connected to the database")

        // Server start listening
        app.listen(port, () => {
            console.log("Server listening on the port ", port);
        })
    }
    catch (error) {
        console.log("Error : ", error);
    }
}

start();