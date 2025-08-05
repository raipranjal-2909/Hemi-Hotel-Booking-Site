import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWEbHooks from "./controllers/clerkWebHooks.js";

connectDB();

const app = express();
app.use(cors());

//middleware
app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/clerk", clerkWEbHooks);

app.get("/", (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
