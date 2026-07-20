import express, { type Application, type Request, type Response } from 'express'
import { authRouter } from './modules/authentication/authenticatio.route';
import { issueRouter } from './modules/issues/issues.route';
import cors from "cors";
const app :Application = express()

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(cors(
  {
  origin: 'http://localhost:3000',
 
}
));

app.get('/', (req:Request, res:Response) => {
  res.json(
    { status: 'ok',
     message: 'API is running' });
});

app.use('/api/auth',authRouter);
app.use('/api/issues',issueRouter);

export default app