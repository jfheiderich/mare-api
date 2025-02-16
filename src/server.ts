import express from "express";
import "dotenv/config";
import router from "./routes";

const app = express();

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando corretamente! 🚀" });
});

app.get("/favicon.ico", (req, res) => {
  res.status(200).send();
});

const port = process.env.PORT || 4444;

app.listen(port, () => {
  console.log(`server on port ${port}`);
});

export default app;
