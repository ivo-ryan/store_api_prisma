import express from "express";
import cors from "cors"
import { router } from "./routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";


const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandlerMiddleware);
app.use("/api",router);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => console.log(`App runing http://localhost:${PORT}`));