import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";

//rotue imports
import registerRoute from "./src/routes/register.routes.js";
import loginRoute from "./src/routes/login.routes.js";
import verifyTokenRoute from "./src/routes/verifyToken.routes.js";
import festRoutes from "./src/routes/festRegistration.routes.js";

//middleware imports
import { auth } from "./src/middlewares/auth.js";

// config
env.config();

// Intialization
const app = express();
const port = process.env.PORT || 3000;

//express middlewares
app.use(
  cors({
    origin: `${process.env.CORS_WHITELIST}`,
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database Connection
connectDB();

//routes
app.use("/api/user/register", registerRoute);
app.use("/api/user/login", loginRoute);
app.use("/api/user/verify", verifyTokenRoute);
app.use("/api/user/fest", auth, festRoutes);

app.listen(port, () => console.log(`server running:http://localhost:${port}`));
