import express from "express";

export const app = express();
const port = 3737;

app.use(express.json());

app.listen(port, async () => {
  console.log(`Servidor tá funcionando na ${port}`)}
);