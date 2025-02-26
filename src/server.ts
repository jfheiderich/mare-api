import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const port = process.env.PORT || 4444;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

export default app;
