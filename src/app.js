import { dbConnect } from './config/connect-mongo.js';
import router from './routes/auth.routes.js';
import express from'express'
const app = express()
const port = 3000

app.use(express.json());
dbConnect();

app.use("/", router);

app.listen(port, () => console.log(`http://localhost:${port}`))