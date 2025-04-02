import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 1111;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the Express backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
