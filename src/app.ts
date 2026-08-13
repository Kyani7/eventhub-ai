import express, {Application, Request, Response} from 'express';

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Hello, World!"
        success: true
    })
})

export default app;


// const PORT: number = 3000;

// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello, World!');
// });