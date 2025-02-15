import express from "express";
import "dotenv/config";
import router from "./router";

const app = express();

app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 4444;

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
