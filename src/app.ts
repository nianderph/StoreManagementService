import cors from 'cors';
import winston from 'winston';
import * as bodyParser from 'body-parser';
import express, {Express, Request,Response} from 'express';
import StoreManagementRouter from './routers/StoreManagementRouter';
import dotenv from 'dotenv';

dotenv.config();

const app:Express = express();
const storeManagementRouter = new StoreManagementRouter();
const tracerFormat = winston.format.printf((info)=>{
    const logContent = {
        correlationId:''
    };
    return JSON.stringify(logContent);
});
const winstonConfig = {
    level:'debug',
    format: tracerFormat,
    transports:[
        new winston.transports.Console()
    ]
};
const logger = winston.createLogger(winstonConfig);
app.use(cors());
initializeMiddlewares();
initializeRouters();
listen();
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
function listen(){
    const port:number = parseInt(process.env.port_number, 10);
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })

}

function initializeMiddlewares(){
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: false}));

}

function initializeRouters(){
    app.use("/v1/storemanagement",storeManagementRouter.getRouter());
}