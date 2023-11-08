import express from "express";
import bodyParser from "body-parser";
import usersRouts from "./routes/users.js";

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRouts);

app.get("/", (req, res) => {
  res.send("Hello from the Homepage.");
});

export default app;
