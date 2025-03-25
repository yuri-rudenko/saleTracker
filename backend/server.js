import dotenv from "dotenv"
import express from "express";
import { connectDB } from "./config/db.js";
import router from "./router/router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

function errorHandler(err, req, res, next) {

    console.error(err.stack)

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'randomization/images')));

app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}!`);
}
);
