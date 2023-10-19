import express from 'express';
import cors from 'cors';
import { server } from "./lib/server-data"
import { UserController } from './controllers/users';

const app = express();

const usercontroller = new UserController();

app.use(cors());

app.get('/', usercontroller.test)

app.listen(server, () => {
    console.log(`Server is running at port ${server.port}`)
})
