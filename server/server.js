import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/monogodb.js";
import authRouter from "./routes/authroutes.js";
import userRoute from "./routes/usersRouts.js";
const app = express();

const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

//API ENDPOINTS
app.get("/", (req, res) => {
    res.send("API working");
})
app.use("/api/auth", authRouter);
app.use("/api/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



