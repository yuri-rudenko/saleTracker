import dotenv from "dotenv"
import express from "express";
import { connectDB } from "./config/db.js";
import router from "./router/router.js";

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


app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port ${port}!`);
}
);
