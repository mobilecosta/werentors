import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';
import { server } from "./lib/server-data";
import { UserController } from './controllers/users.controller';
import { errorHandling } from './middlawares/error.middleware';
import { authMiddleware } from './middlawares/auth.middleware';

const usercontroller = new UserController();

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.post('/signup', usercontroller.signUp)
app.post('/signin', usercontroller.signIn)
app.get('/secret', authMiddleware, (request, response) => {
    return response.send('Entrou campeao!')
})

app.use(errorHandling)

app.listen(server, () => {
    console.log(`Server is running at port ${server.port}`)
})
