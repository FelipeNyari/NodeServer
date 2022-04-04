import {Router} from 'express';
const routes = new Router();

routes.get('/', (req, res)=>{
    return res.json({message: "Olá Mundo do Felipe"});
})


export default routes;