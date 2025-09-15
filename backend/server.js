import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectToDb from "./config/db.js";
import todoRouter from "./routes/todo.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
ConnectToDb();



app.get("/test", (req, res) => {
  res.send("<h1> HELlo </h1>");
});

app.use("/", todoRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is up on PORT${process.env.PORT || 3000}😁`);
});
