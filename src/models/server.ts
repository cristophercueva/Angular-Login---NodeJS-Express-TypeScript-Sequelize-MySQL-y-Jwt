import express from "express";
import cors from "cors";
import routesProduct from '../routes/product'
import routesUser from '../routes/user'
import { Product } from "./product";
import { User } from "./user";

class Server {
    private app: express.Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.middlewares();
        this.routes();
        // this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
        });
    }

    routes(){
        this.app.use('/api/products', routesProduct);
        this.app.use('/api/users', routesUser);
    }
    middlewares(){
        this.app.use(express.json());

        this.app.use(cors())
    }

    async dbConnect(){
        try {
            await Product.sync({force: true})
            await User.sync()
        } catch (error) {
            console.error('Unable to connect to the database', error);
        
        }
    }
}

export default Server;
