import express from 'express';
import { router } from './routes/base.route';
const app = express();
const port = 3000;
app.use("/", router)
app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}.`);
});