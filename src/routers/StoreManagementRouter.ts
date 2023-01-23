import {Router} from 'express';

class StoreManagementRouter {
    private router = Router();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.post("/search", this.search);
        this.router.post("/updateProduct", this.updateProduct);
        this.router.post("/csvFeed", this.processCsvFeed);
    }

    async search(req, res){
        //implement code to search and get the response
        return res.send("returns searched records");
    }

    async updateProduct(req, res){
        //code to update the product
    }

    async processCsvFeed(req, res){
        //code to store the file in blob and put a message in kafka topic
    }

    public getRouter(): Router{
        return this.router;
    }
}

export default StoreManagementRouter;