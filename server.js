import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("./"));

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

app.listen(3000, () => {
    console.log("Senaka AI is running...");
});
